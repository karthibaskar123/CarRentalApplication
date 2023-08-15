using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TokenAuth.Products;

namespace JwtWebApi.booking{
   public class MyBooking
   {
    [Key]
      public int BookingId{get;set;}
      public int UserId{get;set;}
      public int ProductId{get;set;}
      public string BrandName{get;set;}
      public string ModelName{get;set;}
      public decimal PricePerDay{get;set;}
      public double KilometersDriven{get;set;}
      public string TransmissionType{get;set;}
      public string EngineType{get;set;}
      public string Type{get;set;}
      public string Description{get;set;}
      public string Category{get;set;}
      public string ImagePath{get;set;}
      public string RefundAmount{get;set;}
      public string Color{get;set;}
      public string Location{get;set;}
      public string CarAddress{get;set;}
      public string RentalDays{get;set;}
      public string RentDate{get;set;}
      public string ReturnDate{get;set;}
      public string ShippingType{get;set;}
      public string DrivingLicence{get;set;}
      public string DrivingLicenceNumber{get;set;}
      [NotMapped]
      public IFormFile DrivingLicenceImage{get;set;}
      public string CustomerAddress{get;set;}
      public string RentalAmount{get;set;}
      public string TotalAmount{get;set;}
      public string Status{get;set;}
   }
}
