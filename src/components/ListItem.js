import styled from "styled-components";

export default function ListItem({ date, value, description, type }) {

  let number = value.toString()

  if(number.includes(".")===true){
    number = number.replace(".",",")
  }

  return (
    <ListItemContainer>
      <div>
        <span>{date}</span>
        <strong>{description}</strong>
      </div>
      <Value type={type}>{number}</Value>
    </ListItemContainer>

  )
}

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.type === "input" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`