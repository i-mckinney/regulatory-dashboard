import { gql, useQuery } from "@apollo/client";

// Get entities data per AppSync GraphQL query schema
export const GET_ENTITIES = gql`
  query listEntities {
    listEntities {
      _id
      borrowerID
      borrowerName
      company_id
      relationshipManager
      relationshipName
      tin
      Actions
    }
  }
`;
