using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ClothApi.Common;
using ClothApi.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using System.Security.Claims;
using Rotativa.AspNetCore;

namespace ClothApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddJsonOptions(options => {
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
            });

            var key = Encoding.UTF8.GetBytes("401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1");



            services.AddAuthentication(x => {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o => {
                    o.Events = new JwtBearerEvents() {
                        OnTokenValidated = context =>
                        {
                            var claims = new List<Claim>();


                            return Task.CompletedTask;
                        }                        
                    };
                    o.RequireHttpsMetadata = false;
                    o.SaveToken = true;
                    o.TokenValidationParameters = new TokenValidationParameters()
                      {
                        ValidIssuer = "ClothWebAPI",
                        ValidAudience = "ClothWebAPIAudience",
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                      };
                });
                
            services.AddAuthorization( options => {
                options.AddPolicy("ViewOnly", policy => policy.RequireAuthenticatedUser());
                options.AddPolicy("Storekeeper", policy => policy.RequireClaim ("Storekeeper","true"));
                options.AddPolicy("Safety", policy => policy.RequireClaim("Safety","true"));
                options.AddPolicy("Admin", policy => policy.RequireClaim("Admin","true"));
            });


            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
              builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
            }));


            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
              builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
            }));

            var connection = Configuration.GetSection("Data:ConnectionString").Value;
            var connectionfb = Configuration.GetSection("Data:ConnectionStringFB").Value;


            services.AddEntityFrameworkSqlite().AddDbContext<DataContext>(options => options.UseSqlite(connection));
            services.AddTransient<DbInit>();
            services.AddSingleton<RefreshTokenStorage>();

            services.AddControllersWithViews();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DbInit dbInit)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            dbInit.Seed();
            dbInit.InitUsersData();
            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());


        //    app.UseAuthentication();
            app.UseAuthorization();


            app.Use(async (context, next) => {
                await next();
            });


            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

            });

            RotativaConfiguration.Setup("c:\\wkhtmltox\\bin","");

        }
    }
}