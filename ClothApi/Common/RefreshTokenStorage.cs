using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ClothApi.Common
{
    public class RefreshTokenStorage
    {
        public IDictionary<string, ClaimsIdentity> Tokens { get; private set; }

        public RefreshTokenStorage()
        {
            Tokens = new Dictionary<string, ClaimsIdentity>();
        }
    }
}
