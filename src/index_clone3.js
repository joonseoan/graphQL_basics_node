import { GraphQLServer } from 'graphql-yoga';

/****************************************************
 *              Scalar Type: Array
 ****************************************************/ 

// [ Array part 2 ]
// Demo database
import users from '../demo_db/users';
import posts from '../demo_db/posts';

//*********************************************************************************
// Manipulating query : client request to server to send the necessary data only
//          1) query: String ====> Without an '!' mark, the argument is optional.
//              That is, the argument itself can be null (nullable)
//          2) users(query: String): [User]! 
//*********************************************************************************
const typeDefs = `

    type Query {
        users(query: String): [User!]!
        posts (query: String): [Post!]!
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

const resolvers = {
    Query: {
      users (parent, args, ctx, info) {
          if(!args.query) return users;

        // includes => return boolean;
        return users.filter(user => user.name.toLowerCase()
            .includes(args.query.toLowerCase()));
      },
      posts (parent, args, ctx, info) {
          if(!args.query) return posts;

          return posts.filter(post => {

            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());

            return isTitleMatch || isBodyMatch;
  
        });
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

// const typeDefs = `
//     type Query {
//         users: [User!]!
//         me: User!
//         post: Post!
//     }

//     type User {
//         id: ID!
//         name: String!
//         email: String!
//         age: Int
//     }
    
//     type Post {
//         id: ID!
//         title: String!
//         body: String!
//         published: Boolean!
//     }
// `;

// const resolvers = {
//     Query: {

//        // the arguments down below are not not necessary ****
//       users (parent, args, ctx, info) {

//       // return the entire array.****   
//         return users;
//       },
//       me() {
//           return {
//               id: '123ABC',
//               name: 'Mike',
//               email: 'mike@example.com',
//               age: 28
//           }
//       },
//       post() {
//           return {
//               id: 'abc',
//               title: 'Node_GraphQL',
//               body: 'This is a graphQL basics',
//               published: false
//           }
//       }
//     }
// }


// ******************************************************************
// The way of sending array reference from the client to the server
// add(number: [!Float]!)
// ******************************************************************

// ******************************************************************
// The way of sending array from the server to the client
// grades:[]! // same format of javascript
// ******************************************************************

// const typeDefs = `
//     type Query {
//         add(number: [Float!]! ): Float!
//         greeting(name: String, position: String): String!
//         grades: [Int!]!
//         me: User!
//         post: Post!
//     }

//    type User {
//         id: ID!
//         name: String!
//         email: String!
//         age: Int
//     }
    
//     type Post {
//         id: ID!
//         title: String!
//         body: String!
//         published: Boolean!
//     }
// `

// const resolvers = {
//     Query: {
//       add(parent, args, ctx, info) {
//         if(args.number.length === 0) {
//             return 0
//         }

//         // Use array.reduce();
//         // [1, 3, 5]

//         // return args.number.reduce((accumulator, currentValue) => {
//         //     // accurmualtor 1, current value 3 // => iterating like this.
//         //     console.log(accumulator, currentValue);            
//         //     return accumulator + currentValue;
//         // });

//         return args.number.reduce((accumulator, currentValue) => accumulator + currentValue);

//       },
//       greeting(parent, args, ctx, ) {
//           if(args.name && args.position) return `Hello, ${args.name}. Your my favorite ${args.position}`
//           if(!args.name) return 'Hello'
//       },
//       me() {
//           return {
//               id: '123ABC',
//               name: 'Mike',
//               email: 'mike@example.com',
//               age: 28
//           }
//       },
//       grades(parent, args, ctx, info) {
//           return[99, 80, 93]

//       },
//       post() {
//           return {
//               id: 'abc',
//               title: 'Node_GraphQL',
//               body: 'This is a graphQL basics',
//               published: false
//           }
//       }
//     }
// }

/* 
    // 2)
    query {
    add(number: [10, 2, 4, 18])
    greeting(name: "Joon", position: "Manager")
    grades
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

    // 1)
    // we must provide the 'grades' field only as followed. 
    // Same way to query the scalar data query
    
    query {
        grades
    }

*/

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log(`Server is up!!!`);
});