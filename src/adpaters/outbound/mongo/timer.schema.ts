import * as mongoose from 'mongoose';
import { TimerEntity } from '../../../core/entities/timer.entity';

export type TimerDocument = TimerEntity & Document;

export const timerSchema = new mongoose.Schema(
  {
    id: String,

    username: String,

    start_time: { type: Date },

    end_time: { type: Date },

    isFinish: { type: Boolean, default: false },
  },
  {
    id: true,
    timestamps: true,
  },
);

export const Timer = {
  name: 'Timer',
  schema: timerSchema,
};
