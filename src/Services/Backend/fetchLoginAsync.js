import { localhost } from '../../localhost';
export const fetchLoginAsync = (identifier, password) => {
    return fetch(`${localhost}/auth/local`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            identifier,
            password
        })
    })
}