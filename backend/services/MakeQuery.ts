import { Pool } from 'pg'

export default class MakeQuery {
  protected _query: string
  constructor (query: string) {
    this._query = query
  }

  async run (Pool: Pool, values: any[] = []) {
    try {
      const DB = await Pool.connect()
      const result = await DB.query(this._query, values)
      DB.release()
      return result
    } catch (err) {
      throw new Error(err)
    }
  }
}
