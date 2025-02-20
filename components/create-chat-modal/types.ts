import { DetailedHTMLProps, HTMLAttributes, Dispatch, SetStateAction } from 'react';
import { Chat } from '@/types/types';

export interface CreateChatModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  onCreate: Dispatch<SetStateAction<Chat[]>>;
}
