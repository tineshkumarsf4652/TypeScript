using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MetroCardAPI.Data
{
    [Table("ticketinfo", Schema = "public")]
    public class Ticket
    {
        [Key]
        public int TicketID{get; set;}
        public string FromLocation{get; set;}
        public string ToLocation{get; set;}
        public double TicketPrice{get; set;}
    }
}
