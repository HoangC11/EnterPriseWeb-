import React from 'react'
import Login from './component/screen/Login'
import HomeAdmin from './component/screen/HomeAdmin'
import HomeUser from './component/screen/HomeUser'
import ClassDetail from './component/screen/class/ClassDetail'
import RegisterAccount from './component/screen/RegisterAccount'
import LoginAdmin from './component/screen/LoginAdmin'
import Profile from './component/screen/Profile'
import ForgotPassword from './component/screen/ForgotPassword'
import ManagementAllUser from './component/screen/ManagementAllUser'
import ManagementAddUserToSystem from './component/screen/ManagementAddUserToSystem'
import StaffManagementAllUser from './component/screen/StaffManagementAllUser'
import DashboardStudent from './component/screen/DashboardStudent'
import DashboardTeacher from './component/screen/DashboardTeacher'
import DashboardStaff from './component/screen/DashboardStaff'
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

          <Route path="/users/reset/:token" component={ForgotPassword}>
            {/* <Profile /> */}
          </Route>

          <Route path="/ManagementAllUser" component={ManagementAllUser}>
            {/* <Profile /> */}
          </Route>
          
          <Route path="/ManagementAddUserToSystem" component={ManagementAddUserToSystem}>
            {/* <Profile /> */}
          </Route>
          <Route path="/StaffManagementAllUser" component={StaffManagementAllUser}>
            {/* <Profile /> */}
          </Route>

          <Route path="/DashboardStudent" component={DashboardStudent}>
            {/* <Profile /> */}
          </Route>
          <Route path="/DashboardTeacher" component={DashboardTeacher}>
            {/* <Profile /> */}
          </Route>
          <Route path="/DashboardStaff" component={DashboardStaff}>
            {/* <Profile /> */}
          </Route>
          
        </Router>
      </div>
    )

  }
}
export default App;