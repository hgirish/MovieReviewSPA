using Microsoft.EntityFrameworkCore;
using MovieReviewSPA.Data.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace MovieReviewSPA.Data.Helpers
{
   public  class RepositoryFactories
    {
        private readonly IDictionary<Type, Func<DbContext, object>> _repositoryFactories;

        private IDictionary<Type, Func<DbContext, object>> GetMovieReviewFactories()
        {
            return new Dictionary<Type, Func<DbContext, object>>
            {
                {typeof(IRepository<>), dbContext=>new RepositoryFactories() }
            };
        }
        public RepositoryFactories()
        {
            _repositoryFactories = GetMovieReviewFactories();
        }
        public RepositoryFactories(IDictionary<Type, Func<DbContext,object>> repositoryFactories)
        {
            _repositoryFactories = repositoryFactories;
        }

        public Func<DbContext, object> GetRepositoryFactory<T>()
        {
            Func<DbContext, object> factory;
            _repositoryFactories.TryGetValue(typeof(T), out factory);
            return factory;
        }

        public Func<DbContext, object> GetRepositoryFactoryForEntityType<T>() where T : class
        {
            return GetRepositoryFactory<T>() ?? DefaultEntityRepositoryFactory<T>();
        }

        protected virtual Func<DbContext,object> DefaultEntityRepositoryFactory<T>() where T : class
        {
            return dbContext => new EFRepository<T>(dbContext);
        }
    }
}
