using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {

        // SymmetricSecurityKey is a type of encryption where one key is used to sign and verify that the JWT token 
        // is verified 
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(AppUser user)
        {
           // Add our claims
           var claims = new List<Claim>
           {
               new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
           };

           // Create some credentials
           var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

           // Add our token descriptor to describe our token
           var tokenDescriptor = new SecurityTokenDescriptor
           {
               Subject = new ClaimsIdentity(claims),
               Expires = DateTime.Now.AddDays(7),
               SigningCredentials = creds
           };

           var tokenHandler = new JwtSecurityTokenHandler();

           var token = tokenHandler.CreateToken(tokenDescriptor);

           return tokenHandler.WriteToken(token);
        }
    }
}