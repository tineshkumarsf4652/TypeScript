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
    public class TravelController:ControllerBase
    {
        /*private static List<Travel> _Travels=new List<Travel>
        {
            new Travel{TravelID=2001,CardID=1001,FromLocation="Airport",ToLocation="Egmore",TravelDate=new DateTime(2023,10,10),TravelCost=55},
            new Travel{TravelID=2002,CardID=1002,FromLocation="Alandur",ToLocation="Koyambedu",TravelDate=new DateTime(2023,11,10),TravelCost=25}
        };*/
        private readonly ApplicationDBContext _dbContext;
        public TravelController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetTravel()
        {
            return Ok(_dbContext.travels);
        }

        [HttpGet("{id}")]
        public IActionResult GetTravelDetails(int id)
        {
            var travel =_dbContext.travels.FirstOrDefault(m=>m.TravelID==id);
            if(travel==null)
            {
                return NotFound();
            }
            return Ok(travel);
        }

        [HttpPost]
        public IActionResult PostTravelDetails([FromBody]Travel travel)
        {
           _dbContext.travels.Add(travel);
           _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutTravelDetails(int id, [FromBody]Travel travel)
        {
            var travelOld=_dbContext.travels.FirstOrDefault(m=>m.TravelID==id);
            if(travelOld==null)
            {
                return NotFound();
            }
            travelOld.CardID=travel.CardID;
            travelOld.FromLocation=travel.FromLocation;
            travelOld.ToLocation=travel.ToLocation;
            travelOld.TravelDate=travel.TravelDate;
            travel.TravelCost=travel.TravelCost;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTravelDetails(int id)
        {
            var travel=_dbContext.travels.FirstOrDefault(m=>m.TravelID==id);
            if(travel==null)
            {
                return NotFound();
            }
           _dbContext.travels.Remove(travel);
           _dbContext.SaveChanges();
            return Ok();
        }
    }
}