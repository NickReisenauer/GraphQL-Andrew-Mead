import { GraphQLServer } from "graphql-yoga";

// Demo user data
const users = [
  {
    id: 1,
    name: "Nick",
    email: "nick@example.com",
    age: 18,
  },
  { id: 2, name: "Andrew", email: "andrew@example.com", age: 27 },
  { id: 3, name: "Mike", email: "mike@example.com" },
];

// Demo post data
const posts = [
  {
    id: 1,
    title: "AirPods",
    body: "Apple AirPods Pro",
    published: true,
    author: 1,
  },
  {
    id: 2,
    title: "MacBook",
    body: "Apple MacBook Pro",
    published: true,
    author: 2,
  },
  {
    id: 3,
    title: "Tesla Roadster",
    body: "The 2022 Tesla Roadster: Coming Soon",
    published: false,
    author: 1,
  },
];

// Demo comment data
const comments = [
  {
    id: 23,
    text: "Hello this is my first comment",
    author: 3,
  },
  {
    id: 24,
    text: "Hello here's my second comment",
    author: 1,
  },
  {
    id: 25,
    text: "Elon Musk just bought 1.5 billion dollars worth of Bitcoin",
    author: 2,
  },
];

// String
// Boolean
// Int
// Float
// ID

// Type Definitions
const typeDefs = `
 type Query {
   users(query: String): [User!]!
   me: User!
   posts(query: String): [Post!]!
   comments: [Comment!]!
   post: Post!
 }

 type User {
   id: ID!
   name: String!
   email: String!
   age: Int
   posts: [Post!]!
   comments: [Comment!]!
 }

 type Post {
   id: ID!
   title: String!
   body: String!
   published: Boolean!
   author: User!
 }

 type Comment {
   id: ID!
   text: String!
   author: User!
 }
`;

// Resolvers for our APIs
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) return users;
      return users.filter((user) =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
    },

    me() {
      return {
        id: "123098",
        name: "Mike",
        email: "mike@gmail.com",
        age: 28,
      };
    },

    posts(parent, args, ctx, info) {
      if (!args.query) return posts;
      return posts.filter((post) => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },

    comments(parent, args, ctx, info) {
      return comments;
    },
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },

  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log(`Server is up!`);
});
