import {model, InferSchemaType, Schema} from 'mongoose'

const schema = new Schema(
	{
		username: {type: String, required: true, unique: true},		
		password: {type: String, required: true},
	}
)

export type User = InferSchemaType<typeof schema>;

export const userModel = model('User', schema);
