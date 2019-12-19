export interface MessageType {
  conversationID: string;
  sequenceId: number;
  attempts: number;
  actionAt: number;
  createdAt: string;
  destination: string;
  source: string;
  state: string;
  version: string;
  messageID: string;
  shortContent: string;
}
