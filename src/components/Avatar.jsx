export default function Avatar({ user }) {
  return (
    <img
      src={user.image.png}
      alt={'photo of ' + user.username}
      className="w-7"
    />
  )
}