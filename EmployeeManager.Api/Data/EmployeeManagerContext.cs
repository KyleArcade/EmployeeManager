using EmployeeManager.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Api.Data;

public class EmployeeManagerContext(DbContextOptions<EmployeeManagerContext> options)
    : DbContext(options)
{
    public DbSet<Employee> Employees => Set<Employee>();
}