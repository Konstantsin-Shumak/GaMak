export const validateLogin = (login) => {
    const pattern = /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i;
    const isValid = pattern.test(login);
    return isValid;
}