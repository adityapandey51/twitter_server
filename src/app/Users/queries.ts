export const queries=`#graphql
    verifyGoogleAuthToken(token:String!): String!
    getCurrentUser: User
    getUserByID(id:ID!):User
`