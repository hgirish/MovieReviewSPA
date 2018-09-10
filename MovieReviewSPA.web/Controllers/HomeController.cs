using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MovieReviewSPA.Data;
using MovieReviewSPA.Model;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MovieReviewSPA.web.Controllers
{
    public class HomeController : Controller
    {
        private readonly MovieReviewDbContext _dbContext;

        public HomeController(MovieReviewDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IActionResult Index()
        {
            List<Movie> movies = _dbContext.Movies.ToList();
            return View(movies);
        }
        public IActionResult About()
        {
            return View();
        }
    }
}
