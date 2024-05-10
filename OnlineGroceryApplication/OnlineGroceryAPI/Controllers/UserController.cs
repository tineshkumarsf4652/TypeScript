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
    public class UserController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UserController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_dbContext.users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserDetails(int id)
        {
            var user=_dbContext.users.FirstOrDefault(m=>m.UserID==id);
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult PostUserDetails([FromBody]UserInfo user)
        {
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutUserDetails(int id, [FromBody]UserInfo user)
        {
            var userOld=_dbContext.users.FirstOrDefault(m=>m.UserID==id);
            if(userOld==null)
            {
                return NotFound();
            }
            userOld.UserName=user.UserName;
            userOld.Email=user.Email;
            userOld.Password=user.Password;
            userOld.Address=user.Address;
            userOld.PhoneNumber=user.PhoneNumber;
            userOld.Balance=user.Balance;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUserDetails(int id)
        {
            var user=_dbContext.users.FirstOrDefault(m=>m.UserID==id);
            if(user==null)
            {
                return NotFound();
            }
            _dbContext.users.Remove(user);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}