using EmployeeManager.Api.Models;

namespace EmployeeManager.Api.Data;

public static class EmployeeSeedData
{
    public static IEnumerable<Employee> Seed()
    {
        return new List<Employee>
        {
            Employee.Create("David", "Jones", "Developer", "07789543768", "djones@test.com"),
            Employee.Create("Lisa", "Holmes", "Development Lead", "07756896512", "lholmes@test.com"),            
            Employee.Create("Alex", "Smith", "QA Lead", "07723743289", "asmith@test.com"),
            Employee.Create("Kieran", "James", "Developer", "07898654123", "kjames@test.com"),
            Employee.Create("Gavin", "Miles", "UX Designer", "07881987554", "gmiles@test.com"),
            Employee.Create("Kathy", "Smith", "UX Lead", "07765332287", "ksmith@test.com"),
            Employee.Create("Phil", "Walker", "Senior QA", "07889984447", "pwalker@test.com"),
            Employee.Create("Rebecca", "Bates", "Product Development Manager", "07798548733", "rbates@test.com"),
            Employee.Create("Hayley", "Walker-Smith", "Developer", "07888932145", "hwalker@test.com"),
            Employee.Create("Alexis", "Crawley", "DevOps Engineer", "07778667412", "acrawley@test.com"),
            Employee.Create("David", "Gold", "DevOps Engineer", "07768479563", "dgold@test.com"),
            Employee.Create("Phillipa", "Walker", "QA Lead", "07775357951", "pwalker2@test.com")
        };
    }
}