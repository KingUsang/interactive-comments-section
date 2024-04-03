import { useState } from "react"
import Avatar from "./Avatar.jsx"
import { FormCard } from './Form.jsx'
import CommentCard from './CommentCard.jsx'
import DeleteModal from './DeleteModal.jsx'

export default function Comment(props) {
  const [isReplying, setIsReplying] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { comment } = props
  const isUserComment = props.currentUser.username === comment.user.username

  return (
    <div>
      <CommentCard
        comment={comment}
        isUserComment={isUserComment}
        onDelete={() => setShowDeleteModal(true)}
        onReply={() => setIsReplying(true)}
        voteComment={props.voteComment}
        updateComment={props.updateComment}
      />
      {isReplying && (
        <FormCard
          onSubmit={(content) => {
            props.replyComment(comment.id, props.parentId, content)
            setIsReplying(!isReplying)
          }}
          user={props.currentUser}
          btnText='REPLY'
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onDelete={() => {
            props.deleteComment(comment.id)
            setShowDeleteModal(false)
          }}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
      <div className="border-l-2 border-light-gray pl-4 md:ml-8 md:pl-8">
        {comment.replies?.map(reply => (
          <Comment
            key={reply.id}
            {...props}
            comment={reply}
            parentId={comment.id}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div>
      <div className="bg-white m-2 p-4">
        <CommentHeader comment={comment} isUserComment={isUserComment} />
        {editingContent ? (
          <>
            <Textarea
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
            />
            <button onClick={handleUpdateComment}>Update</button>
          </>
        ) : (
          <p>
            {comment.replyingTo && <span>@{comment.replyingTo}</span>}
            {comment.content}
          </p>
        )}
        <CommentActions
          isUserComment={isUserComment}
          onEdit={() => setEditingContent(comment.content)}
          onDelete={() => setShowDeleteModal(true)}
          onReply={() => setIsReplying(true)}
          voteComment={props.voteComment}
        />
      </div>
      {isReplying && (
        <CommentForm
          onSubmit={(content) => {
            props.replyComment(comment.id, props.parentId, content)
            setIsReplying(!isReplying)
          }}
        />
      )}
      <div id="replies">
        {comment.replies?.map(reply => (
          <Comment
            key={reply.id}
            {...props}
            comment={reply}
            parentId={comment.id}
            isUserComment={true}
          />
        ))}
      </div>
    </div>
  )
}