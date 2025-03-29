import apiClient from './client';

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Send a contact message (public route)
export const sendContactMessage = async (contactData: Omit<ContactMessage, '_id' | 'isRead'>): Promise<ContactMessage> => {
  const response = await apiClient.post('/contact', contactData);
  return response.data.contact;
};

// Get all contact messages (protected route)
export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const response = await apiClient.get('/contact');
  return response.data;
};

// Delete a contact message (protected route)
export const deleteContactMessage = async (id: string): Promise<void> => {
  await apiClient.delete(`/contact/${id}`);
}; 