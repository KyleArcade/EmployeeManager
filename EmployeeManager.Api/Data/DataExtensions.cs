using EmployeeManager.Api.Data.Repositories;
using EmployeeManager.Api.Mapping;
using EmployeeManager.Api.Models;
using EmployeeManager.Api.Services;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Api.Data;

public static class DataExtensions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<EmployeeManagerContext>();
        dbContext.Database.Migrate();
    }

    public static void AddDatabase(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("EmployeeManager");
        builder.Services.AddSqlite<EmployeeManagerContext>(
            connectionString,
            optionsAction: options => options.UseSeeding((context, _) =>
            {
                if (!context.Set<Employee>().Any())
                {
                    context.Set<Employee>().AddRange(EmployeeSeedData.Seed());
                    context.SaveChanges();
                }
            })
        );
    }

    public static void AddRepositories(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
        builder.Services.AddScoped<IEmployeeService, EmployeeService>();
    }

    public static void AddAutoMapper(this WebApplicationBuilder builder)
    {
        builder.Services.AddAutoMapper(typeof(EmployeeMappingProfile));
    }

    public static void AddCors(this WebApplicationBuilder builder, string allowSpecificOrigins)
    {
        builder.Services.AddCors(options =>
        {
             options.AddPolicy(name: allowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
        });
    }
}