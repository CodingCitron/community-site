import { useAuthState } from '@/context/auth'
import { Post } from '@/types'
import axios from 'axios'
import classNames from 'classnames'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface PostCardProps {
    post: Post,
    subMutate?:() => void,
    mutate?: () => void
}

const PostCard = ({ post: {
        identifier, 
        slug, 
        title, 
        body, 
        subName, 
        createdAt, 
        voteScore, 
        userVote, 
        commentCount, 
        url, 
        username, 
        sub
    }, 
    mutate,
    subMutate 
}: PostCardProps ) => {

    const router = useRouter()
    const isInSubPage = router.pathname === '/r/[sub]'
    const { authenticated } = useAuthState()

    const vote = async (value: number) => {
        if(!authenticated) router.push("/login") // 차 후 로그인 할거냐 묻는 걸로 수정
        if(value === userVote) value = 0

        console.log(value, userVote)
        try {
            await axios.post("/votes", { identifier, slug, value })

            if(mutate) mutate()
            if(subMutate) subMutate()
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div 
        className='flex mb-4 bg-white rounded'
        id={identifier}
    >
        {/* 좋아요 싫어요 기능 부분 */}
        <div className='flex-shrink-0 w-10 py-2 text-center rounded'>
            {/* 좋아요 */}
            <div 
                className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500'
                onClick={() => vote(1)}
            >   
                {/* 아이콘 부분 */}
                <span
                    className={classNames("", {
                        "text-red-500": userVote === 1
                    })}
                >
                    {/* 화살표 위 아이콘 */}
                    위
                </span>
            </div>
            <p className='text-xs font-bold'>{voteScore}</p>
            {/* 싫어요 */}
            <div 
                className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500'
                onClick={() => vote(-1)}
            >   
                {/* 아이콘 부분 */}
                <span
                    className={classNames("", {
                        "text-blue-500": userVote === -1
                    })}
                >
                    {/* 화살표 아래 아이콘 */}
                    아래
                </span>
            </div>
        </div>
        {/* 포스트 데이터 부분 */}
        <div className='w-full p-2'>
            <div className='flex items-center'>
                {! isInSubPage && (
                <div className='flex items-center'>
                    <Link href={`/r/${subName}`} className=''>
                        {sub && 
                            <Image 
                                src={sub.imageUrl}
                                alt="sub"
                                className='w-6 h-6 mr-1 rounded-full cursor-pointer'
                                width={24}
                                height={24}
                            />
                        }
                    </Link>
                    <Link 
                        href={`/r/${subName}`} 
                        className='ml-2 text-xs font-bold cursor-pointer hover:underline'
                    >
                        /r/{subName}
                    </Link>
                    <span className='mx-1 text-xs text-gray-400'></span>
                </div>
                )}
                <p className='text-xs text-gray-400 '>
                    Posted by
                    <Link 
                        href={`/u/${username}`}
                        className='mx-1 hover:under'
                    >
                        /u/${username}
                    </Link>
                    <Link 
                        href={url}
                        className='mx-1 hover:underline'
                    >
                        {dayjs(createdAt).format("YYYY-MM-DD HH:mm")}
                    </Link>
                </p>
            </div>
            <Link 
                href={url}
                className='my-1 text-lg font-medium'
            >
                {title}
            </Link>
            {body && <p className='my-1 text-sm '>{body}</p>}
            <div className='flex'>
                <Link 
                    href={url}
                    className='mr-1'
                >
                    {/* 아이콘 */}
                    {commentCount}
                </Link>
            </div>
        </div>
    </div>
  )
}

export default PostCard