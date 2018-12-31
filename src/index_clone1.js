import { GraphQLServer } from 'graphql-yoga';

// Custom Type (not Scalar TYPE)
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

/*

query {
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

// Example here is 'User'
// const typeDefs = `
//     type Query {
//         me: User!
//     }
    
//     type User {
//         id: ID!
//         name: String!
//         email: String!
//         age: Int
//     }
// `

// // Resolvers : nothing but functions in operations to handle GraphQL data
// const resolvers = {
//     Query: {
//       me() {
//           return {
//               id: '123ABC',
//               name: 'Mike',
//               email: 'mike@example.com',
//               age: 28
//           }
//       }
//     }
// }

/* 
    [custom query]

    query {
            me {
            id
            name
            email
            age
        }
    }

*/

// type definition { Schema } : It is a graphQL Schema.
// Like Mongoose, the graphQL docs must have Schema.

// !: no null return
// Scalar types inside of graphql -  String, Boolean, Int, Float, ID, 
// ID must be upper letters.
// Additionally, object and array.
// Remind: gpa does not have ! mark because some people does not have gpa.
// const typeDefs = `
//     type Query {
//         title: String!
//         price: Float!
//         releaseYear: Int
//         rating: Float
//         inStock: Boolean!
//     }    
// `

// // Resolvers : nothing but functions in operations to handle GraphQL data
// const resolvers = {
//     Query: {
//        title() {
//             return 'Cukoo'
//        },
//        price() {
//             return 299.99
//        },
//        releaseYear() {
//             return 2018
//        },
//        rating() {
//             return null
//        },
//        inStock() {
//             return true
//        }
//     }
// }

// const typeDefs = `
//     type Query {
//         id: ID!
//         name: String!
//         age: Int!
//         employed: Boolean!
//         gpa: Float  
//     }
// `

// // Resolvers : nothing but functions in operations to handle GraphQL data
// const resolvers = {
//     Query: {
//        id() {
//             return 'abc123'
//        },
//        name() {
//             return 'Andrew Mead'
//        },
//        age() {
//             return 27
//        },
//        employed() {
//             return true
//        },
//        gpa() {
//            // because it has no '!' mark
//             return null
//        }
//     }
// }

// Practice
// const typeDefs = `
//     type Query {
//         hello: String!
//         name : String!
//         location: String!
//         bio: String!
//     }
// `

// // Resolvers : nothing but functions in operations to handle GraphQL data
// const resolvers = {
//     Query: {
//         hello() {  // must be a function with return
//             return 'This is my first query'
//         },
//         name() {
//             return 'Andrew'
//         },
//         location() {
//             return 'Oakville'
//         },
//         bio () {
//             return 'Computer Programmer'
//         }
//     }
// }

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

// By default, graphQL server is working at port 4000.
server.start(() => {
    console.log(`Server is up!!!`);
});