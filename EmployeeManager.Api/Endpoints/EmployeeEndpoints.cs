using EmployeeManager.Api.Dtos;
using EmployeeManager.Api.Services;

namespace EmployeeManager.Api.Endpoints;

public static class EmployeeEndpoints
{
    const string GetEmployeeEndpointName = "GetEmployee";

    public static void MapEmployeeEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/employees");

        // GET /employees
        group.MapGet("/", async (IEmployeeService service) =>
            await service.GetAllAsync()
        );

        // GET /employees/search?name=John
        group.MapGet("/search", async (string name, IEmployeeService service) =>
        {
            var employees = await service.SearchByNameAsync(name);

            return Results.Ok(employees);
        });

        // GET /employees/{id}
        group.MapGet("/{id}", async (int id, IEmployeeService service) =>
        {
            var employee = await service.GetByIdAsync(id);

            return employee is null
                ? Results.NotFound()
                : Results.Ok(employee);
        })
        .WithName(GetEmployeeEndpointName);

        // POST /employees
        group.MapPost("/", async (CreateEmployeeDto dto, IEmployeeService service) =>
        {
            var employee = await service.CreateAsync(dto);

            return Results.CreatedAtRoute(
                GetEmployeeEndpointName,
                new { id = employee.Id },
                employee
            );
        });

        // PUT /employees/{id}
        group.MapPut("/{id}", async (int id, UpdateEmployeeDto dto, IEmployeeService service) =>
        {
            var updated = await service.UpdateAsync(id, dto);

            return updated
                ? Results.NoContent()
                : Results.NotFound();
        });

        // DELETE /employees/{id}
        group.MapDelete("/{id}", async (int id, IEmployeeService service) =>
        {
            var deleted = await service.DeleteAsync(id);

            return deleted
                ? Results.NoContent()
                : Results.NotFound();
        });
    }
}
