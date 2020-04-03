using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ClothApi.Models.Identity
{
    public class IdentityUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Login { get; set; }
        public string PasswordHash { get; set; }
        public int RoleId { get; set; }
    
        public ICollection<UserDivision> UserDivisions { get; set; }
  }
}
