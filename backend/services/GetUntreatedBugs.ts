import MakeQuery from './MakeQuery'

export default class GetUntreatedBugs extends MakeQuery {
  constructor () {
    super('SELECT * FROM bugs WHERE fixed=false')
  }
}
