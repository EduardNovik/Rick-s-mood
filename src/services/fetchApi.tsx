import axios from "axios";

type VariablesProp = {
  filter: { name: string };
};

// Option 1 with fetch

// export const AllCharactersFetch = (searchValue: string) =>
// queryFetch(`
//     query allCharacters ($filter:FilterCharacter){
//             characters(filter:$filter){
//             info{
//                 pages
//             }
//             results {
//                 id
//                 name
//                 image
//                 location {
//                 name
//                 dimension
//                 }
//             }
//         }
//     }`,{filter: {name: searchValue}})
//     .then((data: Record<string, any>) => console.log(data.data.characters));

// const queryFetch = (query: string, variables: VariablesProp) => {
//   return fetch(`https://rickandmortyapi.com/graphql`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       query: query,
//       variables: variables,
//     }),
//   }).then((res) => res.json());
// };



// Option 2 with axios

const endpoint = "https://rickandmortyapi.com/graphql";

const headers = { "content-type": "application/json" };

const graphqlQuery = (variables: VariablesProp) => {
  return {
    query: `query allCharacters ($filter:FilterCharacter){
                characters(filter:$filter){
                info{pages}
                results {
                    id
                    name
                    image
                    location {
                    name
                    dimension
                    }
                }
            }
        }`,
    variables: {filter: {name: variables}},
  };
};

export const fetchAllCharacters = async(searchValue: VariablesProp) => {
   const response = await axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: graphqlQuery(searchValue),
  });
  return console.log(response.data.data.characters);
};
