using EmployeeManager.Api.Dtos;
using EmployeeManager.Api.Models;

namespace EmployeeManager.Api.Services;

public interface IEmployeeService
{
    Task<List<EmployeeDto>> GetAllAsync();
    Task<List<EmployeeNameDto>> SearchByNameAsync(string name);
    Task<EmployeeDto?> GetByIdAsync(int id);
    Task<Employee> CreateAsync(CreateEmployeeDto dto);
    Task<bool> UpdateAsync(int id, UpdateEmployeeDto dto);
    Task<bool> DeleteAsync(int id);
}
