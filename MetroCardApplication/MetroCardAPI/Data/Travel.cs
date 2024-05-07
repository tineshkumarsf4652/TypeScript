using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MetroCardAPI.Data
{
    [Table("travelinfo", Schema = "public")]
    public class Travel
    {
        [Key]
        public int TravelID{get; set;}
        public int CardID{get; set;}
        public string FromLocation{get; set;}
        public string ToLocation{get; set;}
        public DateTime TravelDate{get; set;}
        public double TravelCost{get; set;}
    }
}
