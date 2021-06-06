import styled from "styled-components";

const Loading = () => {
  return (
    <Container>
      <LoadingGIF src="https://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif" />
    </Container>
  );
};

export default Loading;

const LoadingGIF = styled.img`
  @media (max-width: 768px) {
    height: 100%;
    padding-bottom: 50px;
    width: 100%;
  }
`;

const Container = styled.div`
  height: 100vh;
  background-color: black;
  display: grid;
  justify-content: center;
  width: 100vw;
`;
