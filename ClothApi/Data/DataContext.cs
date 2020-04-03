using ClothApi.Models;
using ClothApi.Models.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClothApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext()
        {

        }

        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
        }

        public DbSet<Division> Divisions { get; set; }
        public DbSet<IdentityUser> Users { get; set; }
        public DbSet<UserDivision> UserDivisions { get; set; }
        public DbSet<IdentityRole> Roles { get; set; }
        public DbSet<Profession> Professions { get; set; }
        public DbSet<Cloth> Cloth { get; set; }
        public DbSet<ProfessionCloth> ProfessionCloth { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeCloth> EmployeeCloths { get; set; }
        
        




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Division>().HasKey(k => k.Id);
            modelBuilder.Entity<IdentityUser>().HasKey(k => k.Id);
            modelBuilder.Entity<Profession>().HasKey(k => k.Id);
            modelBuilder.Entity<Cloth>().HasKey(k => k.Id);


            modelBuilder.Entity<UserDivision>().HasKey(t => new { t.DivisionId, t.IdentityUserId });
            modelBuilder.Entity<UserDivision>().HasOne(ud => ud.Division).WithMany(d => d.UserDivisions).HasForeignKey(ud => ud.DivisionId);
            modelBuilder.Entity<UserDivision>().HasOne(ud => ud.IdentityUser).WithMany(u => u.UserDivisions).HasForeignKey(ud => ud.IdentityUserId);

            modelBuilder.Entity<ProfessionCloth>().HasKey(t => new { t.ProfessionId, t.ClothId });
            modelBuilder.Entity<ProfessionCloth>().HasOne(pc => pc.Profession).WithMany(p => p.ProfessionCloth).HasForeignKey(pc => pc.ProfessionId);
            modelBuilder.Entity<ProfessionCloth>().HasOne(pc => pc.Cloth).WithMany(c => c.ProfessionCloth).HasForeignKey(pc => pc.ClothId);

            modelBuilder.Entity<EmployeeCloth>().HasKey(t => new { t.EmployeeId, t.ClothId });
            modelBuilder.Entity<EmployeeCloth>().HasOne(ec => ec.Employee).WithMany(e => e.EmployeeCloths).HasForeignKey(ec => ec.EmployeeId);
            modelBuilder.Entity<EmployeeCloth>().HasOne(ec => ec.Cloth).WithMany(c => c.EmployeeCloths).HasForeignKey(ec => ec.ClothId);
        }

    }
}
