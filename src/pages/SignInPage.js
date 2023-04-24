import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useState, useEffect } from "react"
import useAuthorization from "../hooks/useAuthorization"

export default function SignInPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { authorization, login } = useAuthorization()

  useEffect(()=>{
    if(authorization && authorization.token){
      navigate("/home")
    }
  },[])
  function signIn(event) {
    event.preventDefault()

    const promisse = axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, {
      email: email,
      password: password
    })

    promisse.then((res) => {
      login(res.data)
      navigate("/home")
    })
    promisse.catch((err) => {
      console.log(err.message)
    })

  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" autocomplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
