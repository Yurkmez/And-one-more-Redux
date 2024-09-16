import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '@/api/hook'
import { postUpdated, selectPostById } from './postSlice'

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}
interface EditPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const EditPostForm = () => {
  const { postId } = useParams()

  // Обратите внимание, что postId мы получаем из useParams() вводится как string | undefined, но selectPostById ожидается, что в качестве аргумента будет указано valid string. Мы можем использовать оператор TS ! , чтобы сообщить компилятору TS, что этого значения не будет undefined на данном этапе кода. (Это может быть опасно, но мы можем сделать предположение, потому что знаем, что настройка маршрутизации показывает только <EditPostForm> если в URL есть идентификатор записи.)
  const post = useAppSelector((state) => selectPostById(state, postId!))

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const onSavePostClicked = (e: React.FormEvent<EditPostFormElements>) => {
    // Prevent server submission
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    if (title && content) {
      dispatch(postUpdated({ id: post.id, title, content }))
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={onSavePostClicked}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" defaultValue={post.title} required />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue={post.content} required />

        <button>Save Post</button>
      </form>
    </section>
  )
}
