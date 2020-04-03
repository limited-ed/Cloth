using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ClothApi.Models.Identity
{
    public class UserDivision
    {
        public int IdentityUserId { get; set; }
        [JsonIgnore]
        public IdentityUser IdentityUser { get; set; }

        public int DivisionId { get; set; }
        [JsonIgnore]
        public Division Division { get; set; }
    }
}
