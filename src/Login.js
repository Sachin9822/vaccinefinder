import styled, { keyframes } from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from "./Firebase";

const Login = () => {
  const HSignIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Container>
      <LoginContainer>
        <LoginLogo src="https://www.health.gov.au/sites/default/files/covid-19-vaccine-eligibility-checker.png" />
        <LoginText>Vaccine Finder</LoginText>
        <LogoButton variant="outlined" onClick={HSignIn}>
          <Googleimg src="https://img.pngio.com/google-logo-icon-png-transparent-backgroundpng-google-logo-transparent-background-png-1000_1000.png" />
          Sign In with Google
        </LogoButton>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const loading = keyframes`
  from {
    transform: translate(0,-200px)
  }
`;
const entry = keyframes`
from {
  transform: scale(0.5)
}
to {
  transform: scale(1);
}
`;

const Googleimg = styled.img`
  height: 18px;
  width: 18px;
  margin: 5px;
`;
const LogoButton = styled(Button)`
  color: white !important;
  border: 1px solid whitesmoke !important;
  margin-top: 100px !important;
  width: 250px;
`;
const LoginText = styled.h2`
  animation: ${entry} 1s 1;
  color: white;
  text-align: center;
  font-size: 26px;
`;
const Container = styled.div`
  background-color: black;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    height: 100vh;
    width: 100%;
  }
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #131313;
  padding: 70px;
  border-radius: 20px;
  @media (max-width: 768px) {
    padding: 15px;
    border-radius: 20px;
  }
`;
const LoginLogo = styled.img`
  width: 350px;
  animation: ${loading} 1s 1;
  height: 200px;
  @media (max-width: 768px) {
    width: 200px;
    height: 120px;
    margin: 20px;
  }
`;
