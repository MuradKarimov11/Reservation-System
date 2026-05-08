"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000", { autoConnect: false });

export function RealtimeChat() {
  const [room, setRoom] = useState("Ancient History");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Array<{ user: string; text: string }>>([]);

  useEffect(() => {
    socket.connect();
    socket.emit("room:join", room);
    socket.on("chat:message", (msg) => setMessages((prev) => [...prev, msg]));
    return () => {
      socket.off("chat:message");
      socket.disconnect();
    };
  }, [room]);

  return (
    <div className="glass rounded-2xl p-4">
      <h3 className="text-cyan-200">Realtime History Chat</h3>
      <div className="mt-2 h-40 overflow-auto text-sm">
        {messages.map((m, idx) => <p key={idx}><span className="text-purple-300">{m.user}:</span> {m.text}</p>)}
      </div>
      <div className="mt-2 flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 rounded bg-slate-900 p-2" />
        <button className="rounded bg-cyan-500 px-3" onClick={() => { socket.emit("chat:message", { room, text }); setText(""); }}>Send</button>
      </div>
    </div>
  );
}
