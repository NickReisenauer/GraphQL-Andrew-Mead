import { GraphQLServer } from "graphql-yoga";

// String
// Boolean
// Int
// Float
// ID

// Type Definitions
const typeDefs = `
 type Query {
   greeting(name: String position: String): String!
   add(a: Float! b: Float!): Float!
   me: User!
   post: Post!
 }

 type User {
   id: ID!
   name: String!
   email: String!
   age: Int
 }

 type Post {
   id: ID!
   title: String!
   body: String!
   published: Boolean!
 }
`;

// Resolvers for our APIs
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name && args.position)
        return `Hello ${args.name}. Your position is an ${args.position}`;
      return `Hello there!`;
    },

    me() {
      return {
        id: "123098",
        name: "Mike",
        email: "mike@gmail.com",
        age: 28,
      };
    },

    post() {
      return {
        id: "283482",
        title: "Learning GraphQL",
        body: "This is the body of my custom post type!",
        published: true,
      };
    },

    add(parent, args, ctx, info) {
      return args.a + args.b;
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
