using System.ComponentModel.DataAnnotations;

namespace WebApi
{
  public class Payment{
    [Key]
    public int PaymentId{get;set;}
    public int UserId{get;set;}
    public int BookingId{get;set;}
    public string CardNumber{get;set;}
    public string Cvv{get;set;}
    public string ExpiryDate{get;set;}
    public string BookingDate{get;set;}
    public string DeliveryDate{get;set;}
    public string TotalAmount{get;set;}
  }
}
