export const getPersona = /* GraphQL */ `
  query GetPersona($id: ID!) {
    getPersona(id: $id) {
      id
      messagingId
      activePersona
      primaryRole
      availableRoles
      pushNotificationInfo {
        expoToken
        isPushAllowed
        isInError
      }
      behaviorReportsSustained {
        items{
          id
          reason
          personaSustainingExplanation
        }
      }
      notifications {
        items {
          id
          title
          body
        }
      }
      createdAt
      updatedAt
    }
  }
`

export const updatePersona = /* GraphQL */ `
  mutation UpdatePersona($input: UpdatePersonaInput!) {
    updatePersona(input: $input) {
      id
      messagingId
      activePersona
      primaryRole
      availableRoles
      pushNotificationInfo {
        expoToken
        isPushAllowed
        isInError
      }
      behaviorReportsSustained {
        items {
          id
          reason
          personaSustainingExplanation
        }
      }
      notifications {
        items {
          id
          title
          body
        }
      }
      createdAt
      updatedAt
    }
  }
`
