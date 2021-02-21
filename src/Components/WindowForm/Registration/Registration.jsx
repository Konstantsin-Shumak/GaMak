import React, { useCallback, useState } from 'react';
import { addNewUserAsync } from '../../../Services/Backend/addNewUserAsync';
import { validateLogin } from '../../../Services/Validation/validateLogin';
import { validatePassword } from '../../../Services/Validation/validatePassword';
import { validateEmail } from '../../../Services/Validation/validateEmail';
import { ValidInput } from '../../ValidInput/ValidInput';

export const Registration = (props) => {

    const [login, setLogin] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [copyPassword, setСopyPassword] = useState();
    const [loginError, setLoginErrors] = useState();
    const [emailError, setEmailErrors] = useState();
    const [passwordError, setPasswordErrors] = useState();

    const { onClose } = props;

    const onValidChanged = useCallback((isValid, fieldName, errorSetter) => {
        if (isValid === true) {
            errorSetter(undefined);
        } else {
            errorSetter(`${fieldName} введен неверно`);
        }
    }, []);

    const AddNewUser = useCallback(() => {
        if (login === null || loginError === null ||
            email === null || emailError === null ||
            password === null || passwordError === null ||
            copyPassword == null) {
            return;
        }
        if (copyPassword === password) {
            addNewUserAsync(login, email, password)
                .then(onClose)
                .then(setPasswordErrors());
        } else {
            setPasswordErrors("Пароли не совпадают!");
        }
    }, [login, loginError, email, emailError, password, passwordError, copyPassword, onClose])

    return (
        <form className="form">
            <span className='form__error'>{loginError}</span>
            <ValidInput
                type="text"
                placeholder="Имя пользователя"
                validate={validateLogin}
                onChanged={setLogin}
                onValidChanged={isValid => onValidChanged(isValid, "Имя пользователя", setLoginErrors)}
            /> <br />

            <span className='form__error'>{emailError}</span>
            <ValidInput
                type="e-mail"
                placeholder="E-mail"
                validate={validateEmail}
                onChanged={setEmail}
                onValidChanged={isValid => onValidChanged(isValid, "E-mail", setEmailErrors)}
            /> <br />

            <span className='form__error'>{passwordError}</span>
            <ValidInput
                type="password"
                placeholder="Пароль"
                validate={validatePassword}
                onChanged={setPassword}
                onValidChanged={isValid => onValidChanged(isValid, "Пароль", setPasswordErrors)}
            /> <br />

            <ValidInput
                type="password"
                placeholder="Повторите пароль"
                validate={validatePassword}
                onChanged={setСopyPassword}
            /> <br />
            <input className="form__button" type="button" value="Регистрация" onClick={() => AddNewUser()} />
        </form>
    );
}