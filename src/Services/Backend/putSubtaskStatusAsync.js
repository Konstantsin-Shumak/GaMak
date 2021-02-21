import { localhost } from '../../localhost';
export const putSubtaskStatusAsync = (subtaskId, done) => {
    return fetch(`${localhost}/subtasks/${subtaskId}`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "done": done,
        })
    }).then(response => response.json());
}