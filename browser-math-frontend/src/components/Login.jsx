import { Button, Form } from 'react-bootstrap'
import { LOCALSTORAGE_USER } from '../utils/constants'

const Login = ({ setUser }) => {

  const handleLogin = (e) => {
    const newUser = e.target.username.value
    e.preventDefault()
    setUser(newUser)
    localStorage.setItem(LOCALSTORAGE_USER, newUser)
  }

  return (
    <div className='text-center'>
      <Form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'> <span>Nimimerkki: </span>
            <input id='username' type="text" />
          </label>
        </div>
        <Button type='submit' style={{ margin: '0.5rem 0'}}>Kirjaudu</Button>
      </Form>
    </div>
  )

}

export default Login