"use "
import { useState, useEffect } from 'react'
export default function UserWaintingApproval() {

    const [data, setData] = useState(null)
    
   
    useEffect(() => {
      fetch('/api/users')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
        })
    }, [])

  return (
    <div> <p>{data?.map((userdata) => {return <p key={userdata.userId}>{userdata.userEmail}</p> } )} </p> </div>
  )
}
