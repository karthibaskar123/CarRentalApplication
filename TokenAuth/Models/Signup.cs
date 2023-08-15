using System.ComponentModel.DataAnnotations;
using JwtWebApi.booking;

namespace JwtWebApi.Signup
#nullable disable
{
    public class Signup
    {
        public int UserId{get;set;}
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public List<MyFavoriteCar> Favorites { get; set; }

    }
     public class MyFavoriteCar
    {
      public int FavoriteId{get;set;}
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
   }

}
