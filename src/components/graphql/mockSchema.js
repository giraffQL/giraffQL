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


// GraphQLString = faker.randon.word();
// GraphQLInt = faker.random.number()
// GraphQLFloat = faker.random.number()
// GraphQLBoolean = faker.random.boolean();
// GraphQLID = faker.random.number()
// GraphQLList = //render some array of crap


const FighterType = new GraphQLObjectType({
    name: 'Fighter',
    fields: () => ({
        firstName: {
            type: GraphQLString,
            resolve: fighter => fighter.firstName,
        },
        lastName: {
            type: GraphQLString,
            resolve: fighter => fighter.lastName
        },
        nickname: {
            type: GraphQLString,
            resolve: fighter => fighter.nickname
        },
        wins: {
            type: GraphQLInt,
            resolve: fighter => fighter.wins
        },
        losses: {
            type: GraphQLInt,
            resolve: fighter => fighter.losses
        },
        draws: {
            type: GraphQLInt,
            resolve: fighter => fighter.draws
        },
        team: {
            type: TeamType,
            resolve: createTeam
        }
    })
})

const TeamType = new GraphQLObjectType({
    name: 'Team',
    fields: () => ({
        teamName: {
            type: GraphQLString,
            resolve: team => team.teamName,
        },
        location: {
            type: GraphQLString,
            resolve: team => team.location
        }
    })
})

const createFighter = () => {
    const arrFight = [];
    for (let i = 0; i < 10; i += 1) {
        const fighter = {};
        fighter.firstName = faker.name.firstName();
        fighter.lastName = faker.name.lastName();
        fighter.nickname = faker.random.word();
        fighter.wins = faker.random.number();
        fighter.losses = faker.random.number();
        fighter.draws = faker.random.number();
        // console.log(fighter);
        arrFight.push(fighter);
    }
    return arrFight;
}

const createTeam = () => {
    // const teamInfo = [];
    const team = {};
    team.teamName = faker.random.words();
    team.location = faker.address.country();
    console.log(team);
    // teamInfo.push(team);
    return team;
}

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        allFighters: {
            type: new GraphQLList(FighterType),
            // args: { num: { type: GraphQLInt } },
            resolve: createFighter
        },
        team: {
            type: new GraphQLList(TeamType),
            resolve: createTeam
        }
    })
})

module.exports = new GraphQLSchema({
    query: QueryType
});