import { useRef, useLayoutEffect } from 'react'

export default function Textarea(props) {
  const textareaRef = useRef({})
  
  useLayoutEffect(() => {
    textareaRef.current.style.height = 'auto'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    
  }, [props.value])

  return (
    <textarea
      ref={textareaRef}
      rows={3}
      placeholder="Add a comment..."
      className="w-full px-4 py-2 resize-none border border-light-gray
      rounded-md focus:border-moderate-blue focus:outline-none"
      {...props}
    />
  )
}