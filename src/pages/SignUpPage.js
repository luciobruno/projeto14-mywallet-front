import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")
  const navigate = useNavigate()

  function signUp(event) {
    event.preventDefault()

    if (password !== confirmedPassword) {
      return alert("Senhas não correspodentes")
    }

    const promisse = axios.post(`${process.env.REACT_APP_API_URL}/sign-up`,{
      name:name,
      email:email,
      password:password
    })

    promisse.then((res)=>{navigate("/")})
    promisse.catch((err)=>{
      alert("Todos os campos são obrigatórios")
    })

  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" autocomplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
