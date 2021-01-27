const port = process.env.NODE_ENV === 'production' ? '3210' : '8080'

export default {
  baseURL: `http://localhost:${port}`,
  timeout: 1000,
}