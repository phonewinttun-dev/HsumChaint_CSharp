namespace HsumChaint.Domain.Features.Auth.DTOs;

/// <summary>
/// Data transfer object for user authentication.
/// Supports login via a unified identifier (email address or phone number),
/// or explicitly via dedicated email or phone number fields.
/// </summary>
public class LoginRequestDto
{
    /// <summary>
    /// Gets or sets the unified login identifier (email address or phone number).
    /// </summary>
    public string? Identifier { get; set; }

    /// <summary>
    /// Gets or sets the user's email address.
    /// </summary>
    public string? Email { get; set; }

    /// <summary>
    /// Gets or sets the user's phone number (retained for backward compatibility).
    /// </summary>
    public string? PhoneNumber { get; set; }

    /// <summary>
    /// Gets or sets the user's plain-text password.
    /// </summary>
    public string? Password { get; set; }
}
