import React, { JSX, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { Chat } from '@/types/types';
import { CreateChatModalProps } from '@/components/create-chat-modal/types';

export const CreateChatModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateChatModalProps): JSX.Element | null => {
  const [phone, setPhone] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCreate = (): void => {
    if (phone.trim() === '') {
      onClose();
      return;
    }

    const chat: Chat = {
      chatId: `${phone}@c.us`,
    };

    onCreate((prevChats) => [...prevChats, chat]);
    setPhone('');
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleCreate();
    }
  };

  return isOpen ? (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
        <h2 className={styles['h2']}>Создать новый чат</h2>
        <input
          type="tel"
          className={styles['input']}
          placeholder="Введите номер телефона"
          value={phone}
          ref={inputRef}
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className={styles['modal-buttons']}>
          <button className={styles['ok-btn']} onClick={handleCreate}>
            ОК
          </button>
          <button className={styles['cancel-btn']} onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
