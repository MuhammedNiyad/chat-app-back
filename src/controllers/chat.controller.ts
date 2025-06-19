import { Request, Response } from "express";
import * as ChatService from "../services/chat.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const getOrCreate = async (req: AuthRequest, res: Response) => {
  const { partnerId } = req.body;
  const room = await ChatService.getOrCreateRoom(req.userId!, partnerId);
  res.json(room);
};

export const postMessage = async (req: AuthRequest, res: Response) => {
  const message = await ChatService.sendMessage({
    ...req.body,
    senderId: req.userId!,
  });
  res.json(message);
};

export const fetchMessages = async (req: AuthRequest, res: Response) => {
  const { roomId } = req.params;
  const messages = await ChatService.getMessages(roomId);
  res.json(messages);
};

export const createGroup = async (req: AuthRequest, res: Response) => {
  try {
    const { name, userIds, avatarUrl } = req.body;
    const group = await ChatService.createGroup({
      name,
      userIds: [...new Set([req.userId!, ...userIds])],
      avatarUrl,
    });
    res.json(group);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const myRooms = async (req: AuthRequest, res: Response) => {
  const rooms = await ChatService.getUserRooms(req.userId!);
  res.json(rooms);
};