using Microsoft.EntityFrameworkCore;
using MovieReviewSPA.Model;

namespace MovieReviewSPA.Data
{
    public class MovieReviewDbContext : DbContext
    {
        public MovieReviewDbContext(DbContextOptions<MovieReviewDbContext> options) : base(options)
        {

        }
        public MovieReviewDbContext()
        {
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=MovieReviewSPA;Trusted_Connection=True;MultipleActiveResultSets=true;");
            }
        }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MovieReview> MovieReviews { get; set; }

        public DbSet<Image> Images { get; set; }
    }
}
