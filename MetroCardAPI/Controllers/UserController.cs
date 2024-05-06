using MetroCardAPI;
using MetroCardAPI.Data;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
namespace MetroCardAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UserController:ControllerBase
    {
        private static List<User> _Users=new List<User>
        {
            new User{CardID=1001,Username="Rohit",Email="rohit45@gmail.com",Password="rohit45",PhoneNumber="9876543210",Balance=0},
            new User{CardID=1002,Username="Virat",Email="virat18@gmail.com",Password="virat18",PhoneNumber="9876123450",Balance=0}
        };
        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_Users);
        }
        [HttpGet("{id}")]
        public IActionResult GetUserDetails(int id)
        {
            var user=_Users.Find(m=>m.CardID==id);
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpPost]
        public IActionResult PostUserDetails([FromBody]User user)
        {
            _Users.Add(user);
            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult PutUserDetails(int id, [FromBody]User user)
        {
            var index=_Users.FindIndex(m=>m.CardID==id);
            if(index<0)
            {
                return NotFound();
            }
            _Users[index]=user;
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteUserDetails(int id)
        {
            var user=_Users.Find(m=>m.CardID==id);
            if(user==null)
            {
                return NotFound();
            }
            _Users.Remove(user);
            return Ok();
        }
    }
}

