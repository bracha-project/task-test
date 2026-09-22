using backend.Models;
using backend.Services;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    public ActionResult<List<TaskItem>> GetAll(CancellationToken cancellationToken)
    {
        var tasks = _taskService.GetAll(cancellationToken);
        var response = tasks.Select(task => new TaskResponse
        {
            Id = task.Id,
            Title = task.Title,
            IsCompleted = task.IsCompleted
        }).ToList();

        return Ok(response);
    }

    [HttpPatch("{id}")]
    public ActionResult<TaskResponse> Update(
        int id,
        UpdateTaskRequest request)
    {
        var task = _taskService.Update(id, request.IsCompleted);

        if (task is null)
        {
            return NotFound();
        }

        var response = new TaskResponse
        {
            Id = task.Id,
            Title = task.Title,
            IsCompleted = task.IsCompleted
        };

        return Ok(response);
    }

    [HttpPost]
    public ActionResult<TaskResponse> Create(CreateTaskRequest request)
    {

        var task = _taskService.Create(request.Title);

        var response = new TaskResponse
        {
            Id = task.Id,
            Title = task.Title,
            IsCompleted = task.IsCompleted
        };

        return Ok(response);
    }
}