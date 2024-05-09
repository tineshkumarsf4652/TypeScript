using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineLibraryAPI.Data
{
    [Table("borrowinfo", Schema = "public")]
    public class BorrowInfo
    {
        [Key]
        public int BorrowID{get; set;}
        public int BookID{get; set;}
        public int UserID{get; set;}
        public DateTime BorrowedDate{get; set;}
        public int BorrowBookCount{get; set;}
        public string Status{get; set;}
        public double PaidFineAmount{get; set;}
    }
}