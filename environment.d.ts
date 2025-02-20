declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_apiUrl: string;
      NEXT_PUBLIC_GetStateInstance: string;
      NEXT_PUBLIC_SendMessage: string;
      NEXT_PUBLIC_ReceiveNotification: string;
      NEXT_PUBLIC_DeleteNotification: string;
    }
  }
}

export {};
