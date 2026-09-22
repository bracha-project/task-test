using backend.Models;

namespace backend.Services;

public class TaskService : ITaskService
{
    private readonly List<TaskItem> _tasks = new()
    {
        new TaskItem
        {
            Id = 1,
            Title = "Review API error handling",
            IsCompleted = false
        },
        new TaskItem
        {
            Id = 2,
            Title = "Add responsive mobile layout",
            IsCompleted = true
        },
        new TaskItem
        {
            Id = 3,
            Title = "Write project documentation",
            IsCompleted = false
        }
    };

    public List<TaskItem> GetAll(CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        return _tasks;
    }

    public TaskItem? Update(int id, bool isCompleted)
    {
        var task = _tasks.FirstOrDefault(task => task.Id == id);

        if (task is null)
        {
            return null;
        }

        task.IsCompleted = isCompleted;

        return task;
    }
    public TaskItem Create(string title)
    {
        var nextId = _tasks.Max(task => task.Id) + 1;

        var task = new TaskItem
        {
            Id = nextId,
            Title = title,
            IsCompleted = false
        };

        _tasks.Add(task);

        return task;
    }
}