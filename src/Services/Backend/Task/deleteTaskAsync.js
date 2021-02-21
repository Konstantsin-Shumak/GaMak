import { localhost } from '../../../localhost';
export const deleteTaskAsync = (taskId) => {
    return fetch(`${localhost}/tasks/${taskId}`, {
        method: "delete",
    }).then(response => response.json());
}