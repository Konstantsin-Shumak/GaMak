import React, { useCallback, useEffect, useState } from 'react';
import { HomeRoute, TasksRoute } from '../../Routes';
import exitImg from '../../Assets/Images/exit.svg';
import { useIsAuthorized } from '../../Hooks/useIsAuthorized';
import './MainMenu.css';

export const MainMenu = (props) => {

    const [navigatorStatus, setNavigatorStatus] = useState("");
    const [burgerClassName, setBurgerClassName] = useState("burger");
    const [labelForMainMenu, setLabelForMainMenu] = useState();
    const [isLogin, setIsLogin] = useState();

    const isAuthorized = useIsAuthorized();

    const onOpenOrCloseMenu = useCallback(() => {
        switch (navigatorStatus) {
            case "":
                setNavigatorStatus("open");
                setBurgerClassName("burger close");
                break;
            case "open":
                setNavigatorStatus("");
                setBurgerClassName("burger");
                break;
            default:
                alert("Непредвиденная ошибка. Обновите страницу!");
                break;
        }

    }, [navigatorStatus]);

    useEffect(() => {
        if (isAuthorized) {
            setIsLogin(true);
            setLabelForMainMenu("Меню");
        } else {
            setIsLogin(false);
            setLabelForMainMenu("Вход");
        }
    }, [isAuthorized]);

    return (
        <nav className={`navigator ${navigatorStatus}`}>
            <strong className="navigator__header">{labelForMainMenu}</strong>
            <ul className="main_menu">
                {isLogin ?
                    <>
                        <li className="main_menu__li">
                            <a className="main_menu__li__link_title" href={HomeRoute}>Главная</a>
                        </li>
                        <li className="main_menu__li">
                            <a className="main_menu__li__link_title" href={TasksRoute}>Задачи</a>
                        </li>
                        <div className="main_menu__exit">
                            <img className="main_menu__exit__img" src={exitImg} alt="exit" />
                            <button className="main_menu__exit__button" onClick={() => {
                                props.checkExit();
                                setIsLogin(false);
                                setNavigatorStatus("");
                            }}>Выход</button>
                        </div>
                    </> :
                    <>
                        <li className="main_menu__li">
                            <button className="main_menu__li__button"
                                onClick={() => {
                                    setNavigatorStatus("");
                                    props.whatFormOpen(0)
                                }}>
                                Авторизация
                            </button>
                        </li>
                        <li className="main_menu__li">
                            <button className="main_menu__li__button"
                                onClick={() => {
                                    setNavigatorStatus("");
                                    props.whatFormOpen(1)
                                }}>
                                Регистрация
                            </button>
                        </li>
                    </>
                }

            </ul>
            <button className={burgerClassName} onClick={() => onOpenOrCloseMenu()}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </button>
        </nav>
    );
}
