

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ClothApi.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public int TabNumber { get; set; }
        public int ProfessionId { get; set; }
        [JsonIgnore]
        public Profession Profession { get; set; }
        public int DivisionId { get; set; }
        [JsonIgnore]
        public Division Division { get; set; }

        public int Height { get; set; }
        public int HeadSize { get; set; }
        public int ClothSize { get; set; }
        public int LegSize { get; set; }

        public List<EmployeeCloth> EmployeeCloths { get; set; }
    }
}