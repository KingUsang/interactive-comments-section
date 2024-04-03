export default function commemtsReducer(commentsDraft, action) {
  const { type, payload } = action
  const findComment = (id) => {
    for (let comment of commentsDraft) {
      if (comment.id === id) return comment
      const reply = comment.replies.find((reply) => reply.id === id)
      if(reply) return reply
    }
  }

  const createComment = (content, user) => ({
    id: "comment_" + Math.random(),
    content,
    createdAt: "just now",
    score: 0,
    user,
  })
  
  switch (type) {
    case 'ADD': {
      commentsDraft.push(createComment(payload.content, payload.currentUser))
      break
    }
    case 'UPDATE': {
      const comment = findComment(payload.id)
      comment.content = payload.content
      break
    }
    case 'DELETE': {
      const comment = findComment(payload.id)
      comment.isDeleted = true
      break
    }
    case 'REPLY': {
      const commentToReply = findComment(payload.id)
      const newReply = createComment(payload.content, payload.currentUser)
      newReply.replyingTo = commentToReply.user.username
      const repliesArr = (payload.parentId ? findComment(payload.parentId) :
        commentToReply).replies
      repliesArr.push(newReply)
      break
    }
    case 'VOTE': {
      const comment = findComment(payload.id)
      payload.isUpvote ? comment.score++ : comment.score--
      break
    }
    default : 
      throw new Error(`An Error Occured with type of ${action.type}`)
  }
}