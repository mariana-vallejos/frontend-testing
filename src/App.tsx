import './App.css'
import { Toggle } from './components/toggle/Toggle'
import UserGreeting from './components/UserGreeting/UserGreeting'

function App() {


  return (
    <>
      <Toggle/>
      <UserGreeting onGreet={() => {console.log('hi')}} userId='123'/>
    </>
  )
}

export default App
