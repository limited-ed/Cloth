using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ClothApi.Models
{
    public class EmployeeCloth
    {
        public int EmployeeId { get; set; }
        [JsonIgnore]
        public Employee Employee { get; set; }

        public int ClothId { get; set; }
        public Cloth Cloth { get; set; }

        public DateTime? BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}