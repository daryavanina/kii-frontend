//форма регистрации команды
import React, { useState, useEffect } from "react";

const TeamForm = ({ team, event, onAddTeam, onClose }) => {
  const [teamName, setTeamName] = useState(""); //название команды
  const [teamTelegram, setTeamTelegram] = useState(""); //телеграм капитана
  const [membersCount, setMembersCount] = useState(""); //количество участников

  useEffect(() => {
    //не до конца понимаю, что это делает, своровала с EventForm.js
    if (team) {
      setTeamName(team.teamName);
      setTeamTelegram(team.teamTelegram);
      setMembersCount(team.membersCountCount);
    }
  }, [team]);

  const handleSubmit = (e) => {
    //ргеистрация команды по клику
    e.preventDefault();
    const id = event.teams.length + 1;
    const newTeam = { id, teamName, teamTelegram, membersCount };
    onAddTeam(newTeam, event);
    setTeamName("");
    setTeamTelegram("");
    setMembersCount("");
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <button type="button" className="close-button" onClick={onClose}>
        Закрыть
      </button>
      <label>
        Название команды:
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
      </label>
      <label>
        Ник в TG:
        <input
          type="text"
          value={teamTelegram}
          onChange={(e) => setTeamTelegram(e.target.value)}
          required
        />
      </label>
      <label>
        Количество участников:
        <input
          type="radio"
          value="3"
          checked={membersCount === "3"}
          onChange={(e) => setMembersCount(e.target.value)}
        />{" "}
        3
        <input
          type="radio"
          value="4"
          checked={membersCount === "4"}
          onChange={(e) => setMembersCount(e.target.value)}
        />{" "}
        4
        <input
          type="radio"
          value="5"
          checked={membersCount === "5"}
          onChange={(e) => setMembersCount(e.target.value)}
        />{" "}
        5
        <input
          type="radio"
          value="6"
          checked={membersCount === "6"}
          onChange={(e) => setMembersCount(e.target.value)}
        />{" "}
        6
      </label>
      <button type="submit">{"Зарегистрировать"}</button>
    </form>
  );
};

export default TeamForm;
