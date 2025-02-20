import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Chat } from '@/types/types';

export interface ChatListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  selectedChat: Chat | null;
  // eslint-disable-next-line no-unused-vars
  setSelectedChatAction: (selectedChat: Chat | null) => void;
}
