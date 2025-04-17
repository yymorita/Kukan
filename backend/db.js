import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: "postgres://kukan_user:kukan_pass@postgres:5432/kukan_db",
  ssl: false
});

// 失敗した場合にすぐ分かるようログ
pool.on('error', (err) => {
  console.error('PostgreSQL client error', err);
});
