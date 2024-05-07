using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetroCardAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace MetroCardAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController:ControllerBase
    {

        /*private static List<Ticket> _Tickets=new List<Ticket>
        {
            new Ticket{TicketID=3001,FromLocation="Airport",ToLocation="Egmore",TicketPrice=55},
            new Ticket{TicketID=3002,FromLocation="Airport",ToLocation="Koyambedu",TicketPrice=25},
            new Ticket{TicketID=3003,FromLocation="Alandur",ToLocation="Koyambedu",TicketPrice=25},
            new Ticket{TicketID=3004,FromLocation="Koyambedu",ToLocation="Egmore",TicketPrice=32},
            new Ticket{TicketID=3005,FromLocation="Vadapalani",ToLocation="Egmore",TicketPrice=45},
            new Ticket{TicketID=3006,FromLocation="Arumbakkam",ToLocation="Egmore",TicketPrice=25},
            new Ticket{TicketID=3007,FromLocation="Vadapalani",ToLocation="Koyambedu",TicketPrice=25},
            new Ticket{TicketID=3008,FromLocation="Arumbakkam",ToLocation="Koyambedu",TicketPrice=16}
        };*/
        private readonly ApplicationDBContext _dbContext;
        public TicketController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetTicket()
        {
            return Ok(_dbContext.tickets);
        }

        [HttpGet("{id}")]
        public IActionResult GetTicketDetails(int id)
        {
            var ticket=_dbContext.tickets.FirstOrDefault(m=>m.TicketID==id);
            if(ticket==null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }

        [HttpPost]
        public IActionResult PostTicketDetails([FromBody]Ticket ticket)
        {
            _dbContext.tickets.Add(ticket);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutTicketDetails(int id, [FromBody]Ticket ticket)
        {
            var ticketOld=_dbContext.tickets.FirstOrDefault(m=>m.TicketID==id);
            if(ticketOld==null)
            {
                return NotFound();
            }
            ticketOld.FromLocation=ticket.FromLocation;
            ticketOld.ToLocation=ticket.ToLocation;
            ticketOld.TicketPrice=ticket.TicketPrice;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTicketDetails(int id)
        {
            var ticket=_dbContext.tickets.FirstOrDefault(m=>m.TicketID==id);
            if(ticket==null)
            {
                return NotFound();
            }
           _dbContext.tickets.Remove(ticket);
           _dbContext.SaveChanges();
            return Ok();
        }
    }
}