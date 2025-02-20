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
    let formattedPhone = phone.trim();

    if (formattedPhone === '') {
      onClose();
      return;
    }

    if (formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.slice(1);
    }

    const chat: Chat = {
      chatId: `${formattedPhone}@c.us`,
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
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.h2}>Создать новый чат</h2>
        <input
          type="tel"
          className={styles.input}
          placeholder="Введите номер телефона"
          value={phone}
          ref={inputRef}
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.modalButtons}>
          <button className={styles.okBtn} onClick={handleCreate}>
            ОК
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
