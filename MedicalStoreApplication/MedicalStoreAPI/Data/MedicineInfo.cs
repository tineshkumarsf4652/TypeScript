using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalStoreAPI.Data
{
    [Table("medicineinfo", Schema = "public")]
    public class MedicineInfo
    {
        [Key]
        public int MedicineID{get; set;}
        public string MedicineName{get; set;}
        public int MedicineCount{get; set;}
        public double MedicinePrice{get; set;}
        public DateTime MedicineDate{get; set;}
    }
}