import * as mysql2 from "mysql2";

export class RelationalDatabase {
  private static pool: mysql2.Pool | null = null;

  public static getPool(): mysql2.Pool | null {
    if (RelationalDatabase.pool == null) {
      RelationalDatabase.initializeRelationalDatabase();
    }
    return RelationalDatabase.pool;
  }
  private static initializeRelationalDatabase(): void {
    try {
      // Create the connection pool. The pool-specific settings are the defaults
      RelationalDatabase.pool = mysql2.createPool({
        host: process.env.HOST_RELATIONAL_DB,
        port: parseInt(process.env.PORT_RELATIONAL_DB || "3306"),
        user: process.env.USER_RELATIONAL_DB,
        password: process.env.PASSWORD_RELATIONAL_DB,
        database: process.env.SCHEMA_RELATIONAL_DB,
        waitForConnections: RelationalDatabase.convertToBoolean(
          process.env.WAIT_FOR_CONNECTIONS_RELATIONAL_DB,
        ),
        connectionLimit: parseInt(
          process.env.CONNECTION_LIMIT_RELATIONAL_DB || "10",
        ),
        queueLimit: parseInt(process.env.QUEUE_LIMIT_RELATIONAL_DB || "0"),
      } as mysql2.PoolOptions); // Cast the object to PoolOptions
    } catch (error) {}
  }
  private static convertToBoolean(
    input: string | undefined,
  ): boolean | undefined {
    let result: boolean = false;
    try {
      if (input !== undefined) {
        result = JSON.parse(input.toLowerCase());
      }
    } catch (e) {
      return result;
    }
    return result;
  }
}
