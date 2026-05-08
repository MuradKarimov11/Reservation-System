import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/timeline/borders/:year", (req, res) => {
  const year = Number(req.params.year);
  res.json({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          id: year < 1922 && year >= 1918 ? "azerbaijan-1918" : "sample-modern",
          name: year < 1922 && year >= 1918 ? "Azerbaijan" : "Modern State",
          government: year < 1922 && year >= 1918 ? "Azerbaijan Democratic Republic" : "Contemporary Republic",
          areaKm2: year < 1922 && year >= 1918 ? 120000 : 98000,
          population: year < 1922 && year >= 1918 ? 3200000 : 10000000,
          validFrom: year,
          validTo: year,
          geoJsonUrl: `/timeline/borders/${year}`
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[44, 40], [52, 40], [52, 37], [44, 37], [44, 40]]]
        }
      }
    ]
  });
});

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("room:join", (room: string) => socket.join(room));
  socket.on("chat:message", ({ room, text }: { room: string; text: string }) => {
    io.to(room).emit("chat:message", { user: `User-${socket.id.slice(0, 4)}`, text });
  });
});

const port = Number(process.env.PORT ?? 4000);
httpServer.listen(port, () => console.log(`ChronoSphere backend on ${port}`));
