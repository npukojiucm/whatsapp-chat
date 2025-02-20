/* eslint-disable */

export interface Chat {
  chatId: string;
}

// Messages
export interface Messages {
  isUser: boolean;
  message: string;
  timestamp: Date;
}

// Utils
export interface Actions {
  getStateInstance: string;
  sendMessage: string;
  receiveNotification: string;
  deleteNotification: string;
}

export type GetApiUrlFn = (
  action: keyof Actions,
  idInstance: string,
  apiTokenInstance: string,
  receiptId?: number,
) => string;

export type ReceiveNotificationFn = (
  idInstance: string,
  apiTokenInstance: string,
) => Promise<ResReceiveNotification | null>;

export type DeleteNotificationFn = (
  idInstance: string,
  apiTokenInstance: string,
  receiptId: number,
) => Promise<void>;

// Api req/res
// GetStateInstance
export interface ResGetStateInstance {
  stateInstance:
    | 'notAuthorized'
    | 'authorized'
    | 'blocked'
    | 'sleepMode'
    | 'starting'
    | 'yellowCard';
}

// ReceiveNotification
export interface ResReceiveNotification {
  receiptId: number;
  body: NotificationBody;
}

export interface NotificationBody {
  typeWebhook:
    | 'incomingMessageReceived'
    | 'stateInstanceChanged'
    | 'outgoingMessageStatus'
    | 'deviceInfo';
  instanceData: InstanceData;
  timestamp: Date;
  idMessage: string;
  senderData: SenderData;
  messageData: MessageData;
}

export interface InstanceData {
  idInstance: number;
  wid: string;
  typeInstance: 'whatsapp';
}

export interface SenderData {
  chatId: string;
  sender: string;
  senderName: string;
  senderContactName: string;
}

export interface MessageData {
  typeMessage: 'textMessage' | 'imageMessage' | 'videoMessage' | 'documentMessage';
  textMessageData: TextMessageData;
  imageMessageData?: ImageMessageData;
  videoMessageData?: VideoMessageData;
  documentMessageData?: DocumentMessageData;
}

export interface TextMessageData {
  textMessage: string;
}

export interface ImageMessageData {
  imageUrl: string;
  caption?: string;
}

export interface VideoMessageData {
  videoUrl: string;
  caption?: string;
}

export interface DocumentMessageData {
  documentUrl: string;
  fileName: string;
}

// SendMessage
export interface ReqSendMessage {
  chatId: string;
  message: string;
  quotedMessageId?: string;
  linkPreview?: boolean;
}

export interface ResSendMessage {
  idMessage: string;
}
