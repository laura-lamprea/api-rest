import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    favorites: number[];
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /^.+@.+\..+$/ },
    password: { type: String, required: true, minlength: 6 },
    favorites: [{ type: Number }] 
});

export default mongoose.model<IUser>('User', UserSchema);
