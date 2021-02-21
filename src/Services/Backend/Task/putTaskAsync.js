import { localhost } from '../../../localhost';
export const putTaskAsync = (taskId, taskTitle, status, deadline) => {
    return fetch(`${localhost}/tasks/${taskId}`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "title": taskTitle,
            "done": status,
            "deadline": deadline,
        })
    }).then(response => response.json());
}