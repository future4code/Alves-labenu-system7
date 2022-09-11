import knex, { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

class BaseDataBase {
  private static connection: Knex 

  protected getConnection() {
    
      BaseDataBase.connection = knex({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_SCHEMA,
          multipleStatements: true,
        },
      });
 
    return BaseDataBase.connection
  }
}
export default BaseDataBase;