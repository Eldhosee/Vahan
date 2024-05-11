import React, { useEffect, useState } from 'react'

import { Grid, Button, Typography, TextField, Stack, Box, Alert, } from '@mui/material';
import image from "../assets/img1.svg"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GoArrowLeft } from "react-icons/go";
import { add, update } from '../Components/api';
import Loader from '../Components/Loader';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
const Form = () => {
  dayjs.extend(utc)
  dayjs().format()
  const [info, setInfo] = useState({
    "name": '',
    "email": '',
    "mobileNumber": "",
    "dateOfBirth": ""


  })
  const location = useLocation();
  const data = location.state?.data || {};
  const [editData, setEditData] = useState({})
  const [mssg, setMssg] = useState('')
  const [loading, setLoading] = useState(false)
  const handleDate = (date) => {
    setInfo(prev => ({
      ...prev,
      "dateOfBirth": date
    }));
  }

  const handleChange = (e) => {
    if (data.email) {
      console.log("edit change")
      setEditData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    }
    else {
      setInfo(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    }

  }
  const handleEdit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("entered");
    setEditData(prev => ({
      ...prev,
      "email": editData.email
    }))
    console.log(editData)
    const response = await update(editData)
    if (response) {
      setMssg('data edited successfully')
    }
    setTimeout(() => {
      setMssg('');
    }, 10000);

    setLoading(false);
  };
  const handleSubmit = (e) => {
    if (data.email) {
      console.log("edit")
      handleEdit(e); // If editData exists, execute handleEdit
    } else {
      setLoading(true)
      e.preventDefault()
      console.log(info)
      const response = add(info)
      console.log(response)
      setLoading(false)
      if (response) {
        setMssg('New data have being added successfully')
      }
      setTimeout(() => {
        setMssg('');
      }, 10000);

    }

  }
  useEffect(() => {
    if (data) {

      setEditData(data);

    }
  }, []);
  return (
    <>
      <Box mt={4} ml={1} sx={{ display: 'flex' }}>
        <GoArrowLeft />
        &nbsp;
        <a href='/'>Back</a>
      </Box>
      {mssg.length > 0 && (
        <Box mb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Alert severity="success">{mssg}</Alert>
        </Box>
      )}

      <Grid container spacing={0} height='100vh' overflow={'hidden'}>

        <Grid item xs={12} lg={6} >
          <form onSubmit={handleSubmit}>
            <Stack gap={2}

              sx={{
                height: '100%',
                display: 'flex',

                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {editData.email ? <Typography variant='h4' fontWeight={700} mb={3} mt={3} >Edit Your info </Typography> :
                <Typography variant='h4' fontWeight={700} mb={3} mt={3} >Add new info</Typography>}

              <Stack >

                <Typography
                  variant='subtitle2'
                  fontWeight={550}

                  sx={{
                    margin: '10px',
                    color: 'rgb(0, 0, 0,0.7)'


                  }}
                >Name</Typography>
                <TextField
                  required
                  defaultValue={data.name && data.name}

                  id="outlined-basic"
                  label="john"
                  variant="outlined"
                  name='name'
                  onChange={handleChange}
                  sx={{
                    width: {
                      lg: '400px',
                      md: '400px',
                      xs: '320px'


                    },
                    [`& fieldset`]: {
                      borderRadius: '10px'
                    }
                  }}
                />
              </Stack>
              <Stack>
                <Typography
                  variant='subtitle2'
                  fontWeight={550}

                  sx={{
                    margin: '10px',
                    color: 'rgb(0, 0, 0,0.7)'


                  }}

                >Email address</Typography>
                <TextField id="outlined-basic" name='email' type='email'
                  required
                  defaultValue={data.email && data.email}

                  disabled={!!data.email}
                  onChange={handleChange} label='john.doe@gmail.com' variant="outlined" sx={{

                    width: {
                      lg: '400px',
                      md: '400px',
                      xs: '320px'


                    },
                    [`& fieldset`]: {
                      borderRadius: '10px'
                    }
                  }} />
              </Stack>
              <Stack >

                <Typography
                  variant='subtitle2'
                  fontWeight={550}

                  sx={{
                    margin: '10px',
                    color: 'rgb(0, 0, 0,0.7)'


                  }}
                >Phone Number</Typography>
                <TextField
                  required
                  id="outlined-basic"
                  label="123456789"
                  variant="outlined"
                  name='mobileNumber'
                  type='number'
                  defaultValue={data.mobileNumber ? data.mobileNumber : ""}

                  onChange={handleChange}
                  sx={{
                    width: {
                      lg: '400px',
                      md: '400px',
                      xs: '320px'


                    },
                    [`& fieldset`]: {
                      borderRadius: '10px'
                    }
                  }}
                />
              </Stack>
              <Stack >
                <Typography
                  variant='subtitle2'
                  fontWeight={550}


                  sx={{
                    margin: '10px',
                    color: 'rgb(0, 0, 0,0.7)'


                  }}
                >Date of Birth</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                  <DatePicker label="Basic date picker" onChange={handleDate}
                    name='dateOfBirth'
                    defaultValue={data.dateOfBirth ? dayjs.utc(data.dateOfBirth) : null}
                    format="DD-MM-YYYY"
                    sx={{
                      width: {
                        lg: '400px',
                        md: '400px',
                        xs: '320px'
                      },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px'
                      }
                    }} />





                </LocalizationProvider>

              </Stack>

              {loading ? <Loader /> :
                <Button variant="contained" color='primary' type='submit' sx={{
                  width: {
                    lg: '400px',
                    md: '400px',
                    xs: '320px'


                  }, height: '50px',
                  [`& fieldset`]: {
                    borderRadius: '10px'
                  }

                }}

                >Submit</Button>

              }

            </Stack>
          </form>

        </Grid>

        {/* Right side with the image taking full height and width */}
        <Grid item xs={false} sm={6} sx={{ display: { xs: 'none', lg: 'block' }, padding: '10%' }}>
          <img src={image} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
        </Grid>
      </Grid>
    </>
  )
}

export default Form