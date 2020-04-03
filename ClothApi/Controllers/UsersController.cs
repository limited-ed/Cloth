using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClothApi.Data;
using ClothApi.Models.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace ClothApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Admin")]
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public IEnumerable<IdentityUser> GetUsers()
        {
            var list=_context.Users.Include(i => i.UserDivisions);
            return list;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIdentityUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identityUser = await _context.Users.Include(i => i.UserDivisions).ThenInclude((UserDivision i) => i.Division).SingleOrDefaultAsync(m => m.Id == id);

            if (identityUser == null)
            {
                return NotFound();
            }

            return Ok(identityUser);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIdentityUser([FromRoute] int id, [FromBody] IdentityUser identityUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != identityUser.Id)
            {
                return BadRequest();
            }
            var ud = new List<UserDivision>();
            var old = _context.Users.FirstOrDefault(f => f.Id==id);
            if (old==null)
            {
                return BadRequest();
            }
            if (String.IsNullOrEmpty(identityUser.PasswordHash))
            {
                identityUser.PasswordHash=old.PasswordHash;
            }
            ud.AddRange(identityUser.UserDivisions);
            _context.Entry(old).State = EntityState.Detached;
            _context.Entry(identityUser).State = EntityState.Modified;
            try
            {
                _context.UserDivisions.RemoveRange(_context.UserDivisions.Where(w => w.IdentityUserId == identityUser.Id));
                await _context.SaveChangesAsync();
                _context.UserDivisions.AddRange(ud);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IdentityUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> PostIdentityUser([FromBody] IdentityUser identityUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //identityUser.Divisions = _context.Divisions.ToList();
            _context.Users.Add(identityUser);
            try
            {
               await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }


            return Ok(identityUser);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIdentityUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identityUser = await _context.Users.SingleOrDefaultAsync(m => m.Id == id);
            if (identityUser == null)
            {
                return NotFound();
            }

            _context.Users.Remove(identityUser);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(identityUser);
        }

        private bool IdentityUserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}