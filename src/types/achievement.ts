export interface Achievement {
  id: string;
  title: string;
  position: string;
  issuer: string;
  category?: string;
  description?: string;
  date?: string;
  imageUrl?: string;
  credentialUrl?: string;
  createdAt: string;
}
