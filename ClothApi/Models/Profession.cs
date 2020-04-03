using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ClothApi.Models
{
    public class Profession
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public ICollection<ProfessionCloth> ProfessionCloth { get; set; }
    }
}