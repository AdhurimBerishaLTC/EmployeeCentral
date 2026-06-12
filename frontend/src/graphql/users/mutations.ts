import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      firstName
      lastName
      employeeId
      phone
      dateOfBirth
      department {
        id
        name
      }
      role
      employmentType
      joiningDate
      status
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      firstName
      lastName
      employeeId
      phone
      dateOfBirth
      department {
        id
        name
      }
      role
      employmentType
      joiningDate
      status
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;
