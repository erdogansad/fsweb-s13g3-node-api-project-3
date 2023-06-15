const sharedConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
    directory: __dirname + "/data/migrations",
  },
  seeds: {
    directory: __dirname + "/data/seeds",
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: __dirname + "/data/database.db3" },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: __dirname + "/data/testing.db3" },
  },
};
