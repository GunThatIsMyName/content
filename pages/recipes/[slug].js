import { createClient } from 'contentful';
import React from 'react'

const client = createClient({
  space:process.env.CONTENTFUL_SPACE_ID,
  accessToken:process.env.CONTENTFUL_API_KEY,
})

const RecipeDetail = ({recipe}) => {
  console.log(recipe,"recipe")
  return (
    <div>RecipeDetail</div>
  )
}

export default RecipeDetail;

// props
export const getStaticProps = async({params}) =>{
  console.log(params,"@context");


  const res = await client.getEntries({
    content_type:'recipe',
    'fields.slug':params.slug
  });
  return {
    props:{
      recipe:res.items[0]
    }
  }

}
// to build Static Pages each path
export const getStaticPaths = async() =>{
  const response = await client.getEntries({
    content_type:'recipe'
  })

  const paths = response.items.map(item=>{
    return {
      params:{slug:item.fields.slug}
    }
  })

  // paths should return array
  return {
    paths,
    fallback:false
  }
}