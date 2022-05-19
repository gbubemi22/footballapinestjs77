import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Teams } from 'src/teams/schema/team.schema';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Player {
  [x: string]: any;
  @Prop({
    unique: true,
    required: [true, 'please provide a name'],
    trim: true,
    maxlength: [25, 'Name can not be more than 25 characters'],
  })
  playername: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: [10, 'Name can not be more than 10 characters'],
  })
  position: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: [13, 'Name can not be more than 13 characters'],
  })
  nationality: string;

  @Prop({
    type: Number,
    trim: true,
    unique: true,
    maxlength: [2, 'Number can not be more than 2 Figures'],
  })
  number: number;

  @Prop({ type: Boolean, default: false })
  isCaptain: {
    type: boolean;
    default: false;
  };

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teams' })
  team: Teams;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
