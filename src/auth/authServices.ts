import { threadId } from "worker_threads";
import userModel from "../models/userModel";
import registerDto from "./dtos/registerDto";
import bcrypt from "bcrypt"
import loginDto from "./dtos/loginDto";
import { encodeToken } from "../utils/jwt";

export const register = async (data: registerDto) => {
    try {
        const user = await userModel.findOne({ email: data.email })
        if (user) throw new Error("user already exist")
        const hashedPassword = await bcrypt.hash(data.password, 10)
        const newUser = await userModel.create({ ...data, password: hashedPassword })
        newUser.save()
        return newUser
    } catch (err: any) {
        return {message: err.message}
    }
}

export const login = async (data: loginDto) => {
    // find user by email
    try {
        const user = await userModel.findOne({ email: data.email })
        if (!user) throw new Error("user not found")
        const compare = await bcrypt.compare(data.password, `${user.password}`)
        if (!compare) throw new Error("invalid credential")
        const token = encodeToken({ id: user._id, roll: user.roll })
        return {token: `${token}`, user: user}
    } catch (err: any) {
        return {message: err.message}
    }
}