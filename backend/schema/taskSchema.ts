export const taskTypeDefs = `#graphql
    type Task {
        id: ID!
        title: String!
        description: String
        status: String
        assignedTo: User!
        createdBy: User!
        priority: String
        dueDate: String
    }

    input CreateTaskInput {
        title: String!
        description: String
        status: String
        assignedTo: ID!
        priority: String
        dueDate: String!
        createdBy: ID!
    }

    input UpdateTaskInput {
        title: String
        description: String
        status: String
        assignedTo: ID
        priority: String
        dueDate: String
        createdBy: ID
    }

    extend type Query {
        getTasks: [Task!]
        getTaskById(id: ID!): Task
    }

    extend type Mutation {
        createTask(input: CreateTaskInput!): Task!
        updateTask(id: ID!, input: UpdateTaskInput!): Task!
        deleteTask(id: ID!): Boolean!
    }
`;
