import styled from "styled-components";

export default function Balance({ balance, positive }) {

    return (
        <BalanceContainer>
            <article>
                <strong>Saldo</strong>
                <Value color={positive}>{balance}</Value>
            </article>
        </BalanceContainer>
    )
}

const BalanceContainer = styled.div`
`

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "true" ? "green" : "red")};
`