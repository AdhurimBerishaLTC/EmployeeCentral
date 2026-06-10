export const departmentTypeDefs = `#graphql
    type Department {
        id: ID!
        name: String!
        code: String!
        description: String!
        manager: User
        isActive: Boolean!
    }   

    input CreateDepartmentInput{
        name: String!
        code: String!
        description: String!
        managerId: ID
        isActive: Boolean!
    }

    extend type Query{
        getDepartments: [Department!]
        getDepartmentById(id: ID!): Department
    }

    extend type Mutation {
        createDepartment(input: CreateDepartmentInput!): Department!
    }
`;
