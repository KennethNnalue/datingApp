using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dob)
        {
            var today = DateTime.Today;

            //Calculates age based on year while the birth month and day is not considered
            var age = today.Year - dob.Year;
            
            //Check if the date and month of birth is reached, otherwise subtract 1 from the birth year
            if(dob.Date > today.AddYears(-age)) age--;
            return age;
        }
        
    }
}