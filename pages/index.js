import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import { TopBar } from '../components/topbar';
import { Request, RequestAdmin, Blank } from '../components/requestPost'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
let socket;

const Container = styled.div`
  width: 100vw;
  max-height: 100vh;
`;
const MiddleAccordion = styled.div`
  background-color: white;
  max-width: 95vw;
  margin-left: 2.5vw;
  box-shadow: 0 0 10px 0 white;
`;
const RequestFormAccordion = styled.div`
  background-color: white;
  max-width: 95vw;
  margin-left: 2.5vw;
  box-shadow: 0 0 10px 0 white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const RequestFormWrapper = styled.div`
  overflow: hidden;
  transition: max-height 0.2s;
  padding: 0 15px;
`;
const Handle = styled.button`
  text-align: center;
  font-size: 25px;
  text-decoration: underline;
  height: 50px;
  padding: 5px;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  width: 65vw;
  margin-left: 15vw;
  border-radius: 25px;
`;
const FormInput = styled.input`
  height: 40px;
  border-radius: 20px;
  padding: 7.5px;
  border: solid 5px #ff96ca;
  outline: none;
  background-color: #1111;
  margin-bottom: 10px;

  &:focus {
    background-color: rgb(100,100,100,0.3)
  }
`;
const Top = styled.div`
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
  background-color: #FFB6C1;
  font-size: x-large;
  font-weight: bold;
  padding: 10px;
`;
const CountMove = styled.button`
  height: 75px;
  width: 75px;

  outline: none;
  border: none;
  border-radius: 20px;
  background-color: ${props => props.Color};
  font-size: 50px;
  padding: 0;
  margin-left: 10px;
  margin-right: 10px;
