export interface Email {
  id?: number;
  destinatario: string;
  oggetto: string;
  corpo: string;
  userId: number;
  userEmail: string;
}
