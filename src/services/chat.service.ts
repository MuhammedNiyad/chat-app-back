import prisma from "../lib/prisma";

// 1. Find or create room with two users
export const getOrCreateRoom = async (userA: string, userB: string) => {
  let room = await prisma.chatRoom.findFirst({
    where: {
      users: { hasEvery: [userA, userB] },
    },
  });

  if (!room) {
    room = await prisma.chatRoom.create({
      data: { users: [userA, userB] },
    });
  }

  return room;
};

// 2. Send a message
export const sendMessage = async ({
  roomId,
  senderId,
  receiverId,
  text,
  mediaUrl,
  mediaType,
}: {
  roomId: string;
  senderId: string;
  receiverId: string;
  text?: string;
  mediaUrl?: string;
  mediaType?: string;
}) => {
  return prisma.message.create({
    data: {
      roomId,
      senderId,
      receiverId,
      text,
      mediaUrl,
      mediaType,
    },
  });
};

// 3. Get messages in a room
export const getMessages = async (roomId: string) => {
  return prisma.message.findMany({
    where: { roomId },
    orderBy: { createdAt: "asc" },
  });
};


export const createGroup = async ({
  name,
  userIds,
  avatarUrl,
}: {
  name: string;
  userIds: string[];
  avatarUrl?: string;
}) => {
  return prisma.chatRoom.create({
    data: {
      name,
      users: userIds,
      isGroup: true,
      avatarUrl,
    },
  });
};

export const getUserRooms = async (userId: string) => {
  return prisma.chatRoom.findMany({
    where: {
      users: { has: userId },
    },
    orderBy: { createdAt: "desc" },
  });
};