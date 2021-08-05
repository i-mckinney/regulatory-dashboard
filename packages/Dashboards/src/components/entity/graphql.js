import { gql, useQuery } from "@apollo/client";

// Get entities data per AppSync GraphQL query schema
export const GET_ENTITIES = gql`
  query listEntities {
    listEntities {
      relationshipName
      borrowerName
      borrowerID
      tin
      relationshipManager
      company_id
      createdAt
      updatedAt
      Actions
    }
  }
`;
