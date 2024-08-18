import React, { useState } from "react";
import EventList from "./EventList";
import EventForm from "./EventForm";

const App = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Примерное мероприятие",
      date: "2023-01-01",
      description:
        "Это чтобы проверить, как у пользователя будет отображаться рега на меро, а то бека нет(((",
      teamCount: 0,
      teams: [
        {
          id: 1,
          teamName: "Команда 1",
          teamTelegram: "team1",
          membersCount: 1,
        },
        {
          id: 2,
          teamName: "Команда 2",
          teamTelegram: "team2",
          membersCount: 2,
        },
        {
          id: 3,
          teamName: "Команда 3",
          teamTelegram: "team3",
          membersCount: 3,
        },
      ],
    },
  ]); //Массив мероприятий
  const [showForm, setShowForm] = useState(false); //отображается ли форма добавления мероприятия
  const [selectedEvent, setSelectedEvent] = useState(null); //выбранное мероприятие
  const [editingEvent, setEditingEvent] = useState(null); //редактируемое мероприятие
  const [showTeams, setShowTeams] = useState(null); //id мероприятия для отображения команд
  const [isAdmin, setIsAdmin] = useState("notLoggedIn"); //"логин", не залогинен, юзер или админ
  const [showRegForm, setShowRegForm] = useState(false); //отображается ли форма добавления команды

  //добавление мероприятия в массив (скрывает форму добавления)
  const addEvent = (event) => {
    setEvents([event, ...events]);
    setShowForm(false);
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
  const deleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setSelectedEvent(null);
    setEditingEvent(null);
    setShowTeams(null);
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
    if (isAdmin !== "notLoggedIn") {
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
  const addTeam = (newTeam, event) => {
    alert("команда успешно добавлена");
    event.teams.push(newTeam); // Добавляем новую команду в массив teams выбранного мероприятия
    setEvents([...events]); // Обновляем список мероприятий
    setShowRegForm(false); // Закрываем форму регистрации
  };

  //удаление команды (не до конца понимаю, как это работает, но тут суть в том, что обновить надо events, а изменился пропс teams)
  const deleteTeam = (teamId, eventId) => {
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
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">Мероприятия</h1>
        {isAdmin === "admin" && (
          <button className="add-button" onClick={() => setShowForm(true)}>
            +
          </button>
        )}
        <p>
          извините, вы админ?
          <button onClick={() => setIsAdmin("admin")}>да</button>
          <button onClick={() => setIsAdmin("user")}>no</button>
        </p>
        {isAdmin === "notLoggedIn" && <p>Чичас вы никто...</p>}
      </div>
      <div className="event-container">
        {isAdmin === "admin" && ( //проверка, если вы начали добавлять меро, а потом перестали быть админом (дурак)
          <div className="event-form">
            {showForm && (
              <EventForm
                onAddEvent={addEvent}
                onClose={() => setShowForm(false)}
              />
            )}
          </div>
        )}
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
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
