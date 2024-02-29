import { Tweet } from "@prisma/client"
import Prisma from "../../clients/db"
import { GraphqlContext, createTweetPayload } from "../../interfaces"

const mutations={
    createTweet:async(parent:any,{payload}:{payload: createTweetPayload},ctx: GraphqlContext)=>{
        if(!ctx.user){throw new Error("You are not authenticated to create a tweet");}
       const tweet=await Prisma.tweet.create({
        data:{
            content:payload.content,
            imageURL:payload.imageURL,
            author:{connect:{id:ctx.user.id}}
        }
       })
       return tweet;
    }
}
const queries={
    getAllTweets:async()=>{
        const tweets=await Prisma.tweet.findMany({orderBy:{createdAt:'desc'}})
        return tweets
    }
}

const extraResolvers={
    Tweet:{
        author:async(parent: Tweet)=>{
            const user=await Prisma.user.findUnique({
                where:{
                    id:parent.authorId
                }
            })
            return user;
        }
    }
}

export const resolvers={mutations,queries,extraResolvers}