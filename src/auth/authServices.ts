import { threadId } from "worker_threads";
import userModel from "../models/userModel";
import registerDto from "./dtos/registerDto";
import bcrypt from "bcrypt"
import loginDto from "./dtos/loginDto";
import { encodeToken } from "../utils/jwt";
import ServerError from "../errors/serverErrors";

export const register = async (data: registerDto) => {
    const user = await userModel.findOne({ email: data.email })
    if (user) throw new ServerError(409, "user already exist")
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser = await userModel.create({ ...data, password: hashedPassword })
    newUser.save()
    return newUser
}

export const login = async (data: loginDto) => {
    // find user by email
    const user = await userModel.findOne({ email: data.email })
    if (!user) throw new ServerError(404, "user not found")
    const compare = await bcrypt.compare(data.password, `${user.password}`)
    if (!compare) throw new Error("invalid credential")
    const token = encodeToken({ id: user._id, roll: user.roll })
    return {token: `${token}`, user: user}

}