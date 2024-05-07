using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace MetroCardAPI.Data
{
    [Table("userinfo", Schema="public")]
    public class User
    {
        [Key]
        public int CardID{get; set;}
        public string Username {get; set;}
        public string Email{get; set;}
        public string Password{get;set;}
        public string PhoneNumber{get;set;}
        public double Balance{get; set;}
    }
}
