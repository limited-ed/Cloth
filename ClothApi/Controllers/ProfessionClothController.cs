using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClothApi.Data;
using ClothApi.Models;
using ClothApi.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace ClothApi.Controllers
{

    [Route("api/professioncloth")]
    [ApiController]
    [Produces("application/json")]

    public class ProfessionClothController : ControllerBase
    {
        private readonly DataContext _context;

        public ProfessionClothController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ProfessionCloth
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<ProfessionCloth>>> GetProfessionCloth([FromBody]QueryData data)
        {
            return await _context.ProfessionCloth.ToListAsync();
        }

        // GET: api/ProfessionCloth/5
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<ProfessionCloth>> GetProfessionCloth(int id)
        {
            var professionCloth = await _context.ProfessionCloth.FindAsync(id);

            if (professionCloth == null)
            {
                return NotFound();
            }

            return professionCloth;
        }

        // POST: api/ProfessionCloth
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy ="Safety")]
        [HttpPost("{id}")]
        public async Task<ActionResult> PostProfessionCloth([FromRoute]int id, [FromBody]ProfessionCloth[] data)
        {
            var old = _context.ProfessionCloth.Where( w => w.ProfessionId == id).ToList();
            if (data != null) {
                _context.TryUpdateManyToMany(old, data, (p,p1) => p.ClothId == p1.ClothId ); 
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException) 
            {
                throw;
            }

            return Ok();
        }

    }
}
