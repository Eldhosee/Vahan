import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Box, Button, Typography } from '@mui/material';
import { read, remove } from '../Components/api';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



 const Tableui=()=> {
  const [data,setData]=useState([])
  const [mssg,setMssg]=useState('')
  const navigate=useNavigate()
  const fetchData = async () => {
    try {
      const response = await read();
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const removedata=async(data)=>{
    try {
      console.log(data)
      const response=await remove(data)
      if (response.data){
        console.log("deleted")
        setMssg('data deleted successfully')
        fetchData()
        setTimeout(() => {
          setMssg('');
        }, 1000); 
      

      }
    } catch (error) {
      
    }
  }
  const editData=(data)=>{
    navigate('/add', { state: { data } })
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <>
    <Typography variant='h4' fontWeight={700} mb={5} mt={5} sx={{
      display:'flex',
      justifyContent:'center'
    }}>Added Informations </Typography>
    <Box sx={{
      display:'flex',
      justifyContent:'center'
    }}><a href='/add' >Add new data</a></Box>
    
    {mssg.length > 0 && (
        <Box mb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Alert severity="success">{mssg}</Alert>
        </Box>
      )}
    <Box sx={{padding:'20px'}}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h4>Email</h4></TableCell>
            <TableCell align="center"><h4>Name</h4></TableCell>
            <TableCell align="center"><h4>Phone</h4></TableCell>
            <TableCell align="center"><h4>Date of Birth</h4></TableCell>
            <TableCell align="center"><h4>Actions</h4></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow
              key={data.email}
             
            >
              <TableCell component="th" scope="row">
                {data.email}
              </TableCell>
              <TableCell align="center">{data.name}</TableCell>
              <TableCell align="center">{data.mobileNumber}</TableCell>
              <TableCell align="center">{data.dateOfBirth}</TableCell>
              <TableCell align="center"><Button
              onClick={()=>{
                editData(data)
              }}
              sx={{
                color: 'blue',
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'darkblue'
                }
              }}
              >Edit</Button> &nbsp;<Button onClick={()=>removedata(data.email)} sx={{
                color: 'red',
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'darkred'
                }
              }}>Delete</Button></TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </>
  );
}

export default Tableui