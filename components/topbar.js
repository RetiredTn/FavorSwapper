import styled from 'styled-components'

const Container = styled.div`
  background-color: white;
  width: 95vw;
  height: 35vh;
  margin-top: 2.5vw;
  margin-left: 2.5vw;
  box-shadow: 0 0 10px 0 white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const NameBar = styled.p`
  text-align: center;
  font-size: 500%;
  font-family: PrettyFont;
  padding: 0;
  margin: 0;
`;
const Box = styled.div`
  border-radius: 10px;
  width: ${props => props.W || "70%"};
  height: ${props => props.H || "30%"};
  text-align: center;
  font-size: x-large;
  font-weight: bold;
  padding: 10px;
`;

export const TopBar = ({ children, Name, Favors}) => {
    return (
        <>
            <Container>
                <NameBar>{Name}</NameBar>
                <Box>Remaining <br/>Favors: {Favors}</Box>
                <div style={{height: '5vh'}}></div>
            </Container>
            {children}
        </>
    )
}