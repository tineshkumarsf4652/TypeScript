using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineGroceryAPI.Data
{
    [Table("groceryinfo", Schema = "public")]
    public class GroceryInfo
    {
        [Key]
        public int MaterialID{get; set;}
        public string MaterialName{get; set;}
        public int Quantity{get; set;}
        public double MaterialPrice{get; set;}
        public DateTime ManufactureDate{get; set;}
        public DateTime ExpiryDate{get; set;}
        public string Description{get; set;}
        public string[] MaterialImage{get; set;}
    }
}