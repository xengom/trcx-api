import {ApolloServer, gql} from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "hello",
    author: {
      id: "1",
      username: "John"
    },
  },
  {
    id: "2",
    text: "hello2",
    author: {
      id: "2",
      username: "John2"
    },
  },
  {
    id: "3",
    text: "hello3",
    author: {
      id: "3",
      username: "John3"
    },
  },
]

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }
  type Tweet {
    id: ID!
    text: String!
    photo: String
    author: User!
  }
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, {id}) {
      return tweets.find(tweet => tweet.id === id);
    }
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const newTweet = {
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, {id}) {
      const target = tweets.find(tweet => tweet.id === id);
      if (!target) return false;
      tweets = tweets.filter(tweet => tweet.id !== id);
      return true;
    },
  }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
  console.log(`Running on ${url}`);
})