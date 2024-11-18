import useAuth from "../../hooks/useAuth"

const Overview = () => {
  const {user} = useAuth()

  return (
    <main className="">
      <h1>{user?.email}</h1>
      <p>{user?.role}</p>
      <p>{user?.status}</p>
    </main>
  )
}

export default Overview