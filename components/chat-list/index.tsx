'use client';

import { JSX, useState } from 'react';
import styles from './index.module.scss';
import { CreateChatModal } from '@/components/create-chat-modal';
import { chats } from '@/public/data/chats';
import { Chat } from '@/types/types';
import { ChatItem } from '@/components/chat-item';
import { ChatListProps } from '@/components/chat-list/types';

export const ChatList = ({ selectedChat, setSelectedChatAction }: ChatListProps): JSX.Element => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>(chats);

  const handleCreateChat = (): void => {
    setModalOpen(true);
  };

  const handleSelectChat = (chat: Chat): void => {
    setSelectedChatAction(chat);
  };

  return (
    <div className={styles['chat-list']}>
      <div className={styles['chat-list__header']}>
        <span>Чаты</span>
        <button
          className={styles['add-chat-btn']}
          title="Создать новый чат"
          onClick={handleCreateChat}
        >
          +
        </button>
      </div>

      <div className={styles['chat-items']}>
        {chatList.map((chat: Chat) => (
          <ChatItem
            key={chat.chatId}
            chat={chat}
            isActive={selectedChat?.chatId === chat.chatId}
            onClick={() => handleSelectChat(chat)}
          />
        ))}
      </div>

      <CreateChatModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={setChatList}
      />
    </div>
  );
};
