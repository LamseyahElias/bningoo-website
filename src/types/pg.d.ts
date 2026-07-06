declare module 'pg' {
  import { EventEmitter } from 'events'

  interface ClientConfig {
    host?: string
    port?: number
    database?: string
    user?: string
    password?: string
    ssl?: boolean | { rejectUnauthorized: boolean }
    connectionTimeoutMillis?: number
  }

  class Pool extends EventEmitter {
    constructor(config?: ClientConfig)
    connect(): Promise<PoolClient>
    query(text: string, params?: any[]): Promise<QueryResult>
    end(): Promise<void>
  }

  interface PoolClient {
    release(err?: Error): void
    query(text: string, params?: any[]): Promise<QueryResult>
  }

  interface QueryResult {
    rows: any[]
    rowCount: number
    command: string
  }

  export { Pool, ClientConfig, PoolClient, QueryResult }
}
