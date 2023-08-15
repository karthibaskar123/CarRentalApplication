using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using JwtWebApi.Login;
using JwtWebApi.Signup;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TokenAuth.Date;

namespace jwt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TokenDbcontext _context;
        public static Signup user = new Signup();
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration, TokenDbcontext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllUser()
        {
          var user = _context.UserData.Include(cart=>cart.Favorites).ToList();
          return Ok(user);
        }


        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteUser(int id)
        // {
        //     var user = await _context.UserData.FindAsync(id);
        //     if (user == null)
        //     {
        //         return NotFound();
        //     }
        //   _context.UserData.Remove(user);
        //     await _context.SaveChangesAsync();
        //     return NoContent();
        // }


        [HttpPost("register")]
        public async Task<ActionResult<Signup>> Signup(Signup requests)
        {
            CreatePasswordHash(requests.Password, out byte[] passwordHash, out byte[] passwordSalt);

            //assign the values
            var user = new Signup()
            {
                UserId = requests.UserId,
                FirstName = requests.FirstName,
                LastName = requests.LastName,
                PhoneNumber = requests.PhoneNumber,
                Email = requests.Email,
                Password = requests.Password,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Favorites= requests.Favorites
            };

            await _context.UserData.AddAsync(user);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Signin(Signin login)
        {
            var userexit = await _context.UserData.FirstOrDefaultAsync(user=>user.Email == login.Email);
            if(userexit==null)
            {
                return BadRequest("user not found");
            }
            var user = userexit;

            if(!VerifyPasswordHash(login.Password, user.PasswordHash,user.PasswordSalt))
            {
                return BadRequest("password not vaild");
            }
            var Token = createToken(user);
            return Ok(new {Message = Token});
        }

        [HttpPatch]
        [Route("{id:int}/favorite")]
        public async Task<IActionResult> Patchuser(int id, [FromBody]JsonPatchDocument<Signup> user)
        {
          if (user==null && id<=0)
          {
            return BadRequest();
          }
         var userdetails = _context.UserData.Include(myuser => myuser.Favorites).Where(myuser=>myuser.UserId==id).FirstOrDefault();
         if(userdetails==null)
         {
            return NotFound();
         }
          user.ApplyTo(userdetails);
          await _context.SaveChangesAsync();
          return NoContent();
        }


        private string createToken(Signup login)
         {
            if(login.Email == "Admin@gmail.com" && login.Password == "Admin@123")
            {
                List<Claim>claim = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name,login.Email),
                    new Claim(ClaimTypes.Role,"admin")
                };
                var keys = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
                var credentials = new SigningCredentials(keys,SecurityAlgorithms.HmacSha512Signature);
                var tokens = new JwtSecurityToken(claims:claim,expires:DateTime.Now.AddDays(1),signingCredentials:credentials);
                var jwts = new JwtSecurityTokenHandler().WriteToken(tokens);
                return jwts;
            }
            else
            {
                //collection of claim objects
            List<Claim>claims=new List<Claim>()
            {
                  new Claim(ClaimTypes.Name,login.Email),
                  new Claim(ClaimTypes.Role,"user")
            };

                //converts a string value to a byte array using the UTF-8 encoding.
                //Appsettings retrieve the values from appsettings.Token
                var key= new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

                //secure algorithm for generating digital signatures using a secret key
                var credentials1=new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

                var token=new JwtSecurityToken(claims:claims,expires:DateTime.Now.AddDays(1),signingCredentials:credentials1);

                //Compact serialized format of token
                var jwt=new JwtSecurityTokenHandler().WriteToken(token);
                return jwt;
            }
         }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(passwordHash);
            }
        }
        [HttpGet("{id:int}")]
        public ActionResult<Signup>UserbyId(int id)
        {
          var getuser = _context.UserData.Include(car=>car.Favorites).FirstOrDefault(find=>find.UserId==id);
          return getuser;
        }

        [HttpDelete("{favoriteid}")]
        public async Task<IActionResult> Delete(int favoriteid)
        {
            if (favoriteid < 1)
                return BadRequest();
            var data = await _context.FavoriteData.FindAsync(favoriteid);
            if (data == null)
                return NotFound();
            _context.FavoriteData.Remove(data);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
