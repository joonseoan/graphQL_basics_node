import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
    type Query {
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

// Resolvers : nothing but functions in operations to handle GraphQL data
const resolvers = {
    Query: {
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

// By default, graphQL server is working at port 4000.
server.start(() => {
    console.log(`Server is up!!!`);
});