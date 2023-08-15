using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TokenAuth.Products;
using Microsoft.AspNetCore.JsonPatch;
// using TokenAuth.productreference;

namespace TokenAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ProductController(ProductDbContext context,IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProduct()
        {
            return await _context.ProductData.ToListAsync();
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.ProductData.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }
        // PUT: api/Product/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id,[FromForm] Product product)
        {
            var products = await _context.ProductData.FindAsync(id);
            if( products == null)
            {
                return NotFound();
            }
                products.BrandName = product.BrandName;
                products.ModelName = product.ModelName;
                products.PricePerDay = product.PricePerDay;
                products.KilometersDriven = product.KilometersDriven;
                products.TransmissionType = product.TransmissionType;
                products.EngineType = product.EngineType;
                products.Type = product.Type;
                products.Description = product.Description;
                products.Category = product.Category;
                products.RefundAmount = product.RefundAmount;
                products.Color = product.Color;
                products.Location=product.Location;
                products.CarAddress=product.CarAddress;
                products.Image=product.Image;
                products.IsAvailable=product.IsAvailable;

               if(product.Image != null)
               {
                products.ImagePath = await SaveImage(product.Image);

               }
               await _context.SaveChangesAsync();
               return Ok(products);
        }




        [HttpPatch]
        [Route("{id:int}/available")]
        public async Task<IActionResult> Patchuser(int id,JsonPatchDocument<Product> product)
        {
          if (product==null && id<=0)
          {
            return BadRequest();
          }
         var productdetails = _context.ProductData.Where(data=>data.ProductId==id).FirstOrDefault();
         if(productdetails==null)
         {
            return NotFound();
         }
          product.ApplyTo(productdetails);
          await _context.SaveChangesAsync();
          return NoContent();
        }

        // POST: api/Product
        // To protect from overposting attacks; see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromForm] Product product)
        {
            var products = new Product
            {
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
                Location=product.Location,
                CarAddress=product.CarAddress,
                Image=product.Image,
                IsAvailable=product.IsAvailable

            };

            if(product.Image != null)
            {
                products.ImagePath = await SaveImage(product.Image);
            }

            _context.ProductData.Add(products);
            await _context.SaveChangesAsync();

            return Ok(products);
        }


        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.ProductData.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.ProductData.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private async Task<string> SaveImage(IFormFile image)
        {
            var fileName = Path.GetFileName(image.FileName);
            var uploadsDirPath = Path.Combine(_hostEnvironment.WebRootPath, "Image");

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



    [HttpGet("search")]
    public IActionResult SearchProducts(string data)
    {
        if (string.IsNullOrEmpty(data))
        {
            return BadRequest("Please provide the data you want search");
        }
        var products =  _context.ProductData.ToList()
            .Where(productname =>
                (productname.BrandName != null && productname.BrandName.Contains(data, StringComparison.OrdinalIgnoreCase)) ||
                (productname.Color != null && productname.Color.Contains(data, StringComparison.OrdinalIgnoreCase))
            )
            .ToList();
        if (products.Count == 0)
        {
            return NotFound("No products found .");
        }

        return Ok(products);
    }



        private bool ProductExists(int id)
        {
            return _context.ProductData.Any(data => data.ProductId == id);
        }

    }
}
