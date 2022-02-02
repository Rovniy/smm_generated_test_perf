const ENV = process.env

export const isDev = 'development' === ENV.NODE_ENV || true
export const isProduction = 'production' === ENV.NODE_ENV || false
