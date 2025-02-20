import { JSX } from 'react';
import { ChatItemProps } from '@/components/chat-item/types';
import styles from './index.module.scss';

export const ChatItem = ({ chat, isActive, onClick }: ChatItemProps): JSX.Element => {
  return (
    <div className={`${styles['chat-item']} ${isActive ? styles.active : ''}`} onClick={onClick}>
      <span className={styles['chat-name']}>{chat.chatId}</span>
    </div>
  );
};
