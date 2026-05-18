using AutoMapper;
using EmployeeManager.Api.Dtos;
using EmployeeManager.Api.Models;

namespace EmployeeManager.Api.Mapping;

public class EmployeeMappingProfile : Profile
{
    public EmployeeMappingProfile()
    {
        CreateMap<Employee, EmployeeDto>();

        CreateMap<Employee, EmployeeNameDto>();

        CreateMap<CreateEmployeeDto, Employee>()
            .ConstructUsing(dto => Employee.Create(
                dto.FirstName,
                dto.LastName,
                dto.JobTitle,
                dto.Phone,
                dto.Email
            ));

        CreateMap<UpdateEmployeeDto, Employee>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
    }
}
