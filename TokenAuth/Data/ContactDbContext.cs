using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Contact;

    public class ContactDbContext : DbContext
    {
        public ContactDbContext (DbContextOptions<ContactDbContext> options)
            : base(options)
        {
        }

        public DbSet<WebApi.Contact.Contact> ContactData { get; set; } = default!;
    }
