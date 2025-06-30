import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [unique_id, setUniqueId] = useState('');
  const [number, setNumber] = useState('');
  const [call_date, setCallDate] = useState('');
  const [call_type, setCallType] = useState('');
  const [list, setList] = useState([]);

  const handleUniqueId = (event) => {
    setUniqueId(event.target.value);
  };

  const handleNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleCallDate = (event) => {
    setCallDate(event.target.value);
  };

  const handleCallType = (event) => {
    setCallType(event.target.value);
  }

  const send = () => {
    let body = {};
    body.unique_id = unique_id;
    body.number = number;
    body.call_date = call_date;
    body.call_type = call_type;
    axios.post('http://127.0.0.1:3001/api/call_start', body)
    .then((res) => {
      console.log(res);
      get();
    })
    .catch((err) => {
      console.log(err.message);
    });
    alert(unique_id + ' ' + number + ' ' + call_date + ' ' + call_type);
  };

  const get = () => {
    axios.get('http://127.0.0.1:3001/api/list')
    .then((res) => {
      console.log(res.data.list);
      setList(res.data.list);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  const open = () => {
    const socket = new WebSocket('ws://127.0.0.1:3002/foo');
    socket.addEventListener('open', event => {
      console.log('WebSocket connection established!');
      socket.send('Hello Server!');
    });

    socket.addEventListener('message', event => {
      console.log('Message from server: ', event.data);
    });
  };

  useEffect(() => {
    get();
  }, [""]);

  return (
    <div className="App">
      <div>Test text sample</div>
      <Box noValidate autoComplete="off">
        <TextField id="unique_id" value={unique_id} onChange={handleUniqueId} label="Код" variant="outlined" />
        <TextField id="number" value={number} onChange={handleNumber} label="Дугаар" variant="outlined" />
        <TextField id="call_date" value={call_date} onChange={handleCallDate} label="Огноо" variant="outlined" />
        <TextField id="call_type" value={call_type} onChange={handleCallType} label="Төрөл" variant="outlined" />
      </Box>
      <Box>
        <Button variant="contained" onClick={() => {send()}}>Бүртгэх</Button>
      </Box>
      <Box>
        <Button variant="contained" onClick={() => {open()}}>Холбогдох</Button>
      </Box>
      <Box>
        <table border="1">
         <thead>
          <tr>
            <th>Код</th>
            <th>Дугаар</th>
            <th>Огноо</th>
            <th>Төрөл</th>
          </tr>
         </thead>
         <tbody>
          {list.map(item => (
          <tr key={item._id}>
            <td>{item.unique_id}</td>
            <td>{item.number}</td>
            <td>{item.call_date}</td>
            <td>{item.call_type}</td>
          </tr>
          ))}
         </tbody>
        </table>
      </Box>
    </div>
  );
}

export default App;
