using ClothApi.Models;
using ClothApi.Models.Identity;
using ClothApi.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClothApi.Data
{
    public class DbInit
    {
        private DataContext _context;

        public DbInit(DataContext context)
        {
            _context = context;
        }

        public void Seed()
        {
            try
            {

                if (!_context.Divisions.Any())
                {
                    _context.Divisions.Add(new Division() { Title = "РЖД", ParentId = 0 });
                    _context.SaveChanges();

                    _context.Divisions.Add(new Division() {  Title = "Дирекция инфраструктуры", ParentId = 1 });
                    _context.Divisions.Add(new Division() {  Title = "Вагонное депо", ParentId = 2 });
                    _context.Divisions.Add(new Division() { Title = "Подразделение 2", ParentId = 1 });
                    _context.Divisions.Add(new Division() {Title = "Подразделение 3", ParentId = 1 });
                    _context.SaveChanges();
                }

                if (!_context.Cloth.Any()) 
                {
                    _context.Cloth.Add( new Cloth() {Title = "Костюм железнодорожник хб", Period = 12});
                    _context.Cloth.Add( new Cloth() {Title = "Сапоги Север", Period = 36});
                    _context.SaveChanges();
                }

                if(!_context.Professions.Any())
                {
                    _context.Professions.Add(new Profession() {
                        Title = "Осмотрщик", 
                        ProfessionCloth = new List<ProfessionCloth>() 
                        {
                            new ProfessionCloth() {ClothId = 1 },
                            new ProfessionCloth() {ClothId = 2}
                        } 
                    });
                    _context.SaveChanges();
                }

                if(!_context.Employees.Any())
                {
                    _context.Employees.Add(new Employee() 
                    {
                        FullName="Иванов Иван Иванович",
                        TabNumber=922121,
                        ProfessionId=1,
                        DivisionId=3,
                        ClothSize=52,
                        HeadSize=20,
                        LegSize=41,
                        Height=180,
                        EmployeeCloths = new List<EmployeeCloth>() {
                            new EmployeeCloth() {
                                ClothId=1,
                                BeginDate=new DateTime(2018,10,22),
                                EndDate=new DateTime(2019,10,22)
                            }
                        }
                    });
                    _context.Employees.Add(new Employee() 
                    {
                        FullName="Петров Петр Петрович",
                        TabNumber=922121,
                        ProfessionId=1,
                        DivisionId=3,
                        ClothSize=52,
                        HeadSize=20,
                        LegSize=41,
                        Height=180,
                        EmployeeCloths = new List<EmployeeCloth>() {
                            new EmployeeCloth() {
                                ClothId=2,
                                BeginDate=new DateTime(2018,06,15),
                                EndDate=new DateTime(2021,06,15)
                            }
                        }
                    });
                    _context.Employees.Add(new Employee() 
                    {
                        FullName="Сергеев Сергей Сергеевич",
                        TabNumber=922121,
                        ProfessionId=1,
                        DivisionId=4,
                        ClothSize=52,
                        HeadSize=20,
                        LegSize=41,
                        Height=180
                    });

                    _context.Employees.Add(new Employee() 
                    {
                        FullName="Степанов Степан Степанович",
                        TabNumber=922121,
                        ProfessionId=1,
                        DivisionId=4,
                        ClothSize=52,
                        HeadSize=20,
                        LegSize=41,
                        Height=180
                    });

                    _context.SaveChanges();
                }

            }
            catch (Exception)
            {


            }




        }

        public void InitUsersData()
        {
            try
            {
                var role = new IdentityRole() { Id=4, Role = "Администратор" };

                if (!_context.Roles.Any())
                {
                    _context.Roles.Add(new IdentityRole() { Id = 1, Role = "Только просмотр" });
                    _context.Roles.Add(new IdentityRole() { Id = 2, Role = "Кладовщик" });
                    _context.Roles.Add(new IdentityRole() { Id = 3, Role = "Отдел охраны труда" });
                    _context.Roles.Add(role);
                    _context.SaveChanges();
                }

                if (!_context.Users.Any())
                {
                    _context.Users.Add(new IdentityUser() { Login = "admin", PasswordHash = "password".GetHash(), UserName="Администратор", RoleId = 4});
                    _context.SaveChanges();
                }
            }
            catch (Exception)
            {

               
            }


        }
    }
}
