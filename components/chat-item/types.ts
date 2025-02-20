import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Chat } from '@/types/types';

export interface ChatItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}
