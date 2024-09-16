import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { PostsList } from './features/posts/PostsList'
import { Navbar } from './components/Navbar'
import { AddPostForm } from './features/posts/AddPostForm'
import PostsMainPage from './features/posts/PostsMainPage'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<PostsMainPage />}></Route>
          <Route path="/posts" element={<PostsList />}></Route>
          <Route path="/posts/:postId" element={<SinglePostPage />}></Route>
          <Route path="/addPost" element={<AddPostForm />}></Route>
          <Route path="/editPost/:postId" element={<EditPostForm />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
