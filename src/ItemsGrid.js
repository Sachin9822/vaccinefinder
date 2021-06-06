import { Button } from "@material-ui/core";
import styled, { keyframes } from "styled-components";
// import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
// import { db } from "./Firebase";

const ItmemsGrid = ({
  user,
  id,
  date,
  name,
  age_limit,
  available_1,
  available_2,
}) => {
  // const notification = () => {
  //   db.collection("users").doc(user).collection("center_id").add({
  //     id: id,
  //   });
  // };
  return (
    <ItemsContainer key={id}>
      {/* <RNotificationsIcon onClick={notification} /> */}
      <span>{date}</span>
      <h3>{name}</h3> <p>{age_limit}+</p>
      {available_1 === 0 ? (
        <Redp> dose 1: {available_1}</Redp>
      ) : (
        <Greenp> dose 1: {available_1} </Greenp>
      )}
      {available_2 === 0 ? (
        <Redp> dose 2: {available_2}</Redp>
      ) : (
        <Greenp> dose 2: {available_2} </Greenp>
      )}
      {available_2 !== 0 || available_1 !== 0 ? (
        <ItemButton href="https://selfregistration.cowin.gov.in/">
          Book now
        </ItemButton>
      ) : undefined}
    </ItemsContainer>
  );
};

export default ItmemsGrid;

const come = keyframes`
  from {
    transform: translate(-1000px,-1000px);
    /* margin-right: 100px; */
  }
  to {
    transform: translate(0,0);
  }
`;

// const RNotificationsIcon = styled(NotificationsActiveIcon)`
//   color: red;
//   &:active {
//     color: green;
//   }
// `;

const ItemButton = styled(Button)`
  &&& {
    color: white;
    padding: 5px;
    background-color: green;
    margin: 10px;
  }
`;

const ItemsContainer = styled.div`
  text-decoration: none;
  position: relative;
  animation: ${come} 0.5s 1;
  background-color: #1a1a1a;
  color: white;
  display: flex;
  flex-direction: column;
  float: left;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 10px;
  width: 158px;

  height: 200px;
  border-radius: 10px;
  transition-duration: 0.7s;

  &:hover {
    transform: scale(1.3);
  }
  &span {
    margin-bottom: 10px;
  }
`;
const Redp = styled.p`
  color: red;
`;

const Greenp = styled.p`
  color: #06c906;
`;
