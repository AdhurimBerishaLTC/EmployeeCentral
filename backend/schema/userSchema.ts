export const userTypeDefs = `#graphql
  enum UserRole {
    employee
    team_lead
    manager
    hr
    admin
    super_admin
  }

  enum EmploymentType {
    full_time
    part_time
    contractor
    intern
  }

  enum UserStatus {
    active
    inactive
    terminated
  }

  type User {
    id: ID!
    email: String!
    employeeId: String!
    firstName: String!
    lastName: String!
    phone: String
    dateOfBirth: String
    department: Department
    role: UserRole!
    employmentType: EmploymentType!
    joiningDate: String
    status: UserStatus!
    createdAt: String!
    updatedAt: String!
  }

  input CreateUserInput {
    email: String!
    password: String!
    employeeId: String!
    firstName: String!
    lastName: String!
    phone: String
    dateOfBirth: String
    department: ID
    role: UserRole
    employmentType: EmploymentType
    joiningDate: String
    status: UserStatus
  }

  type Query {
    getUsers: [User!]
    getUserById(id: ID!): User  
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }
`;
