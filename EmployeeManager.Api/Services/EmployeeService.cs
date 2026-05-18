using EmployeeManager.Api.Data.Repositories;
using EmployeeManager.Api.Dtos;
using EmployeeManager.Api.Models;

namespace EmployeeManager.Api.Services;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository employeeRepository;

    public EmployeeService(IEmployeeRepository employeeRepository)
    {
        this.employeeRepository = employeeRepository;
    }

    public Task<List<EmployeeDto>> GetAllAsync()
        => employeeRepository.GetAllAsync();

    public Task<List<EmployeeNameDto>> SearchByNameAsync(string name)
        => employeeRepository.SearchByNameAsync(name);

    public Task<EmployeeDto?> GetByIdAsync(int id)
        => employeeRepository.GetByIdAsync(id);

    public Task<Employee> CreateAsync(CreateEmployeeDto dto)
        => employeeRepository.AddAsync(dto);

    public Task<bool> UpdateAsync(int id, UpdateEmployeeDto dto)
        => employeeRepository.UpdateAsync(id, dto);

    public Task<bool> DeleteAsync(int id)
        => employeeRepository.DeleteAsync(id);
}
