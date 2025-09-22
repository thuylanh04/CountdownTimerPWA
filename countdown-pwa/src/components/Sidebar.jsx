import { useEffect, useState } from "react";

function CountdownMini({ event }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(event.datetime) - new Date();
      if (diff <= 0) {
        setTimeLeft("Đã tới!");
        clearInterval(timer);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        setTimeLeft(`${d}d ${h}h`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [event.datetime]);

  return <span>{timeLeft}</span>;
}

export default function Sidebar({ events, onSelect, onDelete }) {
  return (
    <div className="sidebar">
      <h3>Sự kiện</h3>
      <ul>
        {events.map((ev) => (
          <li key={ev.id} className="event-item">
            <span
              onClick={() => onSelect(ev)}
              className="event-title"
            >
              {ev.title} <CountdownMini event={ev} />
            </span>
            <button
              onClick={() => onDelete(ev.id)}
              className="delete-btn"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

