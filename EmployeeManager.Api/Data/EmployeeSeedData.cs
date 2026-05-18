using EmployeeManager.Api.Models;

namespace EmployeeManager.Api.Data;

public static class EmployeeSeedData
{
    public static IEnumerable<Employee> Seed()
    {
        return new List<Employee>
        {
            Employee.Create("David", "Jones", "Developer", 7789543768, "djones@test.com"),
            Employee.Create("Lisa", "Holmes", "Development Lead", 7756896512, "lholmes@test.com"),            
            Employee.Create("Alex", "Smith", "QA Lead", 7723743289, "asmith@test.com"),
            Employee.Create("Kieran", "James", "Developer", 7898654123, "kjames@test.com"),
            Employee.Create("Gavin", "Miles", "UX Designer", 7881987554, "gmiles@test.com"),
            Employee.Create("Kathy", "Smith", "UX Lead", 7765332287, "ksmith@test.com"),
            Employee.Create("Phil", "Walker", "Senior QA", 7889984447, "pwalker@test.com"),
            Employee.Create("Rebecca", "Bates", "Product Development Manager", 7798548733, "rbates@test.com"),
            Employee.Create("Hayley", "Walker-Smith", "Developer", 7888932145, "hwalker@test.com"),
            Employee.Create("Alexis", "Crawley", "DevOps Engineer", 7778667412, "acrawley@test.com"),
            Employee.Create("David", "Gold", "DevOps Engineer", 7768479563, "dgold@test.com"),
            Employee.Create("Phillipa", "Walker", "QA Lead", 7775357951, "pwalker2@test.com")
        };
    }
}