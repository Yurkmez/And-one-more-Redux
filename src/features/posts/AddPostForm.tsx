import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { nanoid } from '@reduxjs/toolkit'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/api/hook'
import { type Post, postAdded } from './postSlice'

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  postAuthor: HTMLInputElement
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
  // Get the `dispatch` method from the store
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userId = useAppSelector(selectCurrentUsername)!

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    // Prevent server submission
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    // // Create the post object and dispatch the `postAdded` action
    // const newPost: Post = {
    //   id: nanoid(),
    //   title: title,
    //   content: content,
    // }
    // dispatch(postAdded(newPost))

    // instead of this (see "postSlice")
    // ____Now we can pass these in as separate arguments,
    // ______and the ID will be generated automatically
    dispatch(postAdded(title, content, userId))
    navigate('/posts')

    // console.log('Values: ', { title, content })
    e.currentTarget.reset()
  }

  // const usersOptions = users.map((user) => (
  //   <option key={user.id} value={user.id}>
  //     {user.name}
  //   </option>
  // ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required />
        {/* <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" name="postAuthor" required>
          <option value=""></option>
          {usersOptions}
        </select> */}
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />
        <button>Save Post</button>
      </form>
    </section>
  )
}
