using ClothApi.Models.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClothApi.Models
{
    public class Division
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int ParentId { get; set; }

        public virtual ICollection<UserDivision> UserDivisions { get; set; }

    }
}
