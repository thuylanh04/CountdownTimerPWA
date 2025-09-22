import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import EventDetail from "./components/EventDetail";
import AddEventForm from "./components/AddEventForm";
import Popup from "./components/Popup";

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null); // sự kiện đang sửa

  // 🔹 Load dữ liệu từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  // 🔹 Lưu dữ liệu
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // 🔹 Thêm sự kiện
  const addEvent = (newEvent) => {
    if (editingEvent) {
      // Nếu đang sửa
      const updated = events.map((e) =>
        e.id === editingEvent.id ? { ...e, ...newEvent } : e
      );
      setEvents(updated);
      setEditingEvent(null);
    } else {
      // Nếu thêm mới
      setEvents([...events, { id: Date.now(), shown: false, ...newEvent }]);
    }
  };

  // 🔹 Xóa sự kiện
  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    if (selectedEvent?.id === id) setSelectedEvent(null);
  };

  // 🔹 Chỉnh sửa sự kiện
  const editEvent = (event) => {
    setEditingEvent(event);
    setSelectedEvent(event);
  };

  // 🔹 Khi sự kiện kết thúc
  const handleEventEnd = (event) => {
    if (!event.shown) {
      setShowPopup(true);
      setSelectedEvent(event);

      const updated = events.map((e) =>
        e.id === event.id ? { ...e, shown: true } : e
      );
      setEvents(updated);
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        events={events}
        onSelect={setSelectedEvent}
        onDelete={deleteEvent}
        onEdit={editEvent}
      />

      <div className="main-content">
        <AddEventForm onAdd={addEvent} editingEvent={editingEvent} />

        {selectedEvent ? (
          <EventDetail event={selectedEvent} onEnd={handleEventEnd} />
        ) : (
          <p>Hãy chọn hoặc thêm một sự kiện để bắt đầu đếm ngược.</p>
        )}
      </div>

      {showPopup && selectedEvent && (
        <Popup
          message={`Sự kiện "${selectedEvent.title}" đã đến lúc bắt đầu!`}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default App;
