import React from "react";
import EventForm from "./EventForm";
import TeamForm from "./TeamForm";
import editIcon from "./edit.png"; // Иконка редактирования
import deleteIcon from "./delete.png"; // Иконка удаления
import closeIcon from "./close.png"; // Иконка закрытия

const EventList = ({
  events,
  onViewDetails,
  selectedEvent,
  onEditEvent,
  onDeleteEvent,
  onCloseDetails,
  editingEvent,
  onUpdateEvent,
  showTeams,
  onToggleTeams,
  showRegistrationForm,
  showRegForm,
  onCloseRegForm,
  onAddTeam,
  onDeleteTeam,
  isAdmin,
}) => {
  //удаление команды по клику
  const handleDeleteTeam = (teamId, eventId) => {
    onDeleteTeam(teamId, eventId);
  };

  return (
    <div>
      {events.map(
        (
          event,
          index //вывод отдельно каждого мероприятия из массива
        ) => (
          <div key={index} className="event-item">
            {showRegForm &&
              selectedEvent === event.id && ( //форма регистрации команды
                <TeamForm
                  team={event.teams}
                  event={event}
                  onAddTeam={onAddTeam}
                  onClose={onCloseRegForm}
                />
              )}
            <div onClick={() => onViewDetails(event)}>
              {" "}
              {/*отображение деталей*/}
              <h3>{event.name}</h3>
              <p>{event.date}</p>
            </div>
            {isAdmin === "admin" &&
              !showRegForm && ( //значки редактирования и удаления (для админа && убираются, если открыта рег.форма)
                <div className="event-actions">
                  <img
                    src={editIcon}
                    alt="Edit"
                    onClick={() => onEditEvent(event)}
                  />
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    onClick={() => onDeleteEvent(event.id)}
                  />
                </div>
              )}
            {!showRegForm && ( //рег. форма
              <button onClick={() => showRegistrationForm(event.id)}>
                Регистрация
              </button>
            )}
            {(selectedEvent && selectedEvent.id === event.id) ||
            (editingEvent && editingEvent.id === event.id) ? ( //редактирование мероприятия
              <div className="event-details">
                {editingEvent && editingEvent.id === event.id ? (
                  <>
                    <h2>Редактирование</h2>
                    <EventForm
                      events={events}
                      event={editingEvent}
                      onAddEvent={onUpdateEvent}
                      onClose={onCloseDetails}
                      isEditing
                    />
                  </>
                ) : (
                  //получается, если мероприятие выбрано, но не редактируется, то показываются детали
                  <>
                    <p>Описание: {selectedEvent.description}</p>
                    <p>
                      {selectedEvent.teams.length}/{selectedEvent.teamCount}{" "}
                      мест занято
                    </p>
                    <button onClick={() => onToggleTeams(event.id)}>
                      Список команд
                    </button>
                    {/*кнопка закрыть (детали) */}
                    <img
                      src={closeIcon}
                      alt="Close"
                      className="close"
                      onClick={onDeleteEvent}
                    />

                    {showTeams === event.id && ( //id мероприятия=выбранному мероприятию -> отображение списка команд
                      <div className="teams-list">
                        <h3>Зарегистрированные команды:</h3>
                        <table>
                          <thead>
                            <tr>
                              <th>Название команды</th>
                              <th>TG</th>
                              <th>Количество человек</th>
                            </tr>
                          </thead>
                          <tbody>
                            {event.teams.map((team, index) => (
                              <tr key={team.id}>
                                <td>
                                  {index + 1}. {team.teamName}
                                </td>
                                <td>@{team.teamTelegram}</td>
                                <td>{team.membersCount}</td>
                                {isAdmin === "admin" && ( //кнопка удалить (команду) для админа
                                  <td>
                                    <img
                                      src={deleteIcon}
                                      alt="Delete"
                                      className="delete-team"
                                      onClick={() =>
                                        handleDeleteTeam(team.id, event.id)
                                      }
                                    />
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : null}
          </div>
        )
      )}
    </div>
  );
};

export default EventList;
