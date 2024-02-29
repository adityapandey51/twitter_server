export interface JWTUser {
    id: string;
    email: string;
  }

export interface createTweetPayload{
  content:string;
  imageURL?:string
}

export interface GraphqlContext{
  user?:JWTUser
}