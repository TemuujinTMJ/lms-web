import { Client } from "pg";

export const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'oyuka',
  password: '1234',
  database: 'lms_web'
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch(err => {
    console.error('Failed to connect to PostgreSQL database', err.stack);
  });
