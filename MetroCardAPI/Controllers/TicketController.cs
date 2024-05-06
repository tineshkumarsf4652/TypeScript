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
        private static List<Ticket> _Tickets=new List<Ticket>
        {
            new Ticket{TicketID=3001,FromLocation="Airport",ToLocation="Egmore",TicketPrice=55},
            new Ticket{TicketID=3002,FromLocation="Airport",ToLocation="Koyambedu",TicketPrice=25},
            new Ticket{TicketID=3003,FromLocation="Alandur",ToLocation="Koyambedu",TicketPrice=25},
            new Ticket{TicketID=3004,FromLocation="Koyambedu",ToLocation="Egmore",TicketPrice=32},
            new Ticket{TicketID=3005,FromLocation="Vadapalani",ToLocation="Egmore",TicketPrice=45},
            new Ticket{TicketID=3006,FromLocation="Arumbakkam",ToLocation="Egmore",TicketPrice=25},
            new Ticket{TicketID=3007,FromLocation="Vadapalani",ToLocation="Koyambedu",TicketPrice=25},
            new Ticket{TicketID=3008,FromLocation="Arumbakkam",ToLocation="Koyambedu",TicketPrice=16}
        };
        [HttpGet]
        public IActionResult GetTicket()
        {
            return Ok(_Tickets);
        }
        [HttpGet("{id}")]
        public IActionResult GetTicketDetails(int id)
        {
            var ticket=_Tickets.Find(m=>m.TicketID==id);
            if(ticket==null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }
        [HttpPost]
        public IActionResult PostTicketDetails([FromBody]Ticket ticket)
        {
            _Tickets.Add(ticket);
            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult PutTicketDetails(int id, [FromBody]Ticket ticket)
        {
            var index=_Tickets.FindIndex(m=>m.TicketID==id);
            if(index<0)
            {
                return NotFound();
            }
            _Tickets[index]=ticket;
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteTicketDetails(int id)
        {
            var ticket=_Tickets.Find(m=>m.TicketID==id);
            if(ticket==null)
            {
                return NotFound();
            }
           _Tickets.Remove(ticket);
            return Ok();
        }
    }
}