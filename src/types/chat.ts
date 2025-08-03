export interface Resource {
  id: string;
  category: string;
  name: string;
  description: string;
  contact: {
    phone: string;
    email?: string;
    address?: string;
  };
  eligibility?: string[];
  hours?: string;
  languages?: string[];
}

export type ResponseType = 'resources' | 'general' | 'error';

export interface Response {
  type: ResponseType;
  content: string;
}

export interface ChatMessage {
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}
