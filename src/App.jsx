import { useState } from 'react'
import FormClientPage from './components/FormClient/pages/FormClientPage'
import TableAllPage from './components/TableHistory/page/TableAllPage'

function App() {
  const [count, setCount] = useState(0)

  return (
     <>
     {/* <FormClientPage/>  */}
      <TableAllPage/> 
    </>
  )
}

export default App
