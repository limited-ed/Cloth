using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClothApi.Data;
using ClothApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClothApi.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace ClothApi.Controllers
{
    [Route("api/profession")]
    [ApiController]
    [Produces("application/json")]
    [Authorize()]
    public class ProfessionController : ControllerBase
    {
        // GET: api/Profession
        private DataContext _context;

        public ProfessionController(DataContext context){
            _context = context;
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public IEnumerable<Profession> GetAllProfs()
        {
            return _context.Professions.Include( i => i.ProfessionCloth).ThenInclude(i => i.Cloth);
        }

        // GET: api/Profession/5
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]        
        public string GetProf(int id)
        {
            return "value";
        }

        // POST: api/Profession
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy ="Safety")]
        [HttpPost]
        public IActionResult PostProf([FromBody] Profession value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Professions.Add(value);
            try
            {
               _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(value);
        }

        // PUT: api/Profession/5
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy ="Safety")]
        [HttpPut("{id}")]
        public IActionResult PutProf(int id, [FromBody] Profession value)
        {            
            if (!ModelState.IsValid && id != value.Id)
            {
                return BadRequest(ModelState);
            }

/*
            var old=_context.ProfessionCloth.Where( w => w.ProfessionId == value.Id).ToList();
            if (value.ProfessionCloth != null) {
                _context.TryUpdateManyToMany(old, value.ProfessionCloth, (p,p1) => p.ClothId == p1.ClothId ); 
                //_context.ProfessionCloth.RemoveRange(old );
                //_context.SaveChanges();
                //_context.ProfessionCloth.AddRange(value.ProfessionCloth);
                // _context.SaveChanges();
            }
//            _context.Entry(value).State = EntityState.Modified;
*/

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfessionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();            
        }

        // DELETE: api/ApiWithActions/5
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy ="Safety")]
        [HttpDelete("{id}")]
        public void DeleteProf(int id)
        {
        }


        private bool ProfessionExists(int id)
        {
            return _context.Professions.Any(e => e.Id == id);
        }
    }
}
