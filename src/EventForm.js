//форма добавления мероприятия
import React, { useState, useEffect } from "react";

const EventForm = ({
  events,
  event,
  onAddEvent,
  onClose,
  isEditing = false,
}) => {
  const [name, setName] = useState(""); //название мероприятия
  const [date, setDate] = useState(""); //дата
  const [description, setDescription] = useState(""); //описание
  const [teamCount, setTeamCount] = useState(""); //количество команд
  const [teams, setTeams] = useState([]); //массив мероприятий (вроде только в одном месте используется)

  useEffect(() => {
    //Если event существует (редактируется), устанавливает значения полей формы
    if (event) {
      setName(event.name);
      setDate(event.date);
      setDescription(event.description);
      setTeamCount(event.teamCount);
      setTeams(event.teams);
    }
  }, [event]);

  //console.log(events.length);
  const handleSubmit = (e) => {
    //добавляет мероприятие по клику
    e.preventDefault();
    const id = events.length + 1;
    const newEvent = {
      id: event ? event.id : id, //редактируется ? существующий id, новый
      name,
      date,
      description,
      teamCount,
      teams,
    };
    onAddEvent(newEvent);
    setName("");
    setDate("");
    setDescription("");
    setTeamCount("");
    setTeams([]);
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <button type="button" className="close-button" onClick={onClose}>
        Закрыть
      </button>
      <label>
        Название:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Дата:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Количество команд:
        <input
          type="number"
          value={teamCount}
          onChange={(e) => setTeamCount(e.target.value)}
          required
        />
      </label>
      <label>
        Описание:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <button type="submit">{isEditing ? "Сохранить" : "Добавить"}</button>
    </form>
  );
};

export default EventForm;
