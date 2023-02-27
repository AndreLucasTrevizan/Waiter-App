import { compareSync, hashSync } from 'bcryptjs';
import { Schema, model } from 'mongoose';
import { SerializedUser, UserType } from '../../../@types/users';

const UsersSchema = new Schema<UserType>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

UsersSchema.pre('save', function(next) {
  this.password = hashSync(this.password, 8);

  next();
});

UsersSchema.methods.comparePassword = function(candidate_password: string): boolean {
  return compareSync(candidate_password, this.password);
}

UsersSchema.methods.serialize = function(): SerializedUser {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
}

export const UsersModel = model<UserType>('User', UsersSchema);
