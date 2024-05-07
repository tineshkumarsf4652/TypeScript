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
        /*private static List<User> _Users=new List<User>
        {
            new User{CardID=1001,Username="Rohit",Email="rohit45@gmail.com",Password="rohit45",PhoneNumber="9876543210",Balance=0},
            new User{CardID=1002,Username="Virat",Email="virat18@gmail.com",Password="virat18",PhoneNumber="9876123450",Balance=0}
        };*/
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
            var user=_dbContext.users.FirstOrDefault(m=>m.CardID==id);
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult PostUserDetails([FromBody]User user)
        {
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutUserDetails(int id, [FromBody]User user)
        {
            var userOld=_dbContext.users.FirstOrDefault(m=>m.CardID==id);
            if(userOld==null)
            {
                return NotFound();
            }
            userOld.Username=user.Username;
            userOld.Email=user.Email;
            userOld.Password=user.Password;
            userOld.PhoneNumber=user.PhoneNumber;
            userOld.Balance=user.Balance;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUserDetails(int id)
        {
            var user=_dbContext.users.FirstOrDefault(m=>m.CardID==id);
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

