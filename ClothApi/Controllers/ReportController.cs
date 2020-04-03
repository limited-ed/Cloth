using Microsoft.AspNetCore.Mvc;
using ClothApi.Data;
using System.IO;
using System.Collections.Generic;
using System;
using Microsoft.EntityFrameworkCore;
using ClothApi.Models;
using System.Linq;
using Rotativa.AspNetCore;
using FastReport.Utils;
using FastReport;
using FastReport.Export.PdfSimple;

namespace ClothApi.Controllers
{
    public class ReportController : Controller
    {
        private DataContext _context;
        private List<Node> _tree;

        public ReportController(DataContext context)
        {
            _context=context;
        }

        // GET: api/Cloth
        public IActionResult One()
        {
            var data = _context.Employees.Include(i => i.Division).Include( i => i.EmployeeCloths).ThenInclude( i => i.Cloth).ToList();
            _tree = new List<Node>();
            BuildTree(data, _tree, 0);
            return new ViewAsPdf(_tree);
        }

        public IActionResult Second()
        {
            string thisFolder = Config.ApplicationFolder;
            Report report = new Report();
            report.Load(Path.Combine(thisFolder, ".\\..\\..\\..\\Reports\\Text.frx"));
            report.Prepare();

            PDFSimpleExport pdfExport = new PDFSimpleExport();

            pdfExport.Export(report, "text.pdf");


            return Ok();
        }

        public IActionResult Third()
        {
            var data = _context.Employees.Include(i => i.Division).Include( i => i.EmployeeCloths).ThenInclude( i => i.Cloth).ToList();
            var list = new List<Node>();
            BuildList(list,0);
            
            return new ViewAsPdf(list);
        }

        private void BuildList( List<Node> list, int parent)
        {
            var divs = _context.Divisions.Where( w => w.ParentId == parent ).ToList();
            if (divs.Count == 0) return;

            foreach( var d in divs)
            {
                var items = _context.Employees.Where( w=>w.DivisionId == d.Id).Include( i => i.EmployeeCloths).ThenInclude( i => i.Cloth).ToList();
                var node = new Node() { Division = d, Data = items}; 
                list.Add(node);
                BuildList(list, d.Id);
            }
        }


        private void BuildTree( List<Employee> employees, List<Node> nodes, int parent)
        {   
            var divs = _context.Divisions.Where( w => w.ParentId == parent ).ToList();
            if (divs.Count == 0) return;

            foreach( var d in divs)
            {
                var items = employees.Where( w=>w.DivisionId == d.Id).ToList();
                var node = new Node() { Division = d, Data = items, Nodes = new List<Node>()}; 
                nodes.Add(node);
                BuildTree(employees, node.Nodes, d.Id);
            }
        }


    }
}
