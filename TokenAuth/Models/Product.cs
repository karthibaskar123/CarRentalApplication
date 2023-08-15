using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TokenAuth.Products
{
    public class Product
    {
        [Key]
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
        [NotMapped]
        public IFormFile Image{get;set;}
        public string RefundAmount{get;set;}
        public string Color{get;set;}
        public string Location{get;set;}
        public string CarAddress{get;set;}
        public string IsAvailable{get;set;}

    }

}
