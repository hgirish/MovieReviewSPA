using System;
using System.Collections.Generic;
using System.Text;
using MovieReviewSPA.Model;

namespace MovieReviewSPA.Data.Contracts
{
    public interface IMovieReviewUow
    {
        void Commit();
        IRepository<Movie> Movies { get; }
        IRepository<MovieReview> MovieReviews { get; }
        IRepository<Image> Images { get; }
    }
}
