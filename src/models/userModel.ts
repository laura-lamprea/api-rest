import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /^.+@.+\..+$/ },
    password: { type: String, required: true, minlength: 6 },
});

export default mongoose.model<IUser>('User', UserSchema);
