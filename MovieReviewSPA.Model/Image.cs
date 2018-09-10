using System.ComponentModel.DataAnnotations;

namespace MovieReviewSPA.Model
{
    public class Image
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string FileName { get; set; }
        public int MovieId { get; set; }

    }
}