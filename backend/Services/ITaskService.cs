using backend.Models;

namespace backend.Services;

public interface ITaskService
{
    List<TaskItem> GetAll(CancellationToken cancellationToken);
    TaskItem? Update(int id, bool isCompleted);
    TaskItem Create(string title);
}