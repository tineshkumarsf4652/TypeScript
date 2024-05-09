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
    public class BookController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BookController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetBook()
        {
            return Ok(_dbContext.books);
        }

        [HttpGet("{id}")]
        public IActionResult GetBookDetails(int id)
        {
            var book=_dbContext.books.FirstOrDefault(m=>m.BookID==id);
            if(book==null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public IActionResult PostBookDetails([FromBody]BookInfo book)
        {
            _dbContext.books.Add(book);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutBookDetails(int id, [FromBody]BookInfo book)
        {
            var bookOld=_dbContext.books.FirstOrDefault(m=>m.BookID==id);
            if(bookOld==null)
            {
                return NotFound();
            }
            bookOld.BookName=book.BookName;
            bookOld.AuthorName=book.AuthorName;
            bookOld.BookCount=book.BookCount;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBookDetails(int id)
        {
            var book=_dbContext.books.FirstOrDefault(m=>m.BookID==id);
            if(book==null)
            {
                return NotFound();
            }
            _dbContext.books.Remove(book);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}