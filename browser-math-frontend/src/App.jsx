import { useEffect, useState } from "react"
import MainMenu from "./components/Mainmenu"
import { LOCALSTORAGE_USER, URL_MULTIPLICATION_GAME } from "./utils/constants"
import { Routes, Route } from 'react-router-dom'
import MultiplicationGame from "./components/MultiplicationGame"

function App() {
  const [user, setUser] = useState(null)

  // Check browser storage for login information
  useEffect(() => {
    const storedUser = localStorage.getItem(LOCALSTORAGE_USER)
    setUser(storedUser)
  }, [])

  return (
    <div className="container">
      <h1 className="text-center">Matikkapelit</h1>
      <Routes>
        <Route path='/' element={<MainMenu user={user} setUser={setUser} />} />
        <Route path={URL_MULTIPLICATION_GAME} element={<MultiplicationGame />} />
      </Routes>
    </div>
  )

}

export default App