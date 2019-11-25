import mongoose, {Schema} from 'mongoose'
import {prop, getModelForClass} from '@typegoose/typegoose'
// const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
const MovieSchema = new Schema({
  doubanId: String,
  rate: Number,
  title: String,
  summary: String,
  video: String,
  poster: String,
  cover: String,
  rawTitle: String,
  movieTypes: [String],
  pubdate: Mixed,
  year: Number,
  tags: Array,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

class Movie {
  @prop()
  doubanId: string
  @prop()
  rate: number
  @prop()
  title: string

}