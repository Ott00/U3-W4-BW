export interface Email {
  id?: number;
  oggetto: string;
  corpo: string;
  userId: number;
  userEmail: string;
  completed: boolean;
}
