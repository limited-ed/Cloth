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
    [Route("api/[controller]")]
    [ApiController]
    [Authorize()]
    public class EmployeeClothController : ControllerBase
    {
        private readonly DataContext _context;

        public EmployeeClothController(DataContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeCloth
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeCloth>>> GetEmployeeCloths()
        {
            return await _context.EmployeeCloths.ToListAsync();
        }

        // GET: api/EmployeeCloth/5
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]        
        public async Task<ActionResult<EmployeeCloth[]>> GetEmployeeCloth(int id)
        {
            var employeeCloth = await _context.EmployeeCloths.Where(w=>w.EmployeeId==id).ToArrayAsync();

            if (employeeCloth == null)
            {
                return NotFound();
            }

            return employeeCloth;
        }

        // PUT: api/EmployeeCloth/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy ="Storekeeper")]     
        [HttpPut]
        public async Task<IActionResult> PutEmployeeCloth(EmployeeCloth employeeCloth)
        {

            _context.Entry(employeeCloth).State = EntityState.Modified;
            var cloth = await _context.Cloth.FirstOrDefaultAsync( f => f.Id == employeeCloth.ClothId);
            if (cloth == null) return BadRequest();

            employeeCloth.EndDate = employeeCloth.BeginDate.Value.AddMonths(cloth.Period);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                    throw;
            }

            return Ok(employeeCloth);
        }

        // POST: api/EmployeeCloth
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy ="Storekeeper")]      
        [HttpPost]
        public async Task<ActionResult<EmployeeCloth>> PostEmployeeCloth(EmployeeCloth employeeCloth)
        {
            _context.EmployeeCloths.Add(employeeCloth);
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

        // DELETE: api/EmployeeCloth/5
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy ="Storekeeper")]
        [HttpDelete]
        public async Task<ActionResult<EmployeeCloth>> DeleteEmployeeCloth(EmployeeCloth ec)
        {
            var employeeCloth = await _context.EmployeeCloths.FirstAsync( f => f.ClothId==ec.ClothId && f.EmployeeId==ec.EmployeeId);
            if (employeeCloth == null)
            {
                return NotFound();
            }

            _context.EmployeeCloths.Remove(employeeCloth);
            await _context.SaveChangesAsync();

            return employeeCloth;
        }

    }
}
