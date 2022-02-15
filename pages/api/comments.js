import {GraphQLClient, gql} from 'graphql-request'
import { error } from 'next/dist/build/output/log'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export default async function comments(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers:{
      authorization:`Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  })
  // const query = gql`
  // mutation CreateComment($name:String!, $email:String!, $comment:String!, $slug:String!){
  //   CreateComment(data:{name:$name, email:$email, comment:$comment, post: {connect:{slug:$slug}}}){id}
  // }`

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body)

    return res.status(200).send(result);
  }
  catch (e) {
    console.log(e)
    return res.status(500).send(e);
  }
}









