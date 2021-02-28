/* eslint-disable no-undef */
import { Pool } from 'pg'

import MakeQuery from '../services/MakeQuery'
import InsertBug from '../services/InsertBug'
import GetUntreatedBugs from '../services/GetUntreatedBugs'
import UpdateBugState from '../services/UpdateBugState'
import GetAllBugs from '../services/GetAllBugs'
import GetBugById from '../services/GetBugById'

require('dotenv').config()

describe('Testing Bugs table', () => {
  const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    database: 'bugtracker_test'
  }
  )

  beforeAll(async () => {
    await new MakeQuery('TRUNCATE TABLE bugs RESTART IDENTITY').run(pool)
  })

  afterAll(() => {
    pool.end()
  })

  it('should add bug report to the db', async () => {
    const body = {
      title: 'BUG #1',
      description: 'This is the first bug test!',
      name: 'Denis Lima'
    }
    const { title, description, name } = body
    const insert = new InsertBug()
    const date = new Date()

    const result = await insert.run(pool, [title, description, name, date, false])

    expect(result).toEqual(expect.objectContaining({
      rows: [expect.objectContaining({
        bug_title: 'BUG #1',
        bug_description: 'This is the first bug test!',
        reported_by: 'Denis Lima'
      })]
    }))
  })

  it('should get all bugs with fixed equals false', async () => {
    const get = new GetUntreatedBugs()

    const body = {
      title: 'BUG #2',
      description: 'This is the second bug test!',
      name: 'Denis Lima'
    }
    const { title, description, name } = body
    const insert = new InsertBug()
    const date = new Date()

    await insert.run(pool, [title, description, name, date, true])

    const result = await get.run(pool)

    expect(result.rowCount).toEqual(1)
  })

  it('should update bug status to fixed equals true', async () => {
    const get = new GetUntreatedBugs()
    const bugList = await get.run(pool)
    const bugId = bugList.rows[0]['bug_id']
    const update = new UpdateBugState()
    const result = await update.run(pool, [bugId])
    expect(result.rows).toEqual([expect.objectContaining({ fixed: true })])
  })

  it('should get all Bugs reports, total of 2', async () => {
    const getAll = new GetAllBugs()
    const result = await getAll.run(pool)
    expect(result.rowCount).toBe(2)
  })

  it('should return the bug with ID 2', async () => {
    const getById = new GetBugById()
    const result = await getById.run(pool, [2])
    expect(result.rowCount).toBe(1)
    expect(result.rows).toEqual([expect.objectContaining({ bug_id: 2 })])
  })
})
