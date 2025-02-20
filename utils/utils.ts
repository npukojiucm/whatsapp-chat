'use client';

import { DeleteNotificationFn, GetApiUrlFn, ReceiveNotificationFn } from '@/types/types';

export const getApiUrl: GetApiUrlFn = (action, idInstance, apiTokenInstance, receiptId) => {
  const actions = {
    getStateInstance: process.env.NEXT_PUBLIC_GetStateInstance,
    sendMessage: process.env.NEXT_PUBLIC_SendMessage,
    receiveNotification: process.env.NEXT_PUBLIC_ReceiveNotification,
    deleteNotification: process.env.NEXT_PUBLIC_DeleteNotification,
  };

  if (receiptId) {
    return (
      process.env.NEXT_PUBLIC_apiUrl +
      idInstance +
      actions[action] +
      apiTokenInstance +
      `/${receiptId}`
    );
  }
  return process.env.NEXT_PUBLIC_apiUrl + idInstance + actions[action] + apiTokenInstance;
};

export const receiveNotification: ReceiveNotificationFn = async (idInstance, apiTokenInstance) => {
  const url = getApiUrl('receiveNotification', idInstance, apiTokenInstance);

  const response = await fetch(url);
  if (!response.ok) return null;

  return await response.json();
};

export const deleteNotification: DeleteNotificationFn = async (
  idInstance,
  apiTokenInstance,
  receiptId,
) => {
  const url = getApiUrl('deleteNotification', idInstance, apiTokenInstance, receiptId);

  await fetch(url, { method: 'DELETE' });
};
