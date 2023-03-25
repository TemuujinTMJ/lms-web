const { NODE_ENV } = process.env;

export const config =
  NODE_ENV === 'production'
    ? {
        HOST: 'localhost:3001/api',
      }
    : NODE_ENV === 'development'
    ? {
        HOST: 'http://192.168.0.150:3001/api',
      }
    : {};
