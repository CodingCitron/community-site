import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { User } from "../entities/User";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token
        if(!token) return next()
    
        // 먼저 Sub을 생성할 수 있는 유저인지 체크하기 위해 유저 정보 가져오기
        const { username }: any = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOneBy({ username })

        // 유저 정보를 res.local.user에 넣어주기
        res.locals.user = user
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Something went wrong" })
    }
}