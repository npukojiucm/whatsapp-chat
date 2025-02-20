'use client';

import React, { JSX, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { getApiUrl } from '@/utils/utils';
import { ResGetStateInstance } from '@/types/types';

export default function Login(): JSX.Element {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const url = getApiUrl('getStateInstance', idInstance, apiTokenInstance);
      const result = await fetch(url);

      const response: ResGetStateInstance = await result.json();

      if (response.stateInstance === 'authorized') {
        localStorage.setItem('idInstance', idInstance);
        localStorage.setItem('apiTokenInstance', apiTokenInstance);
        router.push('/chats');
      } else {
        setErrorMessage('Инстанс не настроен');
      }
    } catch (error: any) {
      if (error.message.includes('Failed to fetch')) {
        setErrorMessage('Инстанс не существует');
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Вход</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="ID Instance"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            className={styles.inputField}
            required
          />
          <input
            type="password"
            placeholder="API Token Instance"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            className={styles.inputField}
            required
          />
          <button type="submit" className={styles.loginButton}>
            Войти
          </button>
        </form>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
    </div>
  );
}
