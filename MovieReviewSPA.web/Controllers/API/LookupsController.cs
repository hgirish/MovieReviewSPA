using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MovieReviewSPA.Data.Contracts;
using MovieReviewSPA.Model;

namespace MovieReviewSPA.web.Controllers.API
{
    [Route("api/[controller]")]

    public class LookupsController : Controller
    {
        private readonly IMovieReviewUow _uOW;

        public LookupsController(IMovieReviewUow uow)
        {
            _uOW = uow;
        }

        // GET: api/lookups/movies
        [HttpGet("movies")]
        public IEnumerable<Movie> GetMovies(Pager movieQuery)
        {
            return _uOW.Movies.GetAll(movieQuery).OrderBy(m => m.Id);

        }

        // /api/Lookups/getbyreviewerid?id=1
        [HttpGet("getbyreviewerid")]
        public MovieReview GetByReviewerId(int id)
        {
            return _uOW.MovieReviews.GetById(id);
        }

        #region OData Future: IQueryable<T>
        //[Queryable]
        // public IQueryable<Movie> Get()        
        // public IQueryable<MovieReview> Get()

        #endregion


    }
}
