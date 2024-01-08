import { userModel } from "@/models/user";
import bcrypt from 'bcryptjs'

export async function createUser(username: string, password: string) {
    if (!username || !password) {
        throw new Error("Invalid Body");
    }

	const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new userModel({
        username,
        password: hashedPassword
    });

    await newUser.save();
    return newUser;
}

export async function showUser(username: string) {
	if (!username) {
        throw new Error("Invalid Body");
	}

	const user = await userModel.findOne({username});

	console.log(user);
	
	if (!user){
		throw new Error("Invlaid username");
	}

	return user;
}
