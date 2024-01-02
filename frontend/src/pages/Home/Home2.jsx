import { useEffect } from 'react'
import useRefreshToken from '../../hooks/useRefreshToken'
import useAuth from '../../hooks/useAuth'
import Button from 'react-bootstrap/Button';

function Home2() {
   const refresh= useRefreshToken()
  const {auth}=useAuth()
  
  useEffect(() => {
    console.log(auth)
  }, [auth]);


  return (
    <div>
      <h1>Home 2</h1>    

      <Button onClick={()=>refresh()}>refresh</Button>
    
    
    </div>
  )
}

export default Home2
