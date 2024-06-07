import { RowDataPacket } from 'mysql2';

export interface Link extends RowDataPacket {
  id: number;
  userId?: number;
  url: string;
  shortUrl: string;
  description?: string;
  clicks: number;
  lastClick?: Date;
  createdAt: Date;
  updatedAt: Date;
}