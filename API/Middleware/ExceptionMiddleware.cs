using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
      
        private readonly IHostEnvironment _env;
        private readonly  ILogger<ExceptionMiddleware> _logger ;
        
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _logger = logger;
            _env = env;
            _next = next;
            
        }

        public async Task InvokeAsync(HttpContext context)
        {
           try
           {
                await _next(context);
           }
           catch (Exception exception)
           {
               
               _logger.LogError(exception, exception.Message);
               context.Response.ContentType = "application/json";
               context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

               var response = _env.IsDevelopment()
                ? new ApiException(context.Response.StatusCode, exception.Message, exception.StackTrace?.ToString())
                : new ApiException(context.Response.StatusCode, "Internal Server Error");

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var jsonResponse = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(jsonResponse);
           }
        }
    }
}