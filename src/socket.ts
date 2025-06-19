import { Server, Socket } from "socket.io";

export const initSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("join", (roomId: string) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("send-message", (data) => {
      const { roomId, message } = data;
      socket.to(roomId).emit("receive-message", message);
    });

    socket.on("typing", ({ roomId, userId }) => {
      socket.to(roomId).emit("user-typing", { userId });
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });
};