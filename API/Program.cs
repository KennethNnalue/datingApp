using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            // Build our application and save into a host
           var host =  CreateHostBuilder(args).Build();
           using var scope = host.Services.CreateScope();
           var services = scope.ServiceProvider;

           // We don't have acess to our global error handling here
           // hence we are using try catch blocks

           try
           {
               var context = services.GetRequiredService<DataContext>();

               // Update our database with the latest migration
               await context.Database.MigrateAsync();

               // save our test data into the database
               await Seed.SeedUsers(context);

           }
           catch (Exception exception)
           {
               
              var logger = services.GetRequiredService<ILogger<Program>>();
              logger.LogError(exception, "An error occurred during migration");
           }
            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
