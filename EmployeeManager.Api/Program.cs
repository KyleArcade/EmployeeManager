using EmployeeManager.Api.Data;
using EmployeeManager.Api.Endpoints;

string allowSpecificOrigins = "allowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
builder.AddCors(allowSpecificOrigins);
builder.Services.AddValidation();
builder.AddDatabase();
builder.AddRepositories();
builder.AddAutoMapper();

var app = builder.Build();

app.UseCors(allowSpecificOrigins);
app.MapEmployeeEndpoints();

app.MigrateDb();

app.Run();
