import mongoose, {model, Schema} from 'mongoose'
import {prop, getModelForClass} from '@typegoose/typegoose'

const DogSchema = new Schema({
  name: String
})

class User {
  @prop()
  public name?: string
}

const UserModel = getModelForClass(User)
const db = 'mongodb://localhost/douban-trailer'
mongoose.Promise = global.Promise
export const connect = () => {
  let maxConnectTimes = 0
  return new Promise(((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了吧,快去修吧少年')
      }
    })
    mongoose.connection.on('error', (err) => {
      reject()
      console.log(err)
    })
    mongoose.connection.on('open', async () => {
      // const Dog = mongoose.model('Dog', DogSchema)
      // const doga = new Dog()
      // doga.save().then(() => {
      //   console.log('wang')
      // })
      const {_id: id} = await UserModel.create({name: 'pangao'} as User)
      const user = await UserModel.find(id).exec()
      console.log(user)
      resolve()
      console.log('mongodb连接成功')
    })
  }))
}