using backend.Configuration;
using Microsoft.Extensions.Options;

namespace backend.Services;

public class AuthService
{
    private readonly AuthenticationSettings _settings;

    public AuthService(
        IOptions<AuthenticationSettings> options)
    {
        _settings = options.Value;
    }

    public bool ValidateCredentials(
        string username,
        string password,
        CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        return username == _settings.Username
               && password == _settings.Password;
    }
}
