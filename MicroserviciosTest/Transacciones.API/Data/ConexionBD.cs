using Microsoft.EntityFrameworkCore;
using Transacciones.API.Models;

namespace Transacciones.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Transaccion> Transacciones { get; set; }
    }
}
