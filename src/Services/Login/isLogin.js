import {
    JwtForUserStorageKey
} from "./JwtForUserStorageKey";

export const isLogin = () => {
    if (localStorage.getItem(JwtForUserStorageKey) === null) {
        return sessionStorage.getItem(JwtForUserStorageKey) !== null;
    } else {
        return localStorage.getItem(JwtForUserStorageKey) !== null;
    }
}