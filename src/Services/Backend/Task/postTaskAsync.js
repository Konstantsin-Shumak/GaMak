import { getUserId } from "../../Login/getUserId";
import { localhost } from '../../../localhost';

export const postTaskAsync = (taskTitle, deadline, parent) => {
    return fetch(`${localhost}/tasks`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "title": taskTitle,
            "deadline": deadline,
            "user": getUserId(),
            "done": false,
            "parent": parent
        })
    }).then(response => response.json());
}