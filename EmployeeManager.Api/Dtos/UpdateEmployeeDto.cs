using System.ComponentModel.DataAnnotations;

namespace EmployeeManager.Api.Dtos;

public record class UpdateEmployeeDto(
    [Required][StringLength(50, MinimumLength = 2)] string FirstName,
    [Required][StringLength(50, MinimumLength = 2)] string LastName,
    [Required][StringLength(30, MinimumLength = 3)] string JobTitle,
    [Required][StringLength(20, MinimumLength = 10)] string Phone,
    [Required][EmailAddress] string Email
);