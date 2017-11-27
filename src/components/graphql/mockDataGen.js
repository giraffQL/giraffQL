const faker = require('faker');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const fakeDataGen = () => {
    if (x === GraphQLString) faker.random.word();
    if (GraphQLString) faker.randon.word();
    if (GraphQLInt) faker.random.number()
    if (GraphQLFloat) faker.random.number()
    if (GraphQLBoolean) faker.random.boolean();
    if (GraphQLID) faker.random.number()
    if (GraphQLList) console.log(`render some array of crap`)
}

// const createData = () => {
//     const arrData = [];
//     for(let i = 0; i < 10; i+=1){
//         const temp = {};
//         /*temp.firstName = //
//         temp.lastName = //
//         temp.nickname = //
//         temp.wins = //
//         temp.losses = //
//         temp.draws = //
//         console.log(temp);*/
//         arrData.push(temp);
//     }
//     return arrData;
// }

// const QueryType = new GraphQLObjectType({
//     name: 'Query',
//     fields: () => ({
//         /*basicQuery*/: {
//         type: new GraphQLList(/*TableName*/),
//             resolve: createData
//         }
//     })
// })

module.exports = new GraphQLSchema({
    query: QueryType
});

