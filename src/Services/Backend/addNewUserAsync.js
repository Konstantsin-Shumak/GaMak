import { localhost } from '../../localhost';
export const addNewUserAsync = (identifier, email, password) => {
    return fetch(`${localhost}/auth/local/register`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": identifier,
            "email": email,
            "password": password
        })
    })
        .catch(error => alert(error.message));
}