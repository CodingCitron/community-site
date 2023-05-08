import { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken'
import { User } from "../entities/User";
import userMiddleware from "../middlewares/user"
import authMiddleware from "../middlewares/auth"

const createSub = async (req: Request, res: Response, next) => {
    const { name, title, description } = req.body

    const token = req.cookies.token

    if(!token) return next()

    // 먼저 Sub을 생성할 수 있는 유저인지 체크하기 위해 유저 정보 가져오기
    const { username }: any = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOneBy({ username })
    
    // 유저 정보가 없다면 throw error
    if(!user) throw new Error("Unauthenticated")

    // 유저 정보가 있다면 sub 이름과 제목이 이미 있는 것인지 체크

    // Sub Instance 생성 후 데이터베이스에 저장

    // 저장된 정보 프론트로 전달
}

const router = Router()

router.post("/", userMiddleware, authMiddleware, createSub)

export default router