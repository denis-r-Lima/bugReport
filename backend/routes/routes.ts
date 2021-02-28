import { Router } from 'express'
import { QueryResult } from 'pg'

import postgres from '../database/db'
import InsertBug from '../services/InsertBug'
import GetUntreatedBugs from '../services/GetUntreatedBugs'
import UpdateBugState from '../services/UpdateBugState'

const routes = Router()

routes.get('/', (req, res) => {
  res.json({ message: 'Server running' })
})

routes.get('/get_pending_bugs', async (req, res) => {
  const getBugs = new GetUntreatedBugs()
  try {
    const result = await getBugs.run(postgres) as QueryResult<any>
    res.json(result.rows)
  } catch (err) {
    console.log(err)
  }
})

routes.post('/report_bug', async (req, res) => {
  const { title, description, name } = req.body
  const insert = new InsertBug()
  const date = new Date()
  try {
    const result = await insert.run(postgres, [title, description, name, date, false]) as QueryResult<any>
    res.json({ message: `Report #${result.rows[0].bug_id} submited!` })
  } catch (err) {
    console.log(err)
  }
})

routes.post('/update_status', async (req, res) => {
  const { bugId } = req.body
  const update = new UpdateBugState()
  try {
    await update.run(postgres, [bugId])
    res.json({ message: `Report #${bugId} updated` })
  } catch (err) {
    console.log(err)
    res.json({ message: `Faile to update report #${bugId}` })
  }
})

export default routes
