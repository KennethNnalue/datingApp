using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        public IUserRepository _userRepository ;
        private readonly IMapper _mapper;
        
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            
        }

        [HttpGet]
        public async Task< ActionResult<IEnumerable<MemberDto>>> GetUsers(){

          return Ok(await _userRepository.GetMembersAsync());
            
        }
        
        [HttpGet("{username}")]
        public async Task< ActionResult<MemberDto>> GetUser( string username){

          return  await _userRepository.GetMemberAsync(username);

        
           
            
        }

        [HttpPut ]
        public async Task< ActionResult<MemberUpdateDto>> UpdateUser( MemberUpdateDto memberUpdateDto){

         // Finf the username from the token given to the user 
         var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

         // Get the user
         var user = await _userRepository.GetUserByUsernameAsync(username);

        // map from memberDto to user
        _mapper.Map(memberUpdateDto, user);

        // makes our dataContext as updated to guarantee no errors when we return from this update funtion
        _userRepository.Update(user);

        if(await _userRepository.SaveAllAsync()) return NoContent();

        //if update fails
        return BadRequest("Failed to update user");
           
            
        }
    }
}