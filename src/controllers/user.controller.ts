import { Request, Response } from "express";
import * as UserService from "../services/user.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const search = async (req: AuthRequest, res: Response) => {
  try {
    const query = req.query.q as string;
    const results = await UserService.searchUsers(query, req.userId!);
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const add = async (req: AuthRequest, res: Response) => {
  try {
    const { contactId } = req.body;
    const updated = await UserService.addContact(req.userId!, contactId);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyContacts = async (req: AuthRequest, res: Response) => {
  try {
    const contacts = await UserService.getContacts(req.userId!);
    res.json(contacts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
