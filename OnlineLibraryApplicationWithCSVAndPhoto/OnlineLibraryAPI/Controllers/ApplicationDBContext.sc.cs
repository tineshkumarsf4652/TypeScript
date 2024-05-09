using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OnlineLibraryAPI.Data;

namespace OnlineLibraryAPI.Controllers
{
    public class ApplicationDBContext:DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public DbSet<UserInfo> users{get; set;}
        public DbSet<BookInfo> books{get; set;}
        public DbSet<BorrowInfo> borrows{get; set;}
    }
}