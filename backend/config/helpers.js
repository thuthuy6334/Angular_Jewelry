import MySqli from "mysqli";

const conn = new MySqli({
  host: "localhost",
  port: "3306",
  user: "root",
  pass: "",
  db: "ql_trangsuc",
});

export const database = conn.emit(false, "");
