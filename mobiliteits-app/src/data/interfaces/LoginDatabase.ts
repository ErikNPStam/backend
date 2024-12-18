export interface LoginDatabase {
  getCurrentPassword(email: string): Promise<string | null>;
  getUserRole(email: string): Promise<string | null>;
}
