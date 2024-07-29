import User from "./dtos/userDto";
import userModel from "../models/userModel";
import * as mongoose from 'mongoose';
import { resolve } from "path";

export const getAllUsers = () => {
    return new Promise((resolve, reject) =>{
        userModel.find().then((users) => {
            resolve(users)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const getOneUser = (id: string) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({_id: id}).then((user)=>{
            resolve(user)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const createNewUser = (user: User) => {
    return new Promise((resolve, reject) => {
        userModel.create(user).then((user) =>{
            console.log(user)
            resolve(user);
        }).catch((err) => {
            reject(err)
        })
    })
}

export const updateOneUser = (id: string, params: User) => {
    return new Promise((resolve, reject) => {
        userModel.findByIdAndUpdate(id, params).then((user) => {
            resolve(user)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const deleteOneUser = (id: string) => {
    return new Promise((resolve, reject) => {
        userModel.findByIdAndDelete({_id: id}).then((user)=>{
            resolve(user)
        }).catch((err) => {
            reject(err)
        })
    })
}