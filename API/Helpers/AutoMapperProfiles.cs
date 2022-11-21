using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //Map individual member of an object 
            // In this eg, We define our destination which id MemberDto.PhotoUrl, Then We define our source which is 
            // AppUser.Photos, we find the photo which is main and return the url of the photo
            CreateMap<AppUser, MemberDto>()
            .ForMember(destination => destination.PhotoUrl, options => options.MapFrom(source =>  
            source.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(destination => destination.Age, options => options.MapFrom(source =>  
            source.DateOfBirth.CalculateAge())); 

          
            CreateMap<Photo, PhotoDto>();

            CreateMap<MemberUpdateDto, AppUser>();
        }
    }
}