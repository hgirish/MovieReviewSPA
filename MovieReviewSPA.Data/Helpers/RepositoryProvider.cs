using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using MovieReviewSPA.Data.Contracts;

namespace MovieReviewSPA.Data.Helpers
{
    public class RepositoryProvider : IRepositoryProvider
    {
        private readonly RepositoryFactories _repositoryFactories;
        protected Dictionary<Type, object> Repositories { get; private set; }
        public DbContext DbContext { get; set; }
        public RepositoryProvider(RepositoryFactories repositoryFactories)
        {
            _repositoryFactories = repositoryFactories;
            Repositories = new Dictionary<Type, object>();

        }

        public virtual  T GetRepository<T>(Func<DbContext, object> factory = null) where T : class
        {
            object repoObj;
            Repositories.TryGetValue(typeof(T), out repoObj);
            if (repoObj != null)
            {
                return (T)repoObj;
            }
            return MakeRepository<T>(factory, DbContext);
        }

        protected virtual  T MakeRepository<T>(Func<DbContext, object> factory, DbContext dbContext) where T : class
        {
            var f = factory ?? _repositoryFactories.GetRepositoryFactory<T>();
            if (f == null)
            {
                throw new NotImplementedException($"No factory for repository type, {typeof(T).FullName}");
            }
            var repo = (T)f(dbContext);
            Repositories[typeof(T)] = repo;
            return repo;
        }

        public IRepository<T> GetRepositoryForEntityType<T>() where T : class
        {
            return GetRepository<IRepository<T>>(
                _repositoryFactories.GetRepositoryFactoryForEntityType<T>());
        }

        public void SetRepository<T>(T repository)
        {
            Repositories[typeof(T)] = repository;
        }
    }
}
