import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { nanoid } from '@reduxjs/toolkit'
import { useAppDispatch } from '@/api/hook'
import { type Post, postAdded } from './postSlice'

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
  // Get the `dispatch` method from the store
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
    dispatch(postAdded(title, content))
    navigate('/posts')

    // console.log('Values: ', { title, content })
    e.currentTarget.reset()
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />
        <button>Save Post</button>
      </form>
    </section>
  )
}
