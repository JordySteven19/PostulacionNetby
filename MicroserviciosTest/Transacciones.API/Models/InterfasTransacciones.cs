using System;
using System.ComponentModel.DataAnnotations;

namespace Transacciones.API.Models
{
    public class Transaccion
    {
        public int Id { get; set; }

        [Required]
        public DateTime Fecha { get; set; } = DateTime.Now;

        [Required]
        [RegularExpression("^(Compra|Venta)$", ErrorMessage = "Tipo debe ser 'Compra' o 'Venta'.")]
        public string Tipo { get; set; } = string.Empty;

        [Required]
        public int ProductoId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Cantidad debe ser mayor a 0.")]
        public int Cantidad { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Precio unitario no puede ser negativo.")]
        public decimal precioUnitario { get; set; }

        [Range(0, double.MaxValue)]
        public decimal precioTotal { get; set; }

        [Required]
        public string Detalle { get; set; } = string.Empty;
    }
}

