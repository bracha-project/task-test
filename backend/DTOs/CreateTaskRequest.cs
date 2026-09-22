using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class CreateTaskRequest
{
    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;
}