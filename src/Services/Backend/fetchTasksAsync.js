import { localhost } from '../../localhost';
export const fetchTasksAsync = async (userId) => {
    return fetch(`${localhost}/tasks?user.id=${userId}`)
        .then(response => response.json());
}