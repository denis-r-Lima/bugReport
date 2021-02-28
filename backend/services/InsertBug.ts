import MakeQuery from './MakeQuery'

export default class InsertBug extends MakeQuery {
  constructor () {
    super(`INSERT INTO
        bugs(bug_title, bug_description, reported_by, reported_date, fixed)
        VALUES($1, $2, $3, $4, $5) 
        RETURNING *`)
  }
}
