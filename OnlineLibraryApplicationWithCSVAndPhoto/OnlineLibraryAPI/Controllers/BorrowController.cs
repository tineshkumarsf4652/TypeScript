using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineLibraryAPI.Data;

namespace OnlineLibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BorrowController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetBorrow()
        {
            return Ok(_dbContext.borrows);
        }

        [HttpGet("{id}")]
        public IActionResult GetBorrowDetails(int id)
        {
            var borrow=_dbContext.borrows.FirstOrDefault(m=>m.BorrowID==id);
            if(borrow==null)
            {
                return NotFound();
            }
            return Ok(borrow);
        }

        [HttpPost]
        public IActionResult PostBorrowDetails([FromBody]BorrowInfo borrow)
        {
            _dbContext.borrows.Add(borrow);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutBorrowDetails(int id, [FromBody]BorrowInfo borrow)
        {
            var borrowOld=_dbContext.borrows.FirstOrDefault(m=>m.BorrowID==id);
            if(borrowOld==null)
            {
                return NotFound();
            }
            borrowOld.BookID=borrow.BookID;
            borrowOld.UserID=borrow.UserID;
            borrowOld.BorrowedDate=borrow.BorrowedDate;
            borrowOld.BorrowBookCount=borrow.BorrowBookCount;
            borrowOld.Status=borrow.Status;
            borrowOld.PaidFineAmount=borrow.PaidFineAmount;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBorrowDetails(int id)
        {
            var borrow=_dbContext.borrows.FirstOrDefault(m=>m.BorrowID==id);
            if(borrow==null)
            {
                return NotFound();
            }
            _dbContext.borrows.Remove(borrow);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}