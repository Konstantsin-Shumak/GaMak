export const getTaskSubtasksNumber = (task) => {
    if (task.subtasks.length > 0) { 
        var count = 0;
        task.subtasks.forEach(subtask => {
            if (subtask.done)
                count = count + 1;
        })
        return `${count} из ${task.subtasks.length}`;
    }
}