import axios from "axios";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import "./App.css";

function App() {
  const [vaccinedata, setvaccinedata] = useState([]);
  const [pincode, getpincode] = useState("");
  const [date, getdate] = useState("");
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  }

  useEffect(() => {
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${
          pincode ? pincode : 0
        }&date=${date}`
      )
      .then((res) => setvaccinedata(res.data.centers));

    getdate(formatDate(Date()));
  }, [pincode, date]);
  return (
    <Container className="App">
      <HeaderContainer>
        <Header>Vaccine Finder</Header>
        <Input
          type="number"
          placeholder="Enter your pincode"
          onChange={(e) =>
            e.target.value.length > 5 ? getpincode(e.target.value) : undefined
          }
        ></Input>
      </HeaderContainer>

      <MainContainer>
        {vaccinedata.map((d) =>
          d.sessions.map((d1) => (
            <ItemsContainer>
              <span>{d1.date}</span>
              <h3>{d.name}</h3> <p>{d1.min_age_limit}+</p>
              {d1.available_capacity_dose1 === 0 ? (
                <Redp>{d1.available_capacity_dose1}</Redp>
              ) : (
                <Greenp>available: {d1.available_capacity_dose1} </Greenp>
              )}
            </ItemsContainer>
          ))
        )}
      </MainContainer>
    </Container>
  );
}

export default App;

const come = keyframes`
  from {
    transform: translate(-1000px,-1000px);
    /* margin-right: 100px; */
  }
  to {
    transform: translate(0,0);
  }
`;

const arrive = keyframes`
from {
  transform: translate(0,-100px);
}
to {
transform: translate(0,0);
}
`;

const rotate = keyframes`
 from {
   transform: translate(100px);
 }
 to {
   
 }
`;

const Container = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const HeaderContainer = styled.div`
  top: 0;
  left: 3px;
  display: flex;
  flex-direction: column;
  left: auto;
  right: auto;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #111111;
  z-index: 1;
  padding: 20px;
  height: 100px;
  position: fixed;
`;

const Header = styled.h1`
  color: white;
  padding: 20px;
  margin-right: auto;
  animation: ${rotate} 1s 1;
`;
const Input = styled.input`
  position: relative;
  top: 0;
  z-index: 1;
  border-radius: 10px;
  padding: 5px;
  animation: ${arrive} 1s 1;
  margin: auto;

  outline: none;
`;

const Redp = styled.p`
  color: red;
`;

const Greenp = styled.p`
  color: #06c906;
`;

const ItemsContainer = styled.div`
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
  cursor: pointer;
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

const MainContainer = styled.div`
  float: left;
  justify-content: center;
  background-color: black;
  margin-top: 160px;
  height: 100%;
  min-height: 100vh;
  min-width: 200px;
  max-width: 100%;
  align-items: center;
  padding: 20px;
`;
