using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClothApi.Data;
using ClothApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace ClothApi.Controllers
{
    [Route("api/cloth")]
    [Produces("application/json")]

    public class ClothController : ControllerBase
    {
        private DataContext _context;

        public ClothController(DataContext context)
        {
            _context=context;
        }

        // GET: api/Cloth
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IEnumerable<Cloth> Get()
        {
            return _context.Cloth.ToList();
        }

        // GET: api/Cloth/5
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Get(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cloth = _context.Cloth.SingleOrDefault( w=>w.Id == id);

            if (cloth==null)
            {
                return BadRequest();
            }

            return Ok(cloth);
        }

        // POST: api/Cloth
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy ="Safety")]
        [HttpPost]
        public IActionResult Post([FromBody] Cloth value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Cloth.Add(value);
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

        // PUT: api/Cloth/5
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy ="Safety")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Cloth value)
        {
                       if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != value.Id)
            {
                return BadRequest();
            }
             _context.Entry(value).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClothExists(id))
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

        // DELETE: api/ApiWithActions/5 
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy ="Safety")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok();
        }

        private bool ClothExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
