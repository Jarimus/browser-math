import { Button, Form } from 'react-bootstrap'

const Login = ({ setUser }) => {

  const handleLogin = (e) => {
    e.preventDefault()
    setUser(e.target.username.value)
  }

  return (
    <>
      <h1>Matikkapelit</h1>
      <Form onSubmit={handleLogin}>
        <label htmlFor="username">
          <input id='username' type="text" />
        </label>
        <Button type='submit'>Login</Button>
      </Form>
    </>
  )

}

export default Login