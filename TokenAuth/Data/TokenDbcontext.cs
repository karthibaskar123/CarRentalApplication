using JwtWebApi.booking;
using JwtWebApi.Signup;
#nullable disable
using Microsoft.EntityFrameworkCore;

namespace TokenAuth.Date
{
    public class TokenDbcontext : DbContext
    {
        public TokenDbcontext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
          base.OnModelCreating(modelBuilder);
          modelBuilder.Entity<Signup>().HasKey(user=>user.UserId);
          modelBuilder.Entity<Signup>().HasMany(user=>user.Favorites);
          modelBuilder.Entity<MyFavoriteCar>().HasKey(data=>data.FavoriteId);

        }
        public DbSet<Signup>UserData{get;set;}
        public DbSet<MyFavoriteCar> FavoriteData { get; set; }

}
}
