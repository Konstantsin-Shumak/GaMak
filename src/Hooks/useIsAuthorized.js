import { isLogin } from "../Services/Login/isLogin"

export const useIsAuthorized = () => {
    return isLogin();
}