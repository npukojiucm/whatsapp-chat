import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Chat } from '@/types/types';

export interface ChatWindowProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  chat: Chat;
}
