using AutoMapper;
using AutoMapper.QueryableExtensions;
using EmployeeManager.Api.Dtos;
using EmployeeManager.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Api.Data.Repositories;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly EmployeeManagerContext _context;
    private readonly IMapper _mapper;

    public EmployeeRepository(EmployeeManagerContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<EmployeeDto>> GetAllAsync()
    {
        return await _context.Employees
            .AsNoTracking()
            .ProjectTo<EmployeeDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<List<EmployeeNameDto>> SearchByNameAsync(string name)
    {
        return await _context.Employees
            .AsNoTracking()
            .Where(e => e.FirstName.ToLower().Contains(name.ToLower()) || e.LastName.ToLower().Contains(name.ToLower()))
            .ProjectTo<EmployeeNameDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<EmployeeDto?> GetByIdAsync(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        return employee is null ? null : _mapper.Map<EmployeeDto>(employee);
    }

    public async Task<Employee> AddAsync(CreateEmployeeDto dto)
    {
        var employee = _mapper.Map<Employee>(dto);

        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return employee;
    }

    public async Task<bool> UpdateAsync(int id, UpdateEmployeeDto dto)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee is null)
            return false;

        _mapper.Map(dto, employee);

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee is null)
            return false;

        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();
        return true;
    }
}
