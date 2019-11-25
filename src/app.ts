import Koa from 'koa'
import {resolve} from 'path'
import {connect} from "./database/init"


(async () => {
  connect()
})()
const app = new Koa()
app.listen(4455)
