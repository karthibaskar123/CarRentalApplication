using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JwtWebApi.booking;

    public class BookingDbContext : DbContext
    {
        public BookingDbContext (DbContextOptions<BookingDbContext> options)
            : base(options)
        {
        }

        public DbSet<JwtWebApi.booking.MyBooking> MyBookingData { get; set; } = default!;
    }
