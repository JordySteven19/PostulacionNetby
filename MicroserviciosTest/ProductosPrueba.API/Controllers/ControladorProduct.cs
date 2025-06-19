using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductosPrueba.API.Data;
using ProductosPrueba.API.Models;

namespace ProductosPrueba.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductosController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EProducto>>> GetProductos()
        {
            return await _context.Productos.ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<EProducto>> GetProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
                return NotFound();
            return producto;
        }

    
        [HttpPost]
        public async Task<ActionResult<EProducto>> CrearProducto(EProducto producto)
        {
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProducto), new { id = producto.Id }, producto);
        }

    
        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarProducto(int id, EProducto producto)
        {
            if (id != producto.Id)
                return BadRequest();

            _context.Entry(producto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Productos.Any(p => p.Id == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
                return NotFound();

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

[HttpPut("{id}/actualizar-stock")]
public async Task<IActionResult> ActualizarStock(int id, [FromBody] ActualizarStockDTO dto)
{
    var producto = await _context.Productos.FindAsync(id);
    if (producto == null)
    {
        
        return NotFound();
    }

    producto.stock = dto.stock;
    await _context.SaveChangesAsync();
    return NoContent();
}


        
    }
}
