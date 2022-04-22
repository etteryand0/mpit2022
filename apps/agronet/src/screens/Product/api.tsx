export const findUniqueProduct = `
  query ($id: String!) {
    findUniqueProduct(where: {id: $id}) {
        title
        description
        composition
        image
        owner {
            crowdfunding {
                id
                goal
                earned
            }
            name
        }
    }
  }
`

export const createUniqueDonation = `
  mutation ($amount: Int!, $crowdfundingId: String!) {
    createOneDonation(
        data: {
            amount: $amount,
            crowdfunding: { connect: { id: $crowdfundingId }}
            donor: { connect: { email: "admin@gmail.com" }}
        }
    ) {
        id
    }
  }
`