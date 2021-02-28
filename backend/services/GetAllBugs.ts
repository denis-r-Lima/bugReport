import MakeQuery from './MakeQuery'

export default class GetAllBugs extends MakeQuery {
  constructor () {
    super('SELECT * FROM bugs')
  }
}
