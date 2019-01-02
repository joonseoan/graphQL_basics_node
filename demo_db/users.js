// This is a demo data

// Just in case, the objects in the array below
//      must be same as 'typeDefs'

//    type User {
//         id: ID!
//         name: String!
//         email: String!
//         age: Int
//     }

const users = [{
    id: '1',
    name: 'An',
    // generated error because it exploited User type in the array!!!!
    // ; type Query { users: [User!]! }
    // email: 'an@example.com',
    email: 'an@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
    age: 34
}];

export default users; 