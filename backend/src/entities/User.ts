import { IsEmail, Length } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, BeforeInsert } from "typeorm"
import bcrypt from "bcryptjs"
import BaseEntity from "./Entity"
import Post from "./Post"
import Vote from "./Vote"

@Entity("users")
export class User extends BaseEntity {

    @Index()
    @IsEmail(undefined, { message: "이메일 주소가 잘못되었습니다." })
    @Length(1, 255, { message: "이메일 주소를 비워둘 수 없습니다." })
    @Column({ unique: true })
    email: string

    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Column({ unique: true })
    username: string

    @Column()
    @Length(6, 255, { message: "비밀번호는 6자리 이상이어야 합니다." })
    password: string

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @OneToMany(() => Vote, (vote) => vote.user)
    votes: Vote[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }
}
