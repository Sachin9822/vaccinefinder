import axios from "axios";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ItmemsGrid from "./ItemsGrid";
import "./App.css";
import { auth, provider } from "./Firebase";
import { Avatar, Button } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { Tooltip } from "react-lightweight-tooltip";

const Main = () => {
  const [user] = useAuthState(auth);
  const [vaccinedata, setvaccinedata] = useState([]);
  const [pincode, getpincode] = useState("");
  const [date, getdate] = useState("");
  const [agefilter, getagefilter] = useState(false);
  const [age, setage] = useState(1);

  const HSignIn = () => {
    auth.signInWithPopup(provider);
  };
  const HSignout = () => {
    auth.signOut();
  };
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
    getdate(formatDate(Date()));

    if (pincode && date) {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${
            pincode ? pincode : 0
          }&date=${date}`
        )
        .then((res) => setvaccinedata(res.data.centers));
    }
  }, [pincode, date]);

  return (
    <Container className="Main">
      <HeaderContainer>
        <HeaderContent>
          <Header>Vaccine Finder</Header>
          {/* {user ? (
            <HeaderRight>
              <Tooltip content={["Log Out"]}>
                <HeaderAvatar src={user.photoURL} onClick={HSignout} />
              </Tooltip>
              <HeaderName>
                <strong>
                  Hello <br />
                </strong>
                {user.displayName}
              </HeaderName>
            </HeaderRight>
          ) : (
            <LoginButton onClick={HSignIn}>Login</LoginButton>
          )} */}
        </HeaderContent>

        <Input
          type="number"
          placeholder="Enter your pincode"
          onChange={(e) =>
            e.target.value.length > 5 ? getpincode(e.target.value) : undefined
          }
        ></Input>
        <ButtonContainer>
          <div>
            <FilterButton onClick={() => getagefilter(false)}>All</FilterButton>
            <FilterButton
              onClick={() => {
                getagefilter(true);
                setage(18);
              }}
            >
              18+
            </FilterButton>
            <FilterButton
              onClick={() => {
                getagefilter(true);
                setage(45);
              }}
            >
              45+
            </FilterButton>
          </div>
        </ButtonContainer>
      </HeaderContainer>

      <MainContainer>
        {vaccinedata.map((d) =>
          d.sessions.map((d1) =>
            agefilter ? (
              d1.min_age_limit === age ? (
                <ItmemsGrid
                  user={user?.uid}
                  id={d.center_id}
                  date={d1.date}
                  name={d.name}
                  age_limit={d1.min_age_limit}
                  available_1={d1.available_capacity_dose1}
                  available_2={d1.available_capacity_dose2}
                />
              ) : undefined
            ) : (
              <ItmemsGrid
                user={user?.uid}
                id={d.center_id}
                date={d1.date}
                name={d.name}
                age_limit={d1.min_age_limit}
                available_1={d1.available_capacity_dose1}
                available_2={d1.available_capacity_dose2}
              />
            )
          )
        )}
      </MainContainer>
    </Container>
  );
};

export default Main;

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

const LoginButton = styled(Button)`
  &&& {
    color: black;
    margin-right: 30px;
    font-weight: bold;
    border-radius: 20px;
    background-color: #ffffff;
  }
`;
const FilterButton = styled(Button)`
  &&& {
    color: white;
    margin: 10px;
    &:focus {
      background-color: white;
      color: black;
    }
  }
`;
const ButtonContainer = styled.div`
  height: 50px;
  @media (max-width: 768px) {
    margin-right: 15px;
  }
`;
const HeaderName = styled.p`
  color: white;
  margin-right: 50px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const HeaderAvatar = styled(Avatar)`
  right: 10px;
  @media (max-width: 768px) {
    right: 50px;
  }
`;
const Container = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeaderRight = styled.div`
  display: flex;
`;
const HeaderContainer = styled.div`
  top: 0;
  left: 3px;
  display: flex;
  flex-direction: column;
  left: auto;
  right: auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #111111;
  z-index: 1;
  padding: 20px;
  height: 120px;
  position: fixed;
`;

const Header = styled.h1`
  color: white;
  padding: 20px;
  margin-right: auto;
  animation: ${rotate} 1s 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
const Input = styled.input`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  z-index: 1;
  border-radius: 10px;
  padding: 5px;
  animation: ${arrive} 1s 1;

  outline: none;
  @media (max-width: 768px) {
    width: 120px;
    left: -17px;
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

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
