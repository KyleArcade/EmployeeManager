using EmployeeManager.Api.Data;
using EmployeeManager.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();
builder.AddDatabase();
builder.AddRepositories();
builder.AddAutoMapper();

var app = builder.Build();

app.MapEmployeeEndpoints();

app.MigrateDb();

app.Run();
