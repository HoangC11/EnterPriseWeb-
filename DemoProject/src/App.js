import React from 'react'
import Login from './component/screen/Login'
import HomeAdmin from './component/screen/HomeAdmin'
import HomeUser from './component/screen/HomeUser'
import ClassDetail from './component/screen/class/ClassDetail'
import RegisterAccount from './component/screen/RegisterAccount'
import LoginAdmin from './component/screen/LoginAdmin'
import Profile from './component/screen/Profile'
import ForgotPassword from './component/screen/ForgotPassword'
import Dashboard from './component/screen/Dashboard'
import ManagementAllUser from './component/screen/ManagementAllUser'
// import Chat from './component/screen/Chat'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import { nameScreen } from './component/screen/TextNameScreen'
class App extends React.Component {
  componentDidMount(){
    // window.location.reload(true)
  }
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
          <Route path="/Profile" component={Profile}>
            {/* <Profile /> */}
          </Route>

          <Route path="/ForgotPassword" component={ForgotPassword}>
            {/* <Profile /> */}
          </Route>

          <Route path="/Dashboard" component={Dashboard}>
            {/* <Profile /> */}
          </Route>
          <Route path="/ManagementAllUser" component={ManagementAllUser}>
            {/* <Profile /> */}
          </Route>
          
         

        </Router>
      </div>
    )

  }
}
export default App;