using System.Diagnostics.CodeAnalysis;

namespace EmployeeManager.Api.Models;

public class Employee
{
    /// <summary>
    /// Constructor.
    /// </summary>
    /// <param name="firstName">The employee's first name.</param>
    /// <param name="lastName">The employee's last name.</param>
    /// <param name="jobTitle">The employee's job title.</param>
    /// <param name="phone">The employee's phone number.</param>
    /// <param name="email">The employee's email address.</param>
    [SetsRequiredMembers]
    private Employee(string firstName, string lastName,
        string jobTitle, string phone, string email)
    {
        FirstName = firstName;
        LastName = lastName;
        JobTitle = jobTitle;
        Phone = phone;
        Email = email;
    }

    /// <summary>
    /// Method to create a new employee.
    /// </summary>
    /// <param name="firstName">The employee's first name.</param>
    /// <param name="lastName">The employee's last name.</param>
    /// <param name="jobTitle">The employee's job title.</param>
    /// <param name="phone">The employee's phone number.</param>
    /// <param name="email">The employee's email address.</param>
    public static Employee Create(string firstName, string lastName,
        string jobTitle, string phone, string email)
    {
        return new Employee(firstName, lastName, jobTitle, phone, email);
    }

    /// <summary>
    /// Method to update an existing employee.
    /// </summary>
    /// <param name="firstName">The employee's first name.</param>
    /// <param name="lastName">The employee's last name.</param>
    /// <param name="jobTitle">The employee's job title.</param>
    /// <param name="phone">The employee's phone number.</param>
    /// <param name="email">The employee's email address.</param>
    public void Update(string firstName, string lastName,
        string jobTitle, string phone, string email)
    {
        FirstName = firstName;
        LastName = lastName;
        JobTitle = jobTitle;
        Phone = phone;
        Email = email;
    }
    
    public int Id { get; set; }

    /// <summary>
    /// The employee's first name. 
    /// Required. Must be between 2 and 50 characters long.
    /// </summary>
    public required string FirstName { get; set; }

    /// <summary>
    /// The employee's last name.
    /// Required. Must be between 2 and 50 characters long.
    /// </summary>
    public required string LastName { get; set; }

    /// <summary>
    /// The employee's job title.
    /// Required.
    /// </summary>
    public required string JobTitle { get; set; }

    /// <summary>
    /// The employee's phone number.
    /// Optional.
    /// </summary>
    public string Phone { get; set; }

    /// <summary>
    /// The employee's email address.
    /// Required.
    /// </summary>
    public required string Email { get; set; }
}