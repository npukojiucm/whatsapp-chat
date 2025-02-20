'use client';

import { ChatList } from '@/components/chat-list';
import styles from './page.module.scss';
import { JSX, useState } from 'react';
import { ChatWindow } from '@/components/chat-window';
import { Chat } from '@/types/types';

export default function Home(): JSX.Element {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <div className={styles.mainContainer}>
      <ChatList selectedChat={selectedChat} setSelectedChatAction={setSelectedChat} />

      <div className={styles.chatWindow}>
        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : (
          <p className={styles.noChatSelected}>Выберите чат</p>
        )}
      </div>
    </div>
  );
}
