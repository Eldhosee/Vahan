import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
const Loader = () => {
  return (
    <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#0000FF"
  radius="9"
  ariaLabel="three-dots-loading"
  
  />
  )
}

export default Loader