using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using MovieReviewSPA.Data.Contracts;

namespace MovieReviewSPA.Data.Helpers
{
    public interface IRepositoryProvider
    {
        DbContext DbContext { get; set; }
        IRepository<T> GetRepositoryForEntityType<T>() where T : class;

        T GetRepository<T>(Func<DbContext, object> factory = null) where T : class;

        void SetRepository<T>(T repository);

    }
}
