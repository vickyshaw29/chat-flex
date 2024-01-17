import { getServerSession } from 'next-auth'
import React from 'react'

const RegisterPage = async() => {
  const session = await getServerSession();
  
  return (
    <div>RegisterPage</div>
  )
}

export default RegisterPage