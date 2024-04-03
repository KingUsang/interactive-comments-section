import { useState } from 'react'
import Textarea from './Textarea.jsx'
import Avatar from './Avatar.jsx'

export function CommentForm({ onSubmit, content = '', btnText = 'SEND',
  className = '' }) {
  const [commentInput, setCommentInput] = useState(content)

  const handleSubmitWrapper = (e) => {
    e.preventDefault()
    onSubmit(commentInput)
    setCommentInput('')
  }
  return (
    <form
      className={"flex flex-col items-end gap-4 " + className}
      onSubmit={handleSubmitWrapper}
    >
      <Textarea
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        required
      />
      <button className="text-md px-4 py-2 font-medium bg-moderate-blue text-white rounded-md">
        {btnText}
      </button>
    </form>
  )
}

export function FormCard({ user, onSubmit, btnText }) {
  return (
    <div className="bg-white my-6 p-4 rounded-lg relative md:flex">
      <div className="absolute left-4 p-2 bottom-4 md:static md:py-0">
        <Avatar user={user} />
      </div>
      <div className="flex-1">
        <CommentForm
          className="md:flex-row md:items-start"
          onSubmit={onSubmit}
          btnText={btnText}
        />
      </div>
    </div>
  )
}