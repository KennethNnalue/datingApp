using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class MemberDto
    {
         public int Id { get; set; }

         //AutoMapper mapps the UserName to Username, the Camel case doses not matter
        public string Username { get; set; }   
        public string PhotoUrl { get; set; } 
         public int Age  { get; set; }
         public string KnownAs { get; set; }
         public DateTime CreatedAt { get; set; } 

         public DateTime LastActive { get; set; } 
          public string Gender { get; set; }
         public string Introduction { get; set; }
         public string LookingFor { get; set; }
         public string Interests { get; set; }
         public string City { get; set; }
         public string Country { get; set; }
         public ICollection<PhotoDto> Photos { get; set; }

    }
}