using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ClothApi.Models
{
    public class Cloth
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Period { get; set; }
        
        [JsonIgnore]
        public ICollection<ProfessionCloth> ProfessionCloth { get; set; }
        [JsonIgnore]
        public ICollection<EmployeeCloth> EmployeeCloths { get; set; }
    }
}
