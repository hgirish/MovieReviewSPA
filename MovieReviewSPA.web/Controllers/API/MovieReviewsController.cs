using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using MovieReviewSPA.Data.Contracts;
using MovieReviewSPA.Model;

namespace MovieReviewSPA.web.Controllers.API
{
    [Route("api/[controller]")]
    public class MovieReviewsController : Controller
    {
        private readonly IMovieReviewUow _uOW;

        public MovieReviewsController(IMovieReviewUow uow)
        {
            _uOW = uow;
        }
        [HttpGet("")]
        public IEnumerable<MovieReview> Get()
        {
            return _uOW.MovieReviews.GetAll().OrderBy(m => m.MovieId);
        }

        [HttpGet("{id}")]
        public IEnumerable<MovieReview> Get(int Id)
        {
            return _uOW.MovieReviews.GetAll().Where(m => m.MovieId == Id);
        }

        [HttpGet("[action]/{Id}")]
        public MovieReview GetByReviewId(int id)
        {
            return _uOW.MovieReviews.GetAll().FirstOrDefault(m => m.Id == id);
        }

        [HttpGet("[action]/{id}")]
        public int[] GetRatings(int id)
        {
            return _uOW.MovieReviews.GetAll().Where(m => m.MovieId == id).GroupBy(r => r.ReviewerRating)
                .Select(o =>o.Key).ToArray();
        }

        // /api/MovieReviews/getbyreviewername?value=rahul
        [HttpGet("[action]")]
        public MovieReview GetByReviewerName(string value)
        {
            var review = _uOW.MovieReviews.GetAll().FirstOrDefault(m => m.ReviewerName.StartsWith(value));

            if (review != null) return review;
            throw new Exception(new HttpResponseMessage(HttpStatusCode.NotFound).ToString());
        }

        // Update an existing review
        // PUT /api/MovieReviews/
        [HttpPut("")]
        public HttpResponseMessage Put([FromBody]MovieReview review)
        {
            //review.Id = Id;
            _uOW.MovieReviews.Update(review);
            _uOW.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // Create a new review
        // POST /api/MovieReviews
        [HttpPost("{id}")]
        public IActionResult Post(int Id, [FromBody]MovieReview review)
        {
            review.MovieId = Id;
            _uOW.MovieReviews.Add(review);
            _uOW.Commit();

            return Ok(review);
        }

        //Delete a review
        //Delete /api/MovieReviews/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            _uOW.MovieReviews.Delete(id);
            _uOW.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }



}
