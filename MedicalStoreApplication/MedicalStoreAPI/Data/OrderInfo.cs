using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalStoreAPI.Data
{
    [Table("orderinfo", Schema = "public")]
    public class OrderInfo
    {
        [Key]
        public int OrderID{get; set;}
        public int MedicineID{get; set;}
        public int UserID{get; set;}
        public string MedicineName{get; set;}
        public int MedicineCount{get; set;}
        public double TotalPrice{get; set;}
        public string OrderStatus{get; set;}
    }
}