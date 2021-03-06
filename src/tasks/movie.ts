import cp from 'child_process'
import {resolve} from 'path'


(async () => {
  const script = resolve(__dirname, '../crawler/trailer-list')
  const child = cp.fork(script, [])
  let invoked = false
  child.on('error', (err) => {
    if (invoked) return
    invoked = true
    console.log(err)
  })
  child.on('exit', (code) => {
    console.log(code)
    if (invoked) return
    invoked = false
    let err = code === 0 ? null : new Error('exit code' + code)
    console.log(err)
  })
  child.on('message', (data) => {
    let result = data.result
    console.log(result)
  })
})()
