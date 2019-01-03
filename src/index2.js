import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
        add(number1: Float!, number2: Float!): Float!
        greeting(name: String, position: String): String!
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
`

const resolvers = {
    Query: {
      add(parent, args) {
        return args.number1 + args.number2
      },
      greeting(parent, args, ctx, ) {
          if(args.name && args.position) return `Hello, ${args.name}. Your my favorite ${args.position}`
          if(!args.name) return 'Hello'
      },
      me() {
          return {
              id: '123ABC',
              name: 'Mike',
              email: 'mike@example.com',
              age: 28
          }
      },
      post() {
          return {
              id: 'abc',
              title: 'Node_GraphQL',
              body: 'This is a graphQL basics',
              published: false
          }
      }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log(`Server is up!!!`);
});