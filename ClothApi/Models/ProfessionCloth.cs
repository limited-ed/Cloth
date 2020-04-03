using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ClothApi.Models
{
    public class ProfessionCloth
    {
        public int ProfessionId { get; set; }
        [JsonIgnore]
        public Profession Profession { get; set; }

        public int ClothId { get; set; }

        public Cloth Cloth { get; set; }

    }
}
