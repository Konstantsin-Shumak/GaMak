import {
    fetchLoginAsync
} from "../Backend/fetchLoginAsync"
import {
    JwtForUserStorageKey
} from "./JwtForUserStorageKey";
import {
    logout
} from "./logout";
import {
    UserId
} from "./UserId";

export const loginAsync = (username, password, remember) => {
    return fetchLoginAsync(username, password)
        .then(response => response.json())
        .then(json => {
            if (remember) {
                localStorage.setItem(JwtForUserStorageKey, json.jwt);
                localStorage.setItem(UserId, json.user.id)
            } else {
                sessionStorage.setItem(JwtForUserStorageKey, json.jwt);
                sessionStorage.setItem(UserId, json.user.id)
            }
        })
        .catch(_ => {
            alert("Неверный логин или пароль");
            logout();
        });
}
