using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Principal;
using ClothApi.Models.Identity;
using ClothApi.Common;
using ClothApi.Data;


// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ClothApi.Controllers
{
    public class UserModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class RefreshModel
    {
        public string RefreshToken { get; set; }
    }

    public class TokenController : Controller
    {
        private RefreshTokenStorage _storage;
        private DataContext _context;

        public TokenController(RefreshTokenStorage storage, DataContext context)
        {
            _storage = storage;
            _context = context;
        }


        [HttpPost]
        [Route("/token")]
        public IActionResult Token([FromBody]UserModel um)
        {
            var passHash = um.Password.GetHash();
            var user = _context.Users.FirstOrDefault(w => w.Login.ToLower() == um.Username.ToLower() && w.PasswordHash == passHash);

            if (user == null)
            {
                return Unauthorized();
            }

            var handler = new JwtSecurityTokenHandler();

            var sec = "401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1";
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(sec));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.UserName),
                        new Claim("userRole", user.RoleId.ToString()) };
            claims.Add(new Claim ("userId", user.Id.ToString()));
            if (user.RoleId == 2) claims.Add(new Claim("Storekeeper","true"));
            if (user.RoleId == 3) 
            { 
                claims.Add(new Claim("Storekeeper","true"));
                claims.Add(new Claim("Safety","true")); 
            }
            if (user.RoleId == 4) 
            {
                claims.Add(new Claim("Storekeeper","true"));
                claims.Add(new Claim("Safety","true"));                 
                claims.Add(new Claim("Admin","true"));
            }

            var identity = new ClaimsIdentity(claims);

            var token = new JwtSecurityToken(issuer: "ClothWebAPI", audience: "ClothWebAPIAudience", claims: identity.Claims,
                  expires: DateTime.UtcNow.AddDays(7), signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256));

            var refresh = Guid.NewGuid().ToString();
            _storage.Tokens.Add(refresh,identity);
            return Json(new { token = new JwtSecurityTokenHandler().WriteToken(token), refreshToken=refresh });

        }

        [HttpPost]
        [Route("/refresh")]
        public object Refresh([FromBody] RefreshModel rm)
        {
            if (!_storage.Tokens.ContainsKey(rm.RefreshToken))
            {
                return BadRequest();
            }

            var handler = new JwtSecurityTokenHandler();

            var sec = "401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1";
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(sec));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(issuer: "ClothWebAPI", audience: "ClothWebAPI", claims: _storage.Tokens[rm.RefreshToken].Claims,
                  expires: DateTime.UtcNow.AddMinutes(120), signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256));

            var refresh = Guid.NewGuid().ToString();
            _storage.Tokens.Add(refresh, _storage.Tokens[rm.RefreshToken]);
            _storage.Tokens.Remove(rm.RefreshToken);
            return Json(new { token = new JwtSecurityTokenHandler().WriteToken(token), refreshToken = refresh });
        }
    }
}
