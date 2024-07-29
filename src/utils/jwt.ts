import jwt from "jsonwebtoken";
const SECRET = "THISISMYSECRETKEY"

export const encodeToken = (payload: any) => {
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" })
    return token;
}

export const decodeToken = (token: string): any => {
    const decode = jwt.verify(token, SECRET)
    return decode
}