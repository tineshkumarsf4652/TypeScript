using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OnlineGroceryAPI.Data;

namespace OnlineGroceryAPI.Controllers
{
    public class ApplicationDBContext:DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public DbSet<UserInfo> users{get; set;}
        public DbSet<GroceryInfo> grocerys{get; set;}
        public DbSet<OrderInfo> orders{get; set;}
    }
}