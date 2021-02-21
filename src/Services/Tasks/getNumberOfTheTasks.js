import {
    allTasksField,
    plannedTasksField,
    notAsignedTasksField,
    historyTasksField
} from '../Tasks/itemsFilterFields';
export const getNumberOfTheTasks = (tasks, filterField) => {
    var count = 0;
    tasks.forEach(task => {
        switch (filterField) {
            case allTasksField:
                if (task.parent === null && !task.done) {
                    count++;
                }
                break;
            case plannedTasksField:
                if (task.parent === null && task.deadline !== null && !task.done) {
                    count++;
                }
                break;
            case notAsignedTasksField:
                if (task.parent === null && task.deadline === null && !task.done) {
                    count++;
                }
                break;
            case historyTasksField:
                if (task.parent === null && task.done) {
                    count++;
                }
                break;
            default:
                count = 0;
        }
    })
    return count;
}