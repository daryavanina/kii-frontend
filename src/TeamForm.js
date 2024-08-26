// форма регистрации команды
import React, { useState, useEffect } from "react";

const TeamForm = ({ team, event, onAddTeam, onClose }) => {
    const [teamName, setTeamName] = useState(""); // название команды
    const [teamTelegram, setTeamTelegram] = useState(""); // телеграм капитана
    const [membersCount, setMembersCount] = useState(""); // количество участников

    useEffect(() => {
        // Если передана команда, заполняем поля
        if (team) {
            setTeamName(team.teamName);
            setTeamTelegram(team.teamTelegram);
            setMembersCount(team.membersCount);
        }
    }, [team]);

    const handleSubmit = (e) => {
        // регистрация команды по клику
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
            <div className="close-button-container">
                <button type="button" className="close-button" onClick={onClose}>
                    Закрыть
                </button>
            </div>
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
                <div className="radio-group">
                    <label className="radio-option">
                        <input
                            type="radio"
                            value="3"
                            checked={membersCount === "3"}
                            onChange={(e) => setMembersCount(e.target.value)}
                        />
                        <span>3</span>
                    </label>
                    <label className="radio-option">
                        <input
                            type="radio"
                            value="4"
                            checked={membersCount === "4"}
                            onChange={(e) => setMembersCount(e.target.value)}
                        />
                        <span>4</span>
                    </label>
                    <label className="radio-option">
                        <input
                            type="radio"
                            value="5"
                            checked={membersCount === "5"}
                            onChange={(e) => setMembersCount(e.target.value)}
                        />
                        <span>5</span>
                    </label>
                    <label className="radio-option">
                        <input
                            type="radio"
                            value="6"
                            checked={membersCount === "6"}
                            onChange={(e) => setMembersCount(e.target.value)}
                        />
                        <span>6</span>
                    </label>
                </div>
            </label>
            <button type="submit">{"Зарегистрировать"}</button>
        </form>
    );
};

export default TeamForm;
