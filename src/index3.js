import { GraphQLServer } from 'graphql-yoga';
import _ from 'lodash';

import { customers, evaluations } from '../demo_db/play_db/customers_evaluations';

// 'query' argument inside of the brackets can be any fields (or properties) to fetch data
const typeDefs = `

    type Query {
        customers(query: String): [Customer!]!
        evaluations(query: String): [Evaluation!]!
        customer: Customer!
        evaluation: Evaluation!
    }

    type Customer {
        id: String!
        email: String!
        password: String!
        numberOfVisites: Int!
        preference: String!
    }

    type Evaluation {
        id: String!
        foodName: String!
        likeDislike: Boolean!
        complaint: String
    }

`;

const resolvers = {

    Query: {
        customers(parent, args, ctx, info) {

            if(!args.query) return customers;
            
            return _.filter(customers, customer => {

                // fetch data based on ids or emaill addresses
                const isCorrectIDs = customer.id.includes(args.query);
                const isCorrectEmails =customer.email.toLowerCase().includes(args.query.toLowerCase()); 

                return isCorrectIDs || isCorrectEmails;
                
            });

        },
        evaluations(parent, args, ctx, info) {
            
            if(!args.query) return evaluations;
            
            return _.filter(evaluations, evaluation => {

                const isCorrectIDs = evaluation.id.includes(args.query);
                const isCorrectFoodName = evaluation.foodName.toLowerCase().includes(args.query.toLowerCase());
    
                return isCorrectIDs || isCorrectFoodName;
            });

        },
        customer() {
            return {
                id: 'custs',
                email: 'anjo@abc.com',
                password: '123',
                numberOfVisites: 3,
                preference: 'Gunmandoo'
            };
        },
        evaluation() {
            return {
                id: 'foods',
                foodName: 'Squid Fried Rice',
                likeDislike: false
            };
        }

    }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => {
    console.log('My GraphQL server is just up!');
});
