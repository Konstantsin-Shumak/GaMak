import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HomeRoute } from '../../Routes';
import { logout } from '../../Services/Login/logout';
import logo from '../../Assets/Images/logo.png';
import AuthorizationImage from '../../Assets/Images/authorization.svg';
import RegistrationImage from '../../Assets/Images/registration.svg';
import { MainMenu } from '../MainMenu/MainMenu';
import { WindowForm } from '../WindowForm/WindowForm';
import { Authorization } from '../WindowForm/Authorization/Authorization';
import { Registration } from '../WindowForm/Registration/Registration';
import './Header.css';

export const Header = () => {
    const [showPopupForm, setShowPopupForm] = useState(false);
    const [formToWindowsForm, setFormToWindowsForm] = useState(false);
    const history = useHistory();

    //0 -Авторизация
    //1 - Регистрация
    const preparationForm = useCallback((index) => {
        switch (index) {
            case 0: {
                setFormToWindowsForm({
                    image: AuthorizationImage,
                    title: "Авторизация",
                    component: < Authorization
                        onClose={() => setShowPopupForm(false)} />
                });
                setShowPopupForm(true);
                break;
            }
            case 1: {
                setFormToWindowsForm({
                    image: RegistrationImage,
                    title: "Регистрация",
                    component: < Registration
                        onClose={() => setShowPopupForm(false)} />
                });
                setShowPopupForm(true);
                break;
            }
            default:
                alert("Непредвиденная ошибка, повторите попытку или обратитесь к администратору сайта!");
        }
    }, []);

    const onLogout = useCallback(() => {
        logout();
        history.replace(HomeRoute);
    }, [history]);

    return (
        <>
            <header>
                <a className="header__logo" href={HomeRoute}>
                    <img className="header__logo__img" src={logo} alt="Logo" />
                </a>
                <MainMenu
                    whatFormOpen={(index) => preparationForm(index)}
                    checkExit={() => onLogout()}
                />
            </header>
            {showPopupForm &&
                < WindowForm
                    formInfo={formToWindowsForm}
                    onClose={() => setShowPopupForm(false)} />
            }
        </>
    )
}