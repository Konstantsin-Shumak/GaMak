import {
    JwtForUserStorageKey
} from "./JwtForUserStorageKey"
import {
    UserId
} from "./UserId";

export const logout = () => {
    localStorage.removeItem(JwtForUserStorageKey);
    localStorage.removeItem(UserId);
    sessionStorage.removeItem(JwtForUserStorageKey);
    sessionStorage.removeItem(UserId);
}