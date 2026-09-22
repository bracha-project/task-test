interface DailyGoalProps {
    completedTasks: number;
    dailyGoal: number;
}

function DailyGoal({
    completedTasks,
    dailyGoal,
}: DailyGoalProps) {
    const progress = Math.min(
        (completedTasks / dailyGoal) * 100,
        100
    );

    return (
        <div className="daily-goal">
            <div className="daily-goal-header">
                <span>Daily Goal</span>

                <span>
                    {completedTasks} / {dailyGoal}
                </span>
            </div>

            <div className="progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

export default DailyGoal;