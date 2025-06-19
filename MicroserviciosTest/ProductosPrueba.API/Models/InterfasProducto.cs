using System.ComponentModel.DataAnnotations;

namespace ProductosPrueba.API.Models
{
    public class EProducto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [StringLength(100, ErrorMessage = "El nombre no puede superar los 100 caracteres.")]
        public string Nombre { get; set; }

        [StringLength(255)]
        public string Descripcion { get; set; }

        [StringLength(100)]
        public string Categoria { get; set; }

        [StringLength(255)]
        public string Imagen { get; set; } = string.Empty;

        [Range(0, double.MaxValue, ErrorMessage = "El precio debe ser mayor o igual a 0.")]
        public decimal Precio { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "El stock no puede ser negativo.")]
        public int stock { get; set; }

        
    }

    public class ActualizarStockDTO
    {
        public int stock { get; set; }
    }
    
}
