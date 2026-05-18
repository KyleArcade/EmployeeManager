namespace EmployeeManager.Api.Dtos;

public record class EmployeeDto(
    int Id,
    string FirstName,
    string LastName,
    string JobTitle,
    string Phone,
    string Email
);