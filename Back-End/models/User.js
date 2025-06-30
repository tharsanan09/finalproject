import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // Rename _id to id and remove __v and password
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password; // hide password in JSON response
      }
    }
  }
);

export const User = mongoose.model('User', userSchema);
