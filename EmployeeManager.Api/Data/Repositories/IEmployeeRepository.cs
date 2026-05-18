using EmployeeManager.Api.Dtos;
using EmployeeManager.Api.Models;

namespace EmployeeManager.Api.Data.Repositories;

public interface IEmployeeRepository
{
    Task<List<EmployeeDto>> GetAllAsync();
    Task<List<EmployeeNameDto>> SearchByNameAsync(string name);
    Task<EmployeeDto?> GetByIdAsync(int id);
    Task<Employee> AddAsync(CreateEmployeeDto dto);
    Task<bool> UpdateAsync(int id, UpdateEmployeeDto dto);
    Task<bool> DeleteAsync(int id);
}
