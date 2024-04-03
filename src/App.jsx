import { useState, useEffect } from 'react'
import { useImmerReducer } from 'use-immer'
import commentsData from './data/commentsData.json'
import commentsReducer from './commentsReducer.js'
import Comment from './components/Comment.jsx'
import { FormCard } from './components/Form.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const { currentUser } = commentsData
  const savedComments = JSON.parse(localStorage.getItem('comments') || null)
  const [comments, dispatch] = useImmerReducer(commentsReducer, savedComments || commentsData.comments)

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments))
  }, [comments])

  const addComment = (content) => {
    dispatch({
      type: 'ADD',
      payload: { content, currentUser }
    })
  }

  const updateComment = (id, content) => {
    dispatch({
      type: 'UPDATE',
      payload: { id, content }
    })
  }

  const deleteComment = (id) => {
    dispatch({
      type: 'DELETE',
      payload: { id }
    })
  }

  const replyComment = (id, parentId, content) => {
    dispatch({
      type: 'REPLY',
      payload: { id, parentId, content, currentUser }
    })
  }

  const voteComment = (id, isUpvote) => {
    dispatch({
      type: 'VOTE',
      payload: { id, isUpvote }
    })
  }

  return (
    <div className="bg-very-light-gray w-screen min-h-screen">
      <div className="m-auto p-4 max-w-2xl">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            updateComment={updateComment}
            deleteComment={deleteComment}
            replyComment={replyComment}
            voteComment={voteComment}
          />
        ))}
        <FormCard onSubmit={addComment} user={currentUser} />
        <Footer />
      </div>
    </div>
  )
}
export default App
