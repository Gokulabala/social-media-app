import Feed from "./Feed"

const Home = (posts)=>{
    // console.log(posts.posts.length)
    return(
        <main className="Home">
            {posts.posts.length ? 
                (<Feed 
                    posts = {posts.posts}
                />): 
                (<p style={{marginTop:"2rem"}}>No Posts to display</p>)
            }
            
        </main>
    )
}

export default Home