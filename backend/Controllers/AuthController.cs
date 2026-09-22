using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public ActionResult<LoginResponse> Login(LoginRequest request,
    CancellationToken cancellationToken)
    {
        var isValid = _authService.ValidateCredentials(
            request.Username,
            request.Password,
            cancellationToken);

        if (!isValid)
        {
            return Unauthorized();
        }

        var response = new LoginResponse
        {
            Username = request.Username,
            Token = "dummy-token"
        };

        return Ok(response);
    }
}