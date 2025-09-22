import { useState } from "react";

export default function AddEventForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    datetime: "",
    location: "",
    dressCode: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      title: "",
      datetime: "",
      location: "",
      dressCode: "",
      description: "",
    });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Tên sự kiện"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="datetime"
        value={form.datetime}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Địa điểm"
        value={form.location}
        onChange={handleChange}
      />
      <input
        name="dressCode"
        placeholder="Dress code"
        value={form.dressCode}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Mô tả sự kiện"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">➕ Thêm sự kiện</button>
    </form>
  );
}
