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
  id: false, // Disable automatic "id"
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      const result = {
        user_id: ret._id,      //  first key
        name: ret.name,
        email: ret.email,
        role: ret.role,
        createdAt: ret.createdAt,
        updatedAt: ret.updatedAt
      };
      return result;
    }
  }
}
);

export const User = mongoose.model('User', userSchema);



