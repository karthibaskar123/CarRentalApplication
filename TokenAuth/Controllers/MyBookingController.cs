using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JwtWebApi.booking;
using TokenAuth.Date;
using Microsoft.AspNetCore.JsonPatch;

namespace TokenAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyBookingController : ControllerBase
    {
        private readonly BookingDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public MyBookingController(BookingDbContext context,IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        // GET: api/MyBooking
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MyBooking>>> GetMyBooking()
        {
            return await _context.MyBookingData.ToListAsync();
        }

        // GET: api/MyBooking/5

        // public ActionResult GetMyBooking(int userid)
        // {
        //     var myBooking =  _context.MyBookingData.Where(user=>user.userid==userid).ToListAsync();

        //     if (myBooking == null)
        //     {
        //         return NotFound();
        //     }

        //     return Ok(myBooking);
        // }
        // [HttpGet("venueName")]
        // public async Task<ActionResult<List<Game>>> GetSportAvailableInVenueAsync(string venueName)
        // {
        //   var gamesList = await _context.tbl_games.Where(game => game.venueName == venueName).ToListAsync();
        //   return gamesList;
        // }
        [HttpGet("userid")]
        public async Task<ActionResult<MyBooking>> Getbookingbyuserid(int id)
        {
            var boooking = await _context.MyBookingData.Where(user=>user.UserId==id).ToListAsync();

            if (boooking == null)
            {
                return NotFound();
            }

            return Ok(boooking);
        }
        [HttpGet("Bookingid")]
        public async Task<ActionResult<MyBooking>> Getbookingbybookingid(int Bookingid)
        {
            var boooking = await _context.MyBookingData.Where(user=>user.BookingId==Bookingid).ToListAsync();

            if (boooking == null)
            {
                return NotFound();
            }

            return Ok(boooking);
        }

        [HttpPatch]
        [Route("{id:int}/status")]
        public async Task<IActionResult> Patchuser(int id,JsonPatchDocument<MyBooking> booking)
        {
          if (booking==null && id<=0)
          {
            return BadRequest();
          }
         var bookingdetails = _context.MyBookingData.Where(myuser=>myuser.BookingId==id).FirstOrDefault();
         if(bookingdetails==null)
         {
            return NotFound();
         }
          booking.ApplyTo(bookingdetails);
          await _context.SaveChangesAsync();
          return NoContent();
        }


        // PUT: api/MyBooking
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMyBooking(int id,[FromForm] MyBooking Data)
        {
            var products = await _context.MyBookingData.FindAsync(id);
            if( products == null)
            {
                return NotFound();
            }
                products.UserId=Data.UserId;
                products.ProductId=Data.ProductId;
                products.BrandName = Data.BrandName;
                products.ModelName = Data.ModelName;
                products.PricePerDay = Data.PricePerDay;
                products.KilometersDriven = Data.KilometersDriven;
                products.TransmissionType = Data.TransmissionType;
                products.EngineType = Data.EngineType;
                products.Type = Data.Type;
                products.Description = Data.Description;
                products.Category = Data.Category;
                products.RefundAmount = Data.RefundAmount;
                products.Color = Data.Color;
                products.ImagePath = Data.ImagePath;
                products.RentalAmount=Data.RentalAmount;
                products.RentalDays=Data.RentalDays;
                products.RentDate=Data.RentDate;
                products.ReturnDate=Data.ReturnDate;
                products.ShippingType=Data.ShippingType;
                products.CustomerAddress=Data.CustomerAddress;
                products.TotalAmount=Data.TotalAmount;
                products.DrivingLicence=Data.DrivingLicence;
                products.DrivingLicenceNumber=Data.DrivingLicenceNumber;


               if(Data.DrivingLicenceImage != null)
               {
                products.DrivingLicence = await SaveImage(Data.DrivingLicenceImage);

               }
               await _context.SaveChangesAsync();
               return Ok(products);
              }
              //post
              [HttpPost]
              public async Task<ActionResult<MyBooking>> PostProduct([FromForm] MyBooking product)
              {
            var products = new MyBooking
            {
                UserId=product.UserId,
                ProductId=product.ProductId,
                BrandName = product.BrandName,
                ModelName = product.ModelName,
                PricePerDay = product.PricePerDay,
                KilometersDriven = product.KilometersDriven,
                TransmissionType = product.TransmissionType,
                EngineType = product.EngineType,
                Type = product.Type,
                Description = product.Description,
                Category = product.Category,
                RefundAmount = product.RefundAmount,
                Color = product.Color,
                ImagePath=product.ImagePath,
                Location=product.Location,
                CarAddress=product.CarAddress,
                RentalAmount=product.RentalAmount,
                RentalDays=product.RentalDays,
                RentDate=product.RentDate,
                ReturnDate=product.ReturnDate,
                ShippingType=product.ShippingType,
                CustomerAddress=product.CustomerAddress,
                DrivingLicenceNumber=product.DrivingLicenceNumber,
                TotalAmount=product.TotalAmount,
                DrivingLicence=product.DrivingLicence

            };

            if(product.DrivingLicenceImage != null)
            {
                products.DrivingLicence = await SaveImage(product.DrivingLicenceImage);
            }


            _context.MyBookingData.Add(products);
            await _context.SaveChangesAsync();

            return Ok(products);
        }
        private async Task<string> SaveImage(IFormFile image)
        {
            var fileName = Path.GetFileName(image.FileName);
            var uploadsDirPath = Path.Combine(_hostEnvironment.WebRootPath, "DrivingLicence");

            if (!Directory.Exists(uploadsDirPath))
            {
                Directory.CreateDirectory(uploadsDirPath);
            }

            var filePath = Path.Combine(uploadsDirPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }
            return fileName;
        }

        // DELETE: api/MyBooking/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMyBooking(int id)
        {
            var myBooking = await _context.MyBookingData.FindAsync(id);
            if (myBooking == null)
            {
                return NotFound();
            }

            _context.MyBookingData.Remove(myBooking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MyBookingExists(int id)
        {
            return _context.MyBookingData.Any(e => e.BookingId == id);
        }
    }
}
