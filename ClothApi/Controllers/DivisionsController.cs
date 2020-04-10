using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClothApi.Data;
using ClothApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace ClothApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Divisions")]

    public class DivisionsController : Controller
    {
        private readonly DataContext _context;

        public DivisionsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Divisions
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public async Task<IEnumerable<Division>> GetDivisions()
        {
            var userId = Int32.Parse(User.Claims.Where( w => w.Type=="userId").FirstOrDefault().Value);
            List<Division> list;
            if( User.HasClaim("Admin","true")) 
            {
                list = await _context.Divisions.ToListAsync();
            }
            else
            {
               var udivs= await _context.UserDivisions.Where( w => w.IdentityUserId==userId).Select(s => s.DivisionId).ToListAsync();
               list = await _context.Divisions.Where(w => udivs.Contains(w.Id)).ToListAsync();
            }
            

            return list;
        }

        // GET: api/Divisions/5
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDivision([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var division = await _context.Divisions.SingleOrDefaultAsync(m => m.Id == id);

            if (division == null)
            {
                return NotFound();
            }

            return Ok(division);
        }

        // PUT: api/Divisions/5
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy ="Safety")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDivision([FromRoute] int id, [FromBody] Division division)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != division.Id)
            {
                return BadRequest();
            }

            _context.Entry(division).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DivisionExists(id))
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

        // POST: api/Divisions
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy ="Safety")]
        [HttpPost]
        public async Task<IActionResult> PostDivision([FromBody] Division division)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Divisions.Add(division);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDivision", new { id = division.Id }, division);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy ="Safety")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDivision([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var division = await _context.Divisions.SingleOrDefaultAsync(m => m.Id == id);
            if (division == null)
            {
                return NotFound();
            }

            _context.Divisions.Remove(division);
            await _context.SaveChangesAsync();

            return Ok(division);
        }

        private bool DivisionExists(int id)
        {
            return _context.Divisions.Any(e => e.Id == id);
        }
    }
}