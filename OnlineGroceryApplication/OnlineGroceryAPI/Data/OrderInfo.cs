using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineGroceryAPI.Data
{
    [Table("orderinfo",Schema = "public")]
    public class OrderInfo
    {
        [Key]
        public int OrderID{get; set;}
        public int[] MaterialID{get; set;}
        public int UserID{get; set;}
        public string[] MaterialName{get; set;}
        public int[] Quantity{get; set;}
        public int[] MaterialPrice{get; set;}
        public double TotalPrice{get; set;}
        public DateTime PurchaseDate{get; set;}
        public string OrderStatus{get; set;}
    }
}