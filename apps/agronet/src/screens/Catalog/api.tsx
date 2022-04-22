export const foodCategoryId = "cl2ad47d70041vcitqebzw8nw"
export const materialsCategoryId = "cl2ad55r80051vcitqcqt2bfl"

export const findManyProduct = `
  query ($search: String) {
    findManyProduct (
        where: {
            OR: [
                {title: { contains: $search}},
                {description: {contains: $search}},
            ]
        }
    ) {
        title
        description
        id
        image
        category {
          id
        }
    }
  }
`