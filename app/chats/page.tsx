'use client';

import { JSX, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChatList } from '@/components/chat-list';
import styles from './page.module.scss';
import { ChatWindow } from '@/components/chat-window';
import { Chat } from '@/types/types';

export default function ChatsPage(): JSX.Element {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const router = useRouter();

  useEffect(() => {
    const idInstance = localStorage.getItem('idInstance');
    const apiTokenInstance = localStorage.getItem('apiTokenInstance');

    if (!idInstance || !apiTokenInstance) {
      router.push('/');
    }
  }, []);

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
