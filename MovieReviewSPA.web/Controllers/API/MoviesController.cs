using System;
using System.Linq;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
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
        //[Authorize]
        public IQueryable Get(Pager movieQuery)
        {
            var model = _uow.Movies.GetAll(movieQuery)
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
        public IActionResult Post([FromBody] Movie movie)
        {
            
           movie = _uow.Movies.Add(movie);
            _uow.Commit();
            return Ok(movie);
        }

        // PUT: api/Movies/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Movie movie)
        {
            //using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            //{
            //    var content = await reader.ReadToEndAsync();
            //    Console.WriteLine(content);
            //}
            _uow.Movies.Update(movie);
            _uow.Commit();
            return Ok(movie);
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
