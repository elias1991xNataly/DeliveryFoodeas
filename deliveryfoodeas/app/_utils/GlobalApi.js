const { graphql, request } = require("graphql");


const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
/**
 * Used to make Get Category Api Request
 * @returns 
 */

const GetCategory = async () => {
    const query = graphql`
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
      `

    const result = await request(MASTER_URL, query);
    return result;
}

export default {
    GetCategory
};