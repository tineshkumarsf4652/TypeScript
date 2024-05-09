using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineLibraryAPI.Data
{
    [Table("bookinfo", Schema = "public")]
    public class BookInfo
    {
        [Key]
        public int BookID{get; set;}
        public string BookName{get; set;}
        public string AuthorName{get; set;}
        public int BookCount{get; set;}
    }
}