using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineGroceryAPI.Data;

namespace OnlineGroceryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroceryController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public GroceryController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetGrocery()
        {
            return Ok(_dbContext.grocerys);
        }

        [HttpGet("{id}")]
        public IActionResult GetGroceryDetails(int id)
        {
            var grocery=_dbContext.grocerys.FirstOrDefault(m=>m.MaterialID==id);
            if(grocery==null)
            {
                return NotFound();
            }
            return Ok(grocery);
        }

        [HttpPost]
        public IActionResult PostGroceryDetails([FromBody]GroceryInfo grocery)
        {
            _dbContext.grocerys.Add(grocery);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutGroceryDetails(int id, [FromBody]GroceryInfo grocery)
        {
            var groceryOld=_dbContext.grocerys.FirstOrDefault(m=>m.MaterialID==id);
            if(groceryOld==null)
            {
                return NotFound();
            }
            groceryOld.MaterialName=grocery.MaterialName;
            groceryOld.Quantity=grocery.Quantity;
            groceryOld.MaterialPrice=grocery.MaterialPrice;
            groceryOld.ManufactureDate=grocery.ManufactureDate;
            groceryOld.ExpiryDate=grocery.ExpiryDate;
            groceryOld.Description=grocery.Description;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteGroceryDetails(int id)
        {
            var grocery=_dbContext.grocerys.FirstOrDefault(m=>m.MaterialID==id);
            if(grocery==null)
            {
                return NotFound();
            }
            _dbContext.grocerys.Remove(grocery);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}