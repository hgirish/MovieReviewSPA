using System.Linq;
using MovieReviewSPA.Model;

namespace MovieReviewSPA.Data.Contracts
{
    public interface 
        IRepository<T> where T : class
    {
        IQueryable<T> GetAll(Pager queryObj);
        IQueryable<T> GetAll();

        T GetById(int id);

        T Add(T entity);

        void Update(T entity);

        void Delete(T entity);

        void Delete(int id);
    }
}
