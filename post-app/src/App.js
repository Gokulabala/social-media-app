import About from './Components/About';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import Missing from './Components/Missing';
import Nav from './Components/Nav';
import NewPost from './Components/NewPost';
import Post from './Components/Post';
import PostPage from './Components/PostPage';

import {Routes, Route, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import {format} from 'date-fns'






function App() {

  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const [posts, setPosts] = useState([
    {
      id:1,
      title:"My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Make a video about Tesla Q1 results"
    },
    {
      id:2,
      title:"My second Post",
      datetime: "July 02, 2021 11:17:36 AM",
      body: "I attended a Defi blockChain event"
    },
    {
      id:3,
      title:"My third Post",
      datetime: "July 03, 2021 11:17:36 AM",
      body: "Web3 global summit next week"
    },
    {
      id:4,
      title:"My Fourth Post",
      datetime: "July 04, 2021 11:17:36 AM",
      body: "I am going for vacation"
    }
  ])
  const[searchResults, setSearchResults] = useState([])
  const[postTitle, setPostTitle] = useState('')
  const[postBody, setPostBody] = useState('')

  useEffect(()=>{
    const filteredResults = posts.filter((post)=>
      ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase())
    )
      
      setSearchResults(filteredResults.reverse())
    
  },[posts, search])

  const handleSubmit = (e)=>{
    e.preventDefault()
    // console.log(posts)
    const id = posts.length ? posts[posts.length-1].id+1 :1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {id, title:postTitle, datetime, body:postBody}
    const allPosts = [...posts, newPost]
    // console.log(id)
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
    
  }

  const handleDelete = (id)=>{
    const postsList = posts.filter((post)=> post.id!==id)
    setPosts(postsList)
    navigate('/')
    
  }


  return (
    <div className="App">
    {/* //   <nav>
    //     <ul>
    //       <li> <Link to="/" >Home</Link></li>
    //       <li><Link to="/about">About</Link></li>
         
    //       <li><Link to="/postpage">Postpage</Link></li>
    //     </ul>
    //   </nav> */}


      {/* <Routes>
        <Route path ="/" element = {<Home/>}/>
        <Route path ="/about" element = {<About />}/>
        <Route path = "/newpost" element = {<NewPost/>}/>
        <Route path="/postpage" >
          <Route index element = {<PostPage/>}/>
          <Route path =":id" element = {<Post/>}/>
          <Route path = "newpost" element = {<NewPost/>}/>
        </Route>
        <Route path="*" element = {<Missing/>}/>
      </Routes> */}

      <Header 
        title = {"Social Media App"}
      />
      <Nav 
        search = {search}
        setSearch = {setSearch}
      />
      <Routes>      
       <Route path='/' element ={  <Home 
          posts = {searchResults}  
        />} />
        <Route path='/post'>
          <Route index element={ <NewPost
            handleSubmit={ handleSubmit}
            postTitle={postTitle}
            postBody={postBody}
            setPostTitle={setPostTitle}
            setPostBody={setPostBody}
            />} />
          <Route path=':id' element={<PostPage
            posts = {posts}
            handleDelete = {handleDelete}
            />} />
          </Route>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<Missing/>}/>
      </Routes>
      <Footer/> 
    </div>
  );
}

export default App;
