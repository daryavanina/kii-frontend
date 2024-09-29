import React, { useState, useEffect } from "react";
import api from "./api.js";

const AuthForm = ({ setUserStatus }) => {
    const [users, setUsers] = useState([
        {
            login: "1",
            password: "1",
            isAdmin: true,
        },
        {
            login: "2",
            password: "2",
            isAdmin: false,
        },
    ]); // массив пользователей

    const [isLoggedIn, setIsLoggedIn] = useState(false); // залогинен или нет
    const [currentUser, setCurrentUser] = useState(null); // текущий пользователь

    // Функция для получения данных о пользователях с бэкенда
    const fetchUsers = async () => {
        try {
            const response = await api.get("/get_users");
            setUsers(response.data);
        } catch (error) {
            console.error("Ошибка при получении данных о пользователях:", error);
        }
    };

    // Вызываем функцию для получения данных при монтировании компонента
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        const login = event.target.elements.login.value;
        const password = event.target.elements.password.value;

        const user = users.find(
            (user) => user.login === login && user.password === password
        );

        if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
            user.isAdmin ? setUserStatus("admin") : setUserStatus("user");
            alert("Вы вошли в аккаунт");
        } else {
            alert("Нет такого пользователя");
        }
    };

    return (
        <div className="auth-container">
            {!isLoggedIn ? (
                <form className="auth-form" onSubmit={handleLogin}>
                    <label>
                        Логин:
                        <input type="text" name="login" />
                    </label>
                    <label>
                        Пароль:
                        <input type="password" name="password" />
                    </label>
                    <button type="submit">Войти</button>
                </form>
            ) : (
                <div className="auth-status">
                    <p>Вы вошли в аккаунт как {currentUser.login}</p>
                    {currentUser.isAdmin && <p>Вы админ</p>}
                    <button
                        onClick={() => {
                            setUserStatus("notLoggedIn");
                            setIsLoggedIn(false);
                        }}
                    >
                        Выйти
                    </button>
                </div>
            )}
        </div>
    );
};

export default AuthForm;
