import { useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import useAuthorization from "../hooks/useAuthorization"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function TransactionsPage() {

  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  const { tipo } = useParams()
  const { authorization } = useAuthorization()
  const navigate = useNavigate()

  function newTransaction(event) {
    event.preventDefault()

    let number = value.replace(",", ".")
    number = parseFloat(number)
    number = number * 100

    const url = `${process.env.REACT_APP_API_URL}/new-transaction/${tipo}`

    const body = {
      value: number,
      description: description
    }
    const config = {
      headers: {
        "Authorization": `Bearer ${authorization.token}`
      }
    }

    const promisse = axios.post(url, body, config)

    promisse.then(() => {
      navigate("/home")
    })

    promisse.catch((err) => {
      alert("Todos os campos são obrigatórios")
    })

  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={newTransaction}>
        <input placeholder="Valor" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <input placeholder="Descrição" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
