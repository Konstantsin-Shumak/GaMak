import {
    allTasksField,
    plannedTasksField,
    notAsignedTasksField,
    historyTasksField
} from '../../Services/Tasks/itemsFilterFields';

export const sortTasks = (tasks, index) => {
    var result = {};
    var children = {};
    switch (index) {
        case allTasksField:
            tasks.forEach(task => {
                if (task.parent) {
                    if (children[task.parent.id] === undefined) {
                        children[task.parent.id] = [];
                    }
                    children[task.parent.id].push(task);
                }
            });
            tasks.forEach(task => {
                if (!task.parent && !task.done) {
                    result[task.id] = task;
                    if (children[task.id] === undefined) {
                        result[task.id].subtasks = [];
                    }
                    else {
                        if (result[task.id].subtasks === undefined) {
                            result[task.id].subtasks = [];
                        }
                        result[task.id].subtasks = children[task.id];
                    }
                }
            });
            break;
        case plannedTasksField:
            tasks.forEach(task => {
                if (task.parent) {
                    if (children[task.parent.id] === undefined) {
                        children[task.parent.id] = [];
                    }
                    children[task.parent.id].push(task);
                }
            });
            tasks.forEach(task => {
                if (!task.parent && task.deadline && !task.done) {
                    result[task.id] = task;
                    if (children[task.id] === undefined) {
                        result[task.id].subtasks = [];
                    }
                    else {
                        if (result[task.id].subtasks === undefined) {
                            result[task.id].subtasks = [];
                        }
                        result[task.id].subtasks = children[task.id];
                    }
                }
            });
            break;
        case notAsignedTasksField:
            tasks.forEach(task => {
                if (task.parent) {
                    if (children[task.parent.id] === undefined) {
                        children[task.parent.id] = [];
                    }
                    children[task.parent.id].push(task);
                }
            });
            tasks.forEach(task => {
                if (!task.parent && !task.deadline && !task.done) {
                    result[task.id] = task;
                    if (children[task.id] === undefined) {
                        result[task.id].subtasks = [];
                    }
                    else {
                        if (result[task.id].subtasks === undefined) {
                            result[task.id].subtasks = [];
                        }
                        result[task.id].subtasks = children[task.id];
                    }
                }
            });
            break;
        case historyTasksField:
            tasks.forEach(task => {
                if (task.parent) {
                    if (children[task.parent.id] === undefined) {
                        children[task.parent.id] = [];
                    }
                    children[task.parent.id].push(task);
                }
            });
            tasks.forEach(task => {
                if (!task.parent && task.done) {
                    result[task.id] = task;
                    if (children[task.id] === undefined) {
                        result[task.id].subtasks = [];
                    }
                    else {
                        if (result[task.id].subtasks === undefined) {
                            result[task.id].subtasks = [];
                        }
                        result[task.id].subtasks = children[task.id];
                    }
                }
            });
            break;
        default:
            result = {};
    }
    return result = Object.values(result);
}