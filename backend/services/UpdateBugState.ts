import MakeQuery from './MakeQuery'

export default class UpdateBugState extends MakeQuery {
  constructor () {
    super('UPDATE bugs SET fixed = true WHERE bug_id = $1 RETURNING *')
  }
}