`;



export async function getServerSideProps() {
  const res0 = await fetch('http://localhost:8081/api/GetRequests?Who=Isa');
  const response0 = await res0.json();
  const res1 = await fetch('http://localhost:8081/api/GetRequests?Who=Joel');
  const response1 = await res1.json();
  
  const res2 = await fetch('http://localhost:8081/api/getFavorCount');
  const response2 = await res2.json();
  
  return { props: {
    Entries: response0.data.data,
    Requests: response1.data.data,
    Count: response2.data.data
  }}
}


function AccordionER(event) {
  let accordion = event.target.nextElementSibling;
  if (accordion.style.maxHeight == '0px') {
    accordion.style.maxHeight = `${accordion.scrollHeight}px`
    console.log('expanding')
  } else {
    accordion.style.maxHeight = `0px`
    console.log('retracting')
  }
}
function CountDown(event) {
  event.preventDefault()
  let Counter = document.getElementById('Counter')
  if (Number(Counter.innerText) > 0) {
    Counter.innerText = Number(Counter.innerText) - 1
  }
}
function CountUp(event) {
  event.preventDefault()
  let Counter = document.getElementById('Counter')

  Counter.innerText = Number(Counter.innerText) + 1
}

export default function Home({ Entries, Requests, Count }) {
  const router = useRouter()
  useEffect(() => {
    async function socketInitializer() {
      await fetch('/api/socket');
      socket = io()

      socket.on('connect', () => {
      console.log('connected')
      })

      socket.on('update-input', () => {
          router.replace(router.asPath)
      })
    }
    socketInitializer();
  }, [])

  async function RequestSend(event) {
    event.preventDefault();
    document.getElementById('RequestsAcc').click()
    if (Count[0].isa > 0) {
      fetch(`api/SendRequest?Request=${NewRequest.value}&Urgency=${NewUrgency.value}&Who=Joel`, {method: 'POST'})
      fetch(`api/FavorCountUpdate?Who=IsaFavorCount&Count=${(Count[0].isa)-1}`, {method: 'PATCH'})

      NewRequest.value = ''
      NewUrgency.value = ''
      socket.emit('ReloadEntries')
    }
  }
  async function SendFavor(event) {
    event.preventDefault()
    let Counter = Number(document.getElementById('Counter').innerText)
    fetch(`api/FavorCountUpdate?Who=JoelFavorCount&Count=${(Count[0].joel)+Counter}`, {method: 'PATCH'})

    document.getElementById('FavorsAcc').click()
    document.getElementById('Counter').innerText = 0
    socket.emit('ReloadEntries')
  }
  async function StatusChange(event) {
    let Status
    let Record = event.target.id.substring(1)
    let id = event.target.id.charAt(0)
    if (id == '1') { Status = 'To-Do' }
    else if (id == '2') { Status = 'In-Progress' }
    else if (id == '3') { Status = 'Done' }
    console.log(Status)
    
    await fetch(`api/StatusChange?Who=Isa&Status=${Status}&Record=${Record}`)
    socket.emit('ReloadEntries')
  }
  async function MarkAsDone(event) {
    event.preventDefault();
    let Record = event.target.id
    
    fetch(`api/RemoveRequest?Who=Joel&Record=${Record}`)
  }

  return (
    <Container>
      <img style={{objectFit: 'fill', zIndex: '-1000', maxHeight: '100vh', Width: '100vw', position: 'fixed', top: '0', left: '0'}} src={'bg.jpg'}></img>
      <Head>
        <title>Favor Swapper</title>
        <meta name="description" content="Merry X-Mas Isa :)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Top>
        <NameBar>— Isabella —</NameBar>
        <Box>Remaining <br/>Favors: {Count[0].isa}</Box>
        <div style={{height: '5vh'}}></div>
      </Top>

      <MiddleAccordion>
        <Handle onClick={AccordionER}>My Requests</Handle>
        <RequestFormWrapper style={{maxHeight: '0px'}}>
          <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            <div style={{height: '3vh'}}/>
            {Requests?.length === 0 ? (  <Blank Request={'No one has requested anything yet :)'}></Blank>
              ) : (
            Requests?.map( Entry => <RequestAdmin key={Entry.record} Request={Entry.text} Record={Entry.record} Urgency={Entry.time} MarkAsDone={MarkAsDone} StatusChange={StatusChange}></RequestAdmin> ))}
            <div style={{height: '3vh'}}/>
          </div>
        </RequestFormWrapper>
      </MiddleAccordion>

      <MiddleAccordion>
        <Handle onClick={AccordionER} id='FavorsAcc'>Send Favor points</Handle>
        <RequestFormWrapper style={{maxHeight: '0px'}}>
          <div>
            <div style={{height: '3vh'}}/>
            <form id='RequestSendForm' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}} onSubmit={SendFavor}>
              <CountMove onClick={CountDown} Color={'#ee0000'}>-</CountMove>
              <div style={{marginLeft: '5px', marginRight: '5px', fontSize: '50px'}} id='Counter'>0</div>
              <CountMove onClick={CountUp} Color={'#00ee00'}>+</CountMove>
              <div style={{flexBasis: '100%', height: '10px'}}/>
              <FormInput value={'Send!'} type={'submit'} style={{cursor: 'pointer'}}/>
            </form>
          </div>
        </RequestFormWrapper>
      </MiddleAccordion>

      <RequestFormAccordion>
        <Handle onClick={AccordionER} id='RequestsAcc'>Send Favor Request</Handle>
        <RequestFormWrapper style={{maxHeight: '0px'}}>
          <div>
            <div style={{height: '3vh'}}></div>
            <form onSubmit={RequestSend} id='RequestSendForm' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
              <label>Request: <FormInput id='NewRequest'></FormInput></label>
              <label>Urgency: <FormInput id='NewUrgency'></FormInput></label>
              <FormInput value={'Send!'} type={'submit'} style={{cursor: 'pointer'}}></FormInput>
            </form>
          </div>
        </RequestFormWrapper>
      </RequestFormAccordion>

      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        {Entries?.length === 0 ? (  <Blank Request={'No one has requested anything yet :)'}></Blank>
          ) : (
        Entries?.map( Entry => <Request key={Entry.record} Request={Entry.text} Record={Entry.record} Urgency={Entry.time} Status={Entry.status} StatusChange={StatusChange}></Request> ))}
      </div>
      
    </Container>
  )
}
