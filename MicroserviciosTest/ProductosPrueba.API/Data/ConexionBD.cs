using Microsoft.EntityFrameworkCore;
using ProductosPrueba.API.Models;

namespace ProductosPrueba.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<EProducto> Productos { get; set; }
    }
}
