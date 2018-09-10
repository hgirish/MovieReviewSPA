using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MovieReviewSPA.Data.Contracts;
using MovieReviewSPA.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MovieReviewSPA.Data
{
    public class EFRepository<T> : IRepository<T> where T : class
    {
        protected DbContext dbContext;
        protected DbSet<T> DbSet { get; set; }
        public EFRepository(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException("dbContext");
            DbSet = this.dbContext.Set<T>();
        }
        public T Add(T entity)
        {
            EntityEntry<T> entityEntry = dbContext.Entry(entity);
            if (entityEntry.State != EntityState.Detached)
            {
                entityEntry.State = EntityState.Added;
            }
            else
            {
                DbSet.Add(entity);
            }
            return entity;
        }

        public void Delete(T entity)
        {
            EntityEntry<T> entry = dbContext.Entry(entity);
            if (entry.State != EntityState.Deleted)
            {
                entry.State = EntityState.Deleted;
            }
            else
            {
                DbSet.Attach(entity);
                DbSet.Remove(entity);
            }
        }

        public void Delete(int id)
        {
            var entity = GetById(id);
            if (entity == null)
            {
                return;
            }
            Delete(entity);

        }

        public IQueryable<T> GetAll()
        {
            return DbSet;
        }

        public T GetById(int id)
        {
            return DbSet.Find(id);
        }

        public void Update(T entity)
        {
            EntityEntry<T> entry = dbContext.Entry(entity);
            if (entry.State != EntityState.Detached)
            {
                DbSet.Attach(entity);
            }
            entry.State = EntityState.Modified;
        }

        public IQueryable<T> GetAll(Pager queryObj)
        {
            IQueryable<T> query = DbSet;
            if (queryObj.Page <= 0)
            {
                queryObj.Page = 1;
            }
            if (queryObj.PageSize <= 0)
            {
                queryObj.PageSize = 10;
            }
            query = query.Skip(( queryObj.Page - 1 ) * queryObj.PageSize)
                .Take(queryObj.PageSize);
            return query;
        }
    }
}
