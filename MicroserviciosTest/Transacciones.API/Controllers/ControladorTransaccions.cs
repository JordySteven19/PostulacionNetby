using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Transacciones.API.Data;
using Transacciones.API.Models;
using System.Net.Http.Json;

namespace Transacciones.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransaccionesController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly HttpClient _http;

        public TransaccionesController(AppDbContext context)
        {
            _context = context;
            _http = new HttpClient();
        }

       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaccion>>> GetTransacciones()
        {
            return await _context.Transacciones.ToListAsync();
        }

    
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaccion>> GetTransaccion(int id)
        {
            var transaccion = await _context.Transacciones.FindAsync(id);

            if (transaccion == null)
                return NotFound();

            return transaccion;
        }

    
        [HttpPost]
        public async Task<ActionResult<Transaccion>> RegistrarTransaccion([FromBody] Transaccion transaccion)
        {
        
            var productoApiUrl = $"http://localhost:5297/api/productos/{transaccion.ProductoId}";
            var productoResponse = await _http.GetAsync(productoApiUrl);

            

            if (!productoResponse.IsSuccessStatusCode)
                return BadRequest("❌ El producto no existe.");

            var producto = await productoResponse.Content.ReadFromJsonAsync<EProductoDTO>();

            if (producto == null)
                return BadRequest("❌ Producto no encontrado.");

        
            if (transaccion.Tipo == "Venta" && transaccion.Cantidad > producto.stock)
                return BadRequest("❌ No hay suficiente stock disponible.");

            
            transaccion.Fecha = DateTime.Now;
            transaccion.precioUnitario = producto.Precio;
            transaccion.precioTotal = producto.Precio * transaccion.Cantidad;

            _context.Transacciones.Add(transaccion);
            await _context.SaveChangesAsync();

    
            var nuevoStock = transaccion.Tipo == "Venta"
                ? producto.stock - transaccion.Cantidad
                : producto.stock + transaccion.Cantidad;


            var actualizarResponse = await _http.PutAsJsonAsync(
                $"http://localhost:5297/api/productos/{transaccion.ProductoId}/actualizar-stock",
                new { stock = nuevoStock }
            );

            if (!actualizarResponse.IsSuccessStatusCode)
                return StatusCode(500, "❌ Error al actualizar el stock.");

            return CreatedAtAction(nameof(GetTransaccion), new { id = transaccion.Id }, transaccion);
        }

       
        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarTransaccion(int id, [FromBody] Transaccion transaccion)
        {
            if (id != transaccion.Id)
                return BadRequest();

            _context.Entry(transaccion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransaccionExiste(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarTransaccion(int id)
        {
            var transaccion = await _context.Transacciones.FindAsync(id);
            if (transaccion == null)
                return NotFound();

            _context.Transacciones.Remove(transaccion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransaccionExiste(int id)
        {
            return _context.Transacciones.Any(t => t.Id == id);
        }

        public class EProductoDTO
        {
            public int Id { get; set; }
            public string Nombre { get; set; } = string.Empty;
            public decimal Precio { get; set; }
            public int stock { get; set; }
        }
    }
}
