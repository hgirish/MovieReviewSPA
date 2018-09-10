using System.Linq;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using MovieReviewSPA.Data.Contracts;
using MovieReviewSPA.Model;
using MovieReviewSPA.web.ViewModels.Movie;

namespace MovieReviewSPA.web.Controllers.API
{
    [Route("api/[controller]")]
    public class MoviesController : Controller
    {
        private readonly IMovieReviewUow _uow;

        public MoviesController(IMovieReviewUow uow)
        {
            _uow = uow;
        }
        // GET: api/Movies
        [HttpGet]
        public IQueryable Get()
        {
            var model = _uow.Movies.GetAll()
                .OrderByDescending(m => m.Reviews.Count())
                .Select(m => new MovieViewModel
                {
                    Id = m.Id,
                    MovieName = m.MovieName,
                    DirectorName = m.DirectorName,
                    NoOfReviews = m.Reviews.Count(),
                    ReleaseYear = m.ReleaseYear
                });
            return model;
        }

        // GET: api/Movies/5
        [HttpGet("{id}", Name = "Get")]
        public Movie Get(int id)
        {
            return _uow.Movies.GetById(id);
        }

        // POST: api/Movies
        [HttpPost]
        public HttpResponseMessage Post([FromBody] Movie movie)
        {
            _uow.Movies.Add(movie);
            _uow.Commit();
            return new HttpResponseMessage(System.Net.HttpStatusCode.NoContent);
        }

        // PUT: api/Movies/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] Movie movie)
        {
            //using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            //{
            //    var content = await reader.ReadToEndAsync();
            //    Console.WriteLine(content);
            //}
            _uow.Movies.Update(movie);
            _uow.Commit();
            return new HttpResponseMessage(System.Net.HttpStatusCode.NoContent);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            _uow.Movies.Delete(id);
            _uow.Commit();
            return new HttpResponseMessage(System.Net.HttpStatusCode.NoContent);
        }
    }
}
