import { Schema } from 'mongoose';

export const MediaSchema = new Schema({
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  Type: { type: String, required: true },
  Poster: { type: String, required: true },
  imdbID: { type: String, required: true },
  Timestamp: { type: String, required: false },
  Ownership: { type: String, required: false },
  WatchedEpisodes: { type: [String], required: false },
  Remarks: {
    type: Map,
    of: Number,
    default: {},
  },
  Status: { type: String, required: true },
  Reviews: {
    type: Map,
    of: String,
    default: {},
  },
}, { versionKey: '__v' }); 