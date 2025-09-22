import { useEffect, useState } from "react";

export default function EventDetail({ event, onEnd }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [isLate, setIsLate] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(event.datetime) - new Date();

      if (diff > 0) {
        setIsLate(false); // còn thời gian
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      } else {
        setIsLate(true); // đã trễ
        const late = Math.abs(diff);
        setTimeLeft({
          d: Math.floor(late / (1000 * 60 * 60 * 24)),
          h: Math.floor((late / (1000 * 60 * 60)) % 24),
          m: Math.floor((late / 1000 / 60) % 60),
          s: Math.floor((late / 1000) % 60),
        });

        // chỉ gọi onEnd 1 lần
        if (!event.shown) {
          onEnd(event);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [event, onEnd]);

  return (
    <div className="event-detail">
      <h2>{event.title}</h2>
      <div className="countdown">
        {isLate ? "⏰ Đã qua:" : "⌛ Còn lại:"}{" "}
        {timeLeft.d} ngày {timeLeft.h} giờ {timeLeft.m} phút {timeLeft.s} giây
      </div>
      <p>📍 {event.location}</p>
      <p>👔 Dress code: {event.dressCode}</p>
      <p>📝 {event.description}</p>
    </div>
  );
}
