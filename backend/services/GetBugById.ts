import MakeQuery from './MakeQuery'

export default class GetBugById extends MakeQuery {
  constructor () {
    super('SELECT * FROM bugs WHERE bug_id = $1')
  }
}
