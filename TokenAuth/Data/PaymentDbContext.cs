using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi;

    public class PaymentDbContext : DbContext
    {
        public PaymentDbContext (DbContextOptions<PaymentDbContext> options)
            : base(options)
        {
        }

        public DbSet<WebApi.Payment> Payment { get; set; } = default!;
    }
