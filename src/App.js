import React, { useState, useEffect } from "react";
import EventList from "./EventList";
import EventForm from "./EventForm";
import AuthForm from "./AuthForm.js";
import api from "./api.js";

const App = () => {
    const [events, setEvents] = useState([]); //Массив мероприятий
    const [showForm, setShowForm] = useState(false); //отображается ли форма добавления мероприятия
    const [selectedEvent, setSelectedEvent] = useState(null); //выбранное мероприятие
    const [editingEvent, setEditingEvent] = useState(null); //редактируемое мероприятие
    const [showTeams, setShowTeams] = useState(null); //id мероприятия для отображения команд
    const [userStatus, setUserStatus] = useState("notLoggedIn"); //"логин", не залогинен, юзер или админ
    const [showRegForm, setShowRegForm] = useState(false); //отображается ли форма добавления команды
    const [showLogForm, setShowLogForm] = useState(false); //отображается ли форма регистрации

    // Функция для получения данных о мероприятиях с бэкенда
    const fetchEvents = async () => {
        try {
            const response = await api.get("/get_events");
            setEvents(response.data);
        } catch (error) {
            console.error("Ошибка при получении данных о мероприятиях:", error);
        }
    };

    // Вызываем функцию для получения данных при монтировании компонента
    useEffect(() => {
        fetchEvents();
    }, []);

    //добавление мероприятия в массив (скрывает форму добавления)
    const addEvent = async (event) => {
        try {
            const response = await api.post("/add_event", {
                name: event.name,
                date: event.date,
                description: event.description,
                teamCount: event.teamCount
            });
            setEvents([event, ...events]);
            setShowForm(false);
        } catch (error) {
            console.error("Ошибка при добавлении мероприятия:", error);
        }
    };

    //обновление мероприятия
    const updateEvent = (updatedEvent) => {
        setEvents(
            events.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event
            )
        );
        setSelectedEvent(updatedEvent);
        setEditingEvent(null);
    };

    //удаление мероприятие
    const deleteEvent = async (eventId) => {
        try {
            await api.delete(`/delete_event/${eventID}`);
            setEvents(events.filter((event) => event.id !== eventId));
            setSelectedEvent(null);
            setEditingEvent(null);
            setShowTeams(null);
        } catch (error) {
            console.error("Ошибка при удалении мероприятия", error);
        }
    };

    //устанавливает выбранное мероприятие для отображения деталей
    const viewEventDetails = (event) => {
        setSelectedEvent(event);
        setShowTeams(null);
    };

    //устанавливает мероприятие для редактирования (и отображает детали?)
    const editEvent = (event) => {
        setEditingEvent(event);
        setSelectedEvent(event);
    };

    //скрывает детали и форму редактирования
    const closeDetails = () => {
        setSelectedEvent(null);
        setEditingEvent(null);
        setShowTeams(null);
    };

    //переключает отображение команд для мероприятия (открывает/закрывает)
    const toggleTeams = (eventId) => {
        setShowTeams(showTeams === eventId ? null : eventId);
    };

    //отображает форму для регистрации (тут логика немного другая, чем выше, пушто писала сама)
    const showRegistrationForm = (event) => {
        if (userStatus !== "notLoggedIn") {
            // Если пользователь является обычным пользователем, показываем форму регистрации
            setSelectedEvent(event);
            setShowRegForm(true);
        } else {
            // Если пользователь не авторизован, показываем предупреждение о необходимости входа в аккаунт
            alert("Для регистрации команды необходимо войти в аккаунт.");
        }
    };

    //закрывает форму регистрации
    const closeRegForm = () => {
        setShowRegForm(false);
    };

    //добавление команды в массив мероприятия
    const addTeam = async (newTeam, event) => {
        try {
            const response = await api.post(`/event/${event.id}/add_team`, {
                teamName: newTeam.teamName,
                teamTelegram: newTeam.teamTelegram,
                membersCount: newTeam.membersCount
            });
            alert("команда успешно добавлена");
            event.teams.push(response.data); // Добавляем новую команду в массив teams выбранного мероприятия
            setEvents([...events]); // Обновляем список мероприятий
            setShowRegForm(false); // Закрываем форму регистрации
        } catch (error) {
            console.error("Ошибка при добавлении команды:", error);
        }
    };

    //удаление команды (не до конца понимаю, как это работает, но тут суть в том, что обновить надо events, а изменился пропс teams)
    const deleteTeam = async (teamId, eventId) => {
        try {
            await api.delete(`/event/${eventId}/delete_team/${teamId}`);
            setEvents((events) =>
                events.map((event) =>
                    event.id === eventId
                        ? {
                            ...event,
                            teams: event.teams.filter((team) => team.id !== teamId),
                        }
                        : event
                )
            );
        } catch (error) {
            console.error("Ошибка при удалении команды:", error);
        }
    };

    return (
        <div className="App">
            <div className="header">
                <h1 className="title">Клуб Интеллектуальных Игр</h1>
            </div>

            {userStatus === "admin" && (
                <div className="add-button-container">
                    <button className="add-button" onClick={() => setShowForm(true)}>
                        +
                    </button>
                </div>
            )}

            <div className="auth-section">
                {!showLogForm && (
                    <button onClick={() => setShowLogForm(true)}>Войти</button>
                )}
                {showLogForm && <AuthForm setUserStatus={setUserStatus} />}
            </div>

            <div className="event-container">
                <div className="event-form">
                    {showForm && (
                        <EventForm
                            events={events}
                            onAddEvent={addEvent}
                            onClose={() => setShowForm(false)}
                        />
                    )}
                </div>
                <div className="event-list">
                    <EventList
                        events={events}
                        onViewDetails={viewEventDetails}
                        selectedEvent={selectedEvent}
                        onEditEvent={editEvent}
                        onDeleteEvent={deleteEvent}
                        onCloseDetails={closeDetails}
                        editingEvent={editingEvent}
                        onUpdateEvent={updateEvent}
                        showTeams={showTeams}
                        onToggleTeams={toggleTeams}
                        showRegistrationForm={showRegistrationForm}
                        showRegForm={showRegForm}
                        onCloseRegForm={closeRegForm}
                        onAddTeam={addTeam}
                        onDeleteTeam={deleteTeam}
                        userStatus={userStatus}
                    />
                </div>
            </div>
        </div>
    );


};

export default App;
