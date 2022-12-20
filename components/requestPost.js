import styled from 'styled-components'
import { useEffect } from 'react';

const Container = styled.div`
    background-color: white;
    width: 80vw;
    height: fit-content;
    margin-top: 2.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    border: solid 5px #ff96ca;
`;
const Radio = styled.input.attrs({ type: "radio", name: 'Status' })`
    accent-color: ${props => props.Color};
`;
const MarkAsDoneButton = styled.button`
    height: 50px;
    width: 150px;
    outline: none;
    border: none;
    background-color: lightblue;
    border-radius: 20px;
    font-size: 20px;
`;


export const Request = ({ children, Request, Record, Urgency, Status, StatusChange }) => {
    useEffect(() => {

        function setStatus() {
            let TodoCheck = document.getElementById(`1${Record}`);
            let DoingCheck = document.getElementById(`2${Record}`);
            let DoneCheck = document.getElementById(`3${Record}`);
            if (Status == 'To-Do') {
                TodoCheck.checked = true;
            } else if (Status == 'In-Progress') {
                DoingCheck.checked = true;
            } else if (Status == 'Done') {
                DoneCheck.checked = true;
            }
        }
        setStatus()
    })

    return (
        <>
            <Container key={Record}>
                <p>{Request}</p>
                <p>{`Urgency: ${Urgency}`}</p>
                <hr style={{width: '90%'}}></hr>
                <div style={{display: 'flex', flexDirection: 'row', columnGap: '30px', marginBottom: '20px'}}>
                    <label style={{display: 'flex', flexDirection: 'column'}}>
                        <div>To-Do</div>
                        <Radio Color={'red'} id={`1${Record}`} onClick={StatusChange}/>
                    </label>
                    <label style={{display: 'flex', flexDirection: 'column'}}>
                        <div>In Progress</div>
                        <Radio Color={'orange'} id={`2${Record}`} onClick={StatusChange}/>
                    </label>
                    <label style={{display: 'flex', flexDirection: 'column'}}>
                        <div>Done</div>
                        <Radio Color={'green'} id={`3${Record}`} onClick={StatusChange}/>
                    </label>             </div>
            </Container>
            {children}
        </>
    )
}

export const RequestAdmin = ({ children, Request, Record, Urgency, MarkAsDone }) => {
    return (
        <>
            <Container key={Record}>
                <p>{Request}</p>
                <p>{`Urgency: ${Urgency}`}</p>
                <hr style={{width: '90%'}}></hr>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
                    <MarkAsDoneButton onClick={MarkAsDone} id={Record}>Mark as Done</MarkAsDoneButton>
                </div>
            </Container>
            {children}
        </>
    )
}

export const Blank = ({ children, Request, Color }) => {
    return (
        <>
            <Container>
                <p style={{color: Color}}>{Request}</p>
            </Container>
            {children}
        </>
    )
}