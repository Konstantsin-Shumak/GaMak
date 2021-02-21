import {
    UserId
} from "./UserId";

export const getUserId = () => {
    if (localStorage.getItem(UserId) === null) {
        return sessionStorage.getItem(UserId);
    } else {
        return localStorage.getItem(UserId);
    }
}