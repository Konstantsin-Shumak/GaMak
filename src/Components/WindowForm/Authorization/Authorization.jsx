import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HomeRoute } from '../../../Routes';
import { ValidInput } from '../../ValidInput/ValidInput';
import { validateLogin } from '../../../Services/Validation/validateLogin';
import { validatePassword } from '../../../Services/Validation/validatePassword';
import { loginAsync } from '../../../Services/Login/loginAsync';

export const Authorization = (props) => {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [loginError, setLoginErrors] = useState();
    const [passwordError, setPasswordErrors] = useState();
    const [rememberMe, setRememberMe] = useState(false);

    const history = useHistory();

    const { onClose } = props;

    const onValidChanged = useCallback((isValid, fieldName, errorSetter) => {
        if (isValid === true) {
            errorSetter(undefined);
        } else {
            errorSetter(`${fieldName} введен неверно`);
        }
    }, []);

    const onLogin = useCallback(() => {

        if (loginError || passwordError || login === undefined || password === undefined) {
            return;
        }

        loginAsync(login, password, rememberMe)
            .then(() => history.replace(HomeRoute))
            .then(onClose)
    }, [login, loginError, password, passwordError, history, rememberMe, onClose]);

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

            <span className='form__error'>{passwordError}</span>
            <ValidInput
                type="password"
                placeholder="Пароль"
                validate={validatePassword}
                onChanged={setPassword}
                onValidChanged={isValid => onValidChanged(isValid, "Пароль", setPasswordErrors)}
            /> <br />

            <div className="form__checkbox_remember">
                <input type="checkbox" onChange={(event) => setRememberMe(event.target.checked)} />
                <label>Запомнить меня</label>
            </div>
            <a className="form__forgot_password" href="/*">Забыли пароль?</a>

            <input className="form__button" type="button" value="Войти" onClick={onLogin} />
        </form>
    );
}
