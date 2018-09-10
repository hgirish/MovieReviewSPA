using System;
using MovieReviewSPA.Data.Contracts;
using MovieReviewSPA.Data.Helpers;
using MovieReviewSPA.Model;

namespace MovieReviewSPA.Data
{
    public class MovieReviewUow : IMovieReviewUow, IDisposable
    {
        protected IRepositoryProvider RepositoryProvider;

        public MovieReviewUow(IRepositoryProvider repositoryProvider)
        {
            CreateDbContext();
            repositoryProvider.DbContext = DbContext;
            RepositoryProvider = repositoryProvider;
        }
        public IRepository<Movie> Movies => GetStandardRepo<Movie>();

        public IRepository<MovieReview> MovieReviews => GetStandardRepo<MovieReview>();

        public IRepository<Image> Images => GetStandardRepo<Image>();
        private MovieReviewDbContext DbContext { get;  set; }

        public void Commit() => DbContext.SaveChanges();

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        private IRepository<T> GetStandardRepo<T>() where T : class => 
            RepositoryProvider.GetRepositoryForEntityType<T>();
        protected virtual  void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (DbContext != null)
                {
                    DbContext.Dispose();
                }
            }
        }

        protected void CreateDbContext() => DbContext = new MovieReviewDbContext();
    }
}
