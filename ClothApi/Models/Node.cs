using System.Collections.Generic;
using ClothApi.Models;

namespace ClothApi.Models
{
    public class Node
    {
        public List<Node> Nodes { get; set; }
        public List<Employee> Data { get; set; }
        public Division Division { get; set; }
    }
}

