// setup connection with contentful
import { createClient } from 'contentful'

// Components
import RecipeCard from '../components/RecipeCard'

export const getStaticProps=async()=>{
  const client = createClient({
    space:process.env.CONTENTFUL_SPACE_ID,
    accessToken:process.env.CONTENTFUL_API_KEY,
  })

  // Retrieve all entries of a space
  const response = await client.getEntries({
    content_type:'recipe'
  })
  return {
    props:{
      recipes:response.items
    },
    revalidate:1
  }
}

const index = ({recipes}) => {
  return (
    <div className='recipe-list' >
      {recipes.map(recipe=>{
        return <RecipeCard key={recipe.sys.id} recipe={recipe} />
      })}

      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}

export default index