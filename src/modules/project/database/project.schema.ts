import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
  
  @Prop({ required: true })
  ownerId: string;

  @Prop({ type: [String], default: [] })
  members: string[];

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' })
  status: string;

  @Prop({ type: Object, default: {} })
  settings: {
    notifications: boolean;
    autoSave: boolean;
    theme: string;
  };

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project); 