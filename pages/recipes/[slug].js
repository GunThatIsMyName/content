import { createClient } from 'contentful';
import React from 'react'
import Image from "next/image";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
const client = createClient({
  space:process.env.CONTENTFUL_SPACE_ID,
  accessToken:process.env.CONTENTFUL_API_KEY,
})

const RecipeDetail = ({recipe}) => {
  console.log(recipe,"recipe");

  const {featuredImage,title,cookingTime,ingredients,method}=recipe.fields
  return (
    <div>
      <div className="banner">
        <Image src={`https:${featuredImage.fields.file.url}`} 
            width={featuredImage.fields.file.details.image.width}
            height={featuredImage.fields.file.details.image.height}
        />
        <h2>{title}</h2>
      </div>

      <div className="info">
        <p>Take About {cookingTime}  mins to cook.</p>
        <h3>Ingredients : </h3>
        {ingredients.map(ing=>(
          <span key={ing} >{ing}</span>
        ))}
      </div>

      <div className="method">
         <h3>Method :</h3>
         <div>
          {documentToReactComponents(method)}
         </div>
      </div>

      <style jsx>{`
        h2,h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
    </div>
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