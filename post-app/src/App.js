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
import {format} from 'date-fns';
import api from './api/posts';
import EditPost from './Components/EditPost';
import useWindowSize from './hooks/useWindowSize';





function App() {

  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([])
  const[searchResults, setSearchResults] = useState([])
  const[postTitle, setPostTitle] = useState('')
  const[postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const[editBody, setEditBody] = useState('')
  const navigate = useNavigate()
  const {width} = useWindowSize()

  useEffect(()=>{
    const fetchPosts = async ()=>{
      try {
        const response  = await api.get('/posts')
        setPosts(response.data)

      } catch (error) {
        if(error.response){
          console.log((error.response.data))
          console.log(error.response.status)
          console.log(error.response.headers)
        }
        else{
          console.log(`Error : ${error.message}`)
        }
      }
    }
    fetchPosts()
  },[])

  useEffect(()=>{
    const filteredResults = posts.filter((post)=>
      ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase())
    )
      
      setSearchResults(filteredResults.reverse())
    
  },[posts, search])

  const handleSubmit =async (e)=>{
    e.preventDefault()
    // console.log(posts)
    const id = posts.length ? posts.length+1 :1
    console.log(id)
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {id:`${id}`, title:postTitle, datetime, body:postBody}
    try{
      const response = await api.post('/posts', newPost)
      const allPosts = [...posts, response.data]
      // console.log(id)
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      navigate('/')  
    }catch (error) {
      if(error.response){
        console.log((error.response.data))
        console.log(error.response.status)
        console.log(error.response.headers)
      }
      else{
        console.log(`Error : ${error.message}`)
      }
    }
    
    
  }

  const handleEdit = async (id)=>{
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = {id:`${id}`, title:editTitle, datetime, body:editBody}
    try {
      const response =  await api.put(`posts/${id}`, updatedPost)
      setPosts(posts.map((post)=>post.id===id?{... response.data}: post))
      setEditBody('')
      setEditTitle('')
      navigate('/')
    } catch (error) {
      if(error.response){
        console.log((error.response.data))
        console.log(error.response.status)
        console.log(error.response.headers)
      }
      else{
        console.log(`Error : ${error.message}`)
       }
      }
  }

  const handleDelete = async (id)=>{
    try{
      await api.delete(`posts/${id}`)
      const postsList = posts.filter((post)=> post.id!==id)
      setPosts(postsList)
      navigate('/')
    }catch (error) {
      if(error.response){
        console.log((error.response.data))
        console.log(error.response.status)
        console.log(error.response.headers)
      }
      else{
        console.log(`Error : ${error.message}`)
       }
      }
    
    
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
        width = {width}
      />
      <Nav 
        search = {search}
        setSearch = {setSearch}
      />
      <Routes>      
       <Route path='/' element ={  <Home 
          posts = {searchResults}  
        />} />
        <Route path='post'>
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
          <Route path='/edit/:id' element={<EditPost
            posts = {posts}
            handleEdit={handleEdit}            
            editBody={editBody}
            setEditBody={setEditBody}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            />} />
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<Missing/>}/>
      </Routes>
      <Footer/> 
    </div>
  );
}

export default App;
