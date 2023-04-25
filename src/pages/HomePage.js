import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import useAuthorization from "../hooks/useAuthorization"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ListItem from "../components/ListItem"
import Balance from "../components/Balance"

export default function HomePage() {

  const { authorization, login } = useAuthorization()
  const navigate = useNavigate()
  const [dados, setDados] = useState([])
  const [balance, setBalance] = useState("")
  const [positive, setPositive] = useState("positive")

  useEffect(() => {
    if (!authorization.token) {
      return navigate("/")
    }

    const url = `${process.env.REACT_APP_API_URL}/transactions`

    const config = {
      headers: {
        "Authorization": `Bearer ${authorization.token}`
      }
    }

    const promisse = axios.get(url, config)

    promisse.then((res) => {
      setDados(res.data)
      let valor = 0
      dados.map((dado)=>{
        if(dado.type === "input"){
          valor = valor+dado.value
        }else{
          valor = valor-dado.value
        }
      })

      setPositive("true")

      if(valor<0){
        valor=valor*(-1)
        setPositive("false")
      }
      setBalance(valor)
    })
    promisse.catch((err) => {
      console.log(err.response.data)
    })

  }, [dados])

  function newTransaction(type) {
    navigate(`/nova-transacao/${type}`)
  }

  function logout() {
    login("")
    navigate("/")
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {authorization.name}</h1>
        <BiExit onClick={logout}></BiExit>
      </Header>

      <TransactionsContainer>
        <ul>
          {dados.map((dado, index) => <ListItem key={index} date={dado.date} value={dado.value} description={dado.description} type={dado.type}></ListItem>)}
        </ul>

        <Balance balance={balance} positive={positive}></Balance>
      </TransactionsContainer>

      <ButtonsContainer>
        <button onClick={() => { newTransaction("input") }}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => { newTransaction("output") }}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`