import { request, gql } from "graphql-request";


const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const GetCategory = async () => {
  const query = gql`
    query Categories {
      categories(first: 50) {
        id
        name
        slug
        icon {
          url
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
}
const GetBusiness = async (category) => {
  const query = gql`
  query GetBusiness {
    restaurants(where: {categories_some: {slug: "`+ category + `"}}) {
      aboutUs
      address
      banner {
        url
      }
      categories {
        name
      }
      id
      slug
      name
      restroType
      workingHours
      reviews {
        star
      }
    }
      
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const GetBusinessDetail = async (businessSlug) => {
  const query = gql`
  query RestaurantDetail {
    restaurant(where: {slug: "`+ businessSlug + `"}) {
      aboutUs
      address
      banner {
        url
      }
      categories {
        name
      }
      reviews {
        star
      }
      id
      name
      restroType
      slug
      workingHours
      menu {
        ... on Menu {
          id
          category
          menuItem {
            ... on MenuItem {
              id
              name
              description
              price
              productImage {
                url
              }
            }
          }
        }
      }
    }
  }
  `

  const result = await request(MASTER_URL, query);
  return result;
}



const AddToCart = async (data) => {
  const query = gql`
  mutation AddToCart {
    createUserCart(
      data: {email: "`+ data.email + `", 
      price: ` + data.price + `, 
      productDescription: "` + data.description + `", 
      productName: "`+ data.name + `", 
      productImage: "`+ data.productImage + `",
    restaurant:{connect:{slug:"`+ data.restaurantSlug + `"}}}
    ) {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;

}

const GetUserCart = async (userEmail) => {

  const query = gql`query GetUserCart {
    userCarts(where: {email: "`+ userEmail + `"}) {
      id
      price
      productDescription
      productImage
      productName
      restaurant {
        name
        banner {
          url
        }
        slug
      }
    }
  }
  `

  const result = await request(MASTER_URL, query);
  return result;
}

const DisconnectRestroFromUserCartItem = async (id) => {
  const query = gql`
  mutation DisconnectRestaurantFromCarItem {
    updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "`+ id + `"}){
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }
  `
  const result = await request(MASTER_URL, query);
  // const data = result.id;
  return result;
}


const DeleteItemFromCart = async (id) => {
  const query = gql`
  mutation DeleteCartItem {
    deleteUserCart(where: {id: "`+ id + `"}) {
      id
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}


const AddNewReview = async (data) => {
  const query = gql`
  mutation AddNewReview {
    createReview(
      data: {email: "`+ data.email + `", 
        profileImage: "`+ data.profileImage + `", 
        reviewText: "`+ data.reviewText + `", 
        star: `+ data.star + `, 
        userName: "`+ data.userName + `", 
        restaurant: {connect: {slug: "`+ data.RestroSlug + `"}}}
    ) {
      id
    }
    publishManyReviews(to: PUBLISHED) {
      count
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}



const getRestaurantReviews = async (slug) => {
  const query = gql`query RestaurantReviews {
  reviews(where: {restaurant: {slug: "`+ slug + `"}},orderBy:publishedAt_DESC) {
    email
    id
    profileImage
    publishedAt
    userName
    star
    reviewText
  }
}
`
  const result = await request(MASTER_URL, query);
  return result;

}


const CreateNewOrder = async (data) => {
  const query = gql`mutation CreateNewOrder {
  createOrder(
    data: {email: "`+ data.email + `", 
    orderAmount: `+ data.orderAmount + `, 
    restaurantName: "`+ data.restaurantName + `", 
    userName: "`+ data.userName + `", 
    address: "`+ data.address + `", 
    phone: "`+ data.phone + `", 
    zipCode: "`+ data.zipCode + `"}
  ) {
    id
  }
}`

  const result = await request(MASTER_URL, query);
  return result;

}

const UpdateOrderToAddOrderItem = async (name, price, id, email) => {
  const query = gql`mutation UpdateOrderWithDetail {
    updateOrder(
      data: {orderDetail: {create: {OrderItem: {data: {name: "`+ name + `", price: ` + price + `}}}}}
      where: {id: "`+ id + `"}
    ) {
      id
    }
    publishManyOrdersConnection(to: PUBLISHED) {
      aggregate {
        count
      }
    }
    deleteManyUserCartsConnection(where: {email: "`+ email + `"}) {
      aggregate {
        count
      }
    }
  }`

  const result = await request(MASTER_URL, query);
  return result
}



export default {
  GetCategory,
  GetBusiness,
  GetBusinessDetail,
  AddToCart,
  GetUserCart,
  DisconnectRestroFromUserCartItem,
  DeleteItemFromCart,
  AddNewReview,
  getRestaurantReviews,
  CreateNewOrder,
  UpdateOrderToAddOrderItem
};