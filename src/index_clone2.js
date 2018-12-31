import { GraphQLServer } from 'graphql-yoga';

/* **********************************************************
    The way of sending data from clients to the servers
*************************************************************/ 


// greeting return is not required.
// greeting(name: String): String!
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

// Parmeters for the client schema
// 1) prarent : relational database, the parent data: Users(paent) and Post(Child)
// 2) args: contains all of the operation arguments supplied
// 3) ctx : contextual data 
// 4) info : information sent along to the server.

// We will deal with args only here.
const resolvers = {
    Query: {
      add(parent, args) {

        return args.number1 + args.number2

      },
      greeting(parent, args, ctx, ) {
          console.log(args); // => { name: 'Jess' } Jess is from query in Yoga
          if(args.name && args.position) return `Hello, ${args.name}. Your my favorite ${args.position}`
          // return 'Hello!'
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


/* 
query {

    -  String: ""
    -  Number: 12
  greeting(name: "Jess")
  me {
    id
    name
    email
    age
  }
  post {
    id
    title
    body
    published
  }
}

*/


const server = new GraphQLServer({
    typeDefs,
    resolvers
});

// By default, graphQL server is working at port 4000.
server.start(() => {
    console.log(`Server is up!!!`);
});