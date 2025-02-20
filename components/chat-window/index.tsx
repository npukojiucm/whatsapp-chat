import React, { JSX, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { ChatWindowProps } from '@/components/chat-window/types';
import { Messages, ReqSendMessage } from '@/types/types';
import { deleteNotification, getApiUrl, receiveNotification } from '@/utils/utils';

export const ChatWindow = ({ chat }: ChatWindowProps): JSX.Element => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const idInstance = localStorage.getItem('idInstance') as string;
  const apiTokenInstance = localStorage.getItem('apiTokenInstance') as string;

  useEffect(() => {
    let isFetching = false;

    const fetchNotifications = async (): Promise<void> => {
      if (isFetching) return;
      isFetching = true;

      const notification = await receiveNotification(idInstance, apiTokenInstance);
      console.log(notification);

      if (notification) {
        if (
          notification.body.typeWebhook === 'incomingMessageReceived' &&
          notification.body.senderData.chatId === chat.chatId
        ) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              isUser: false,
              message: notification.body.messageData?.textMessageData?.textMessage || 'Нет текста',
              timestamp: notification.body.timestamp,
            },
          ]);

          await deleteNotification(idInstance, apiTokenInstance, notification.receiptId);
        } else await deleteNotification(idInstance, apiTokenInstance, notification.receiptId);
      }

      isFetching = false;
    };

    const interval = setInterval(fetchNotifications, 1000);
    return (): void => clearInterval(interval);
  }, [chat.chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (): Promise<void> => {
    if (!inputValue.trim()) return;

    const url = getApiUrl('sendMessage', idInstance, apiTokenInstance);
    const data: ReqSendMessage = {
      chatId: chat.chatId,
      message: inputValue,
    };
    const result = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          isUser: true,
          message: inputValue,
          timestamp: new Date(),
        },
      ]);

      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === 'Enter') {
      await sendMessage();
    }
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>{chat.chatId}</div>

      <div className={styles.messageList}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${msg.isUser ? styles.userMessage : styles.receivedMessage}`}
          >
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Введите сообщение..."
          className={styles.inputField}
          value={inputValue}
          ref={inputRef}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Отправить
        </button>
      </div>
    </div>
  );
};
