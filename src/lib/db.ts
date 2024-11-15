import { LibsqlDialect } from "@libsql/kysely-libsql";
import { Kysely } from "kysely";

interface CrnTable {
  id: string;
}

interface UserTable {
  id: string;
  // add other user fields if necessary, e.g., name, email, etc.
}

interface RequestTable {
  userId: string; // foreign key referencing UserTable.id
  crnId: string; // foreign key referencing CrnTable.id
}

export interface Database {
  crn: CrnTable;
  user: UserTable;
  request: RequestTable;
}

export const dialect = new LibsqlDialect({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN as string,
});

export const db = new Kysely<Database>({
  dialect: dialect,
});
