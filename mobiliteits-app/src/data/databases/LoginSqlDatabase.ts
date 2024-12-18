import { RelationalDatabase } from "../RationalDatabase";
import { Pool, ResultSetHeader } from "mysql2";
import { LoginDatabase } from "../interfaces/LoginDatabase";

/**
 * @author Joey van der Kuijl, Mohammed Yusufi, Luka Piersma, Erik Stam
 *
 * post Login database query.
*/
export class LoginSqlDatabase implements LoginDatabase {
  constructor() { }

  public async getCurrentPassword(email: string): Promise<string | null> {
    let pool: Pool | null = RelationalDatabase.getPool();
    let result: ResultSetHeader | null = null;
    let password: string | null = null;

    if (pool != null) {
      [result] = await pool.promise().execute<ResultSetHeader>(
        `SELECT hash
      FROM password
      WHERE email = ?
      ORDER BY created_at DESC
      LIMIT 1;
      `,
        [email || ""],
      );
    }

    if (result != null) {
      password = this.convertResultSetHeaderToPassword(result)[0];
    }

    return password;
  }

  /**
   * Get the role of the user with the given email.
   * @param email - The email of the user.
   * @returns - The role of the user.
   */
  public async getUserRole(email: string): Promise<string | null> {
    let pool: Pool | null = RelationalDatabase.getPool();
    let result: ResultSetHeader | null = null;
    let role: string | null = null;

    if (pool != null) {
      [result] = await pool.promise().execute<ResultSetHeader>(
        `
        SELECT account_type_name AS role
        FROM account
        WHERE email = ?;
      `,
        [email || ""],
      );
    }

    if (result != null) { 
      role = this.convertResultSetHeaderToRole(result)[0];
    }

    return role;
  }

  /**
   * Convert the result set header to a password.
   * @param resultSetHeader - The result set header.
   * @returns - The password.
   */
  private convertResultSetHeaderToPassword(resultSetHeader: any): string[] {
    if (resultSetHeader == undefined) {
      throw new Error("unknow user(s)");
    }

    const passwordArray: string[] = [];

    (resultSetHeader as any).forEach((element: any) => {
      const hash = element.hash;
      passwordArray.push(hash);
    });

    return passwordArray;
  }

  /**
   * Convert the result set header to a role.
   * @param resultSetHeader - ResultSetHeader
   * @returns - The role of the user.
   */
  private convertResultSetHeaderToRole(resultSetHeader: any): string[] {
    if (resultSetHeader == undefined) {
      throw new Error("unknow user(s)");
    }

    const passwordArray: string[] = [];

    (resultSetHeader as any).forEach((element: any) => {
      passwordArray.push(element.role);
    });

    return passwordArray;
  }
}
