import { useState } from 'react'
import FormClientPage from './components/FormClient/pages/FormClientPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <FormClientPage/>
    </>
  )
}

export default App
