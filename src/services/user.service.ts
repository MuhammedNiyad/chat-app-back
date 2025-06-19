import prisma from "../lib/prisma";

export const searchUsers = async (query: string, excludeId: string) => {
  return prisma.user.findMany({
    where: {
      AND: [
        {
          OR: [
            { username: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        },
        { id: { not: excludeId } },
      ],
    },
    select: {
      id: true,
      username: true,
      email: true,
      profilePic: true,
    },
  });
};

export const addContact = async (userId: string, contactId: string) => {
  return prisma.userContact.create({
    data: {
      userId,
      contactId,
    },
  });
};

export const getContacts = async (userId: string) => {
  const contacts = await prisma.userContact.findMany({
    where: { userId },
    include: {
      contact: {
        select: {
          id: true,
          username: true,
          email: true,
          profilePic: true,
        },
      },
    },
  });

  return contacts.map((c) => c.contact);
};