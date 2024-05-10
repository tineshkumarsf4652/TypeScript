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
    public class OrderController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public OrderController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetOrder()
        {
            return Ok(_dbContext.orders);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderDetails(int id)
        {
            var order=_dbContext.orders.FirstOrDefault(m=>m.OrderID==id);
            if(order==null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPost]
        public IActionResult PostOrderDetails([FromBody]OrderInfo order)
        {
            _dbContext.orders.Add(order);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutOrderDetails(int id, [FromBody]OrderInfo order)
        {
            var orderOld=_dbContext.orders.FirstOrDefault(m=>m.OrderID==id);
            if(orderOld==null)
            {
                return NotFound();
            }
            orderOld.MaterialID=order.MaterialID;
            orderOld.UserID=order.UserID;
            orderOld.PurchaseDate=order.PurchaseDate;
            orderOld.Quantity=order.Quantity;
            orderOld.TotalPrice=order.TotalPrice;
            orderOld.OrderStatus=order.OrderStatus;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrdersDetails(int id)
        {
            var order=_dbContext.orders.FirstOrDefault(m=>m.OrderID==id);
            if(order==null)
            {
                return NotFound();
            }
            _dbContext.orders.Remove(order);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}