import { useState } from "react"
import Login from "./components/Login"

function App() {
  const [user, setUser] = useState(null)

  if (!user) {
    return (
      <div className="container text-center">
        <Login setUser={setUser} />
      </div>
    )
  }

  if (user) {
    return (
      <div className="containe text-center">
        <h1>Matikkapelit</h1>
        Logged in!
      </div>
    )
  }

}

export default App