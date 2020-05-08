import React from 'react'
import Login from './component/screen/Login'
import HomeAdmin from './component/screen/HomeAdmin'
import HomeUser from './component/screen/HomeUser'
import ClassDetail from './component/screen/class/ClassDetail'
import RegisterAccount from './component/screen/RegisterAccount'
import LoginAdmin from './component/screen/LoginAdmin'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import { nameScreen } from './component/screen/TextNameScreen'
class App extends React.Component {

  render() {
    
    return (
      <div>
        <Router>
          <Route exact path="/" component={Login}>
            {/* <Login /> */}
          </Route>
          <Route path="/LoginAdmin" component={LoginAdmin}>
            {/* <LoginAdmin /> */}
          </Route>
          <Route path="/RegisterAccount" component={RegisterAccount}>
          </Route>
          <Route path="/Home" component={HomeUser}>
            {/* <HomeUser /> */}
          </Route>
          <Route path="/HomeAdmin" component={HomeAdmin}>
            {/* <HomeAdmin /> */}
          </Route>
          <Route path="/ClassDetail/:id" component={ClassDetail}>
            {/* <HomeAdmin /> */}
          </Route>


        </Router>
      </div>
    )

  }
}
export default App;