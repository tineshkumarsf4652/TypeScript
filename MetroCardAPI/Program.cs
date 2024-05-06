var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
   
}
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseRouting();
app.UseCors(policy =>policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.MapGet("/", () => "Metro Card application");
app.Run();