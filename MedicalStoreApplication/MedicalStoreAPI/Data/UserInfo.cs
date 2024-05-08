using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Core.Objects.DataClasses;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalStoreAPI.Data
{
    [Table("userinfo", Schema ="public")]
    public class UserInfo
    {
        [Key]
        public int UserID{get; set;}
        public string UserName{get; set;}
        public string UserMail{get; set;}
        public string UserPassword{get; set;}
        public string UserPhoneNumber{get; set;}
        public double UserBalance{get; set;}
    }
}