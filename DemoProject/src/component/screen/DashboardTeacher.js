import React, { PureComponent } from 'react'
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import {userProfile} from '../screen/config/settings'
const data = [
  {
    name: 'Week 1', Files: 50, Comments: 98, amt: 2400,
  },
  {
    name: 'Week 2', Files: 45, Comments: 120, amt: 221,
  },
  {
    name: 'Week 3', Files: 50, Comments: 87, amt: 229,
  },
  {
    name: 'Week 4', Files: 78, Comments: 115, amt: 200,
  },
  {
    name: 'Week 5', Files: 89, Comments: 138, amt: 218,
  },
  {
    name: 'Week 6', Files: 60, Comments: 145, amt: 250,
  },
  {
    name: 'Week 7', Files: 50, Comments: 130, amt: 210,
  },
];

const data1 = [
  {
    name: 'Week 1', Classes: 15, Blogs: 50, amt: 2400,
  },
  {
    name: 'Week 2', Classes: 10, Blogs: 60, amt: 221,
  },
  {
    name: 'Week 3', Classes: 20, Blogs: 45, amt: 229,
  },
  {
    name: 'Week 4', Classes: 25, Blogs: 70, amt: 200,
  },
  {
    name: 'Week 5', Classes: 30, Blogs: 46, amt: 218,
  },
  {
    name: 'Week 6', Classes: 28, Blogs: 53, amt: 250,
  },
  {
    name: 'Week 7', Classes: 23, Blogs: 38, amt: 210,
  },
];


export default class DashboardTeacher extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
  state = {
    goToScreen:'',
  }
  render() {
    return (
      <div >

        {/* <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content />
        <meta name="author" content /> */}
        <title>Dashboard</title>
        <link href="css/styles.css" rel="stylesheet" />
        <link href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css" rel="stylesheet" crossOrigin="anonymous" />
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid">
                <h1 className="mt-4">Dashboard Teachers</h1>
                <ol className="breadcrumb mb-4">
                  {/* <li className="breadcrumb-item active">Dashboard</li> */}
                  <button onClick={() => { 
                    if(userProfile.isTeacher){
                      this.setState({
                        goToScreen: 'Home'})
                    }else if(userProfile.isStaff){
                      this.setState({
                        goToScreen: 'HomeAdmin'})
                    }}}>Back</button>
                </ol>
                <div className="row">
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-primary text-white mb-4">
                      <div className="card-body">Comments</div>
                    </div>
                  </div>
      
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-success text-white mb-4">
                      <div className="card-body">Files</div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-warning text-white mb-4">
                      <div className="card-body">Blogs</div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-danger text-white mb-4">
                      <div className="card-body">Classes</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="card mb-4">
                      <div className="card-header"><i className="fas fa-chart-area mr-1" />Area Chart</div>
                      <BarChart
                        width={700}
                        height={500}
                        data={data}
                        margin={{
                          top: 5, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Comments" fill="#3366FF" />
                        <Bar dataKey="Files" fill="#33CC66" />
                      </BarChart>
                      <div className="card-body"><canvas id="myAreaChart" width="100%" height={40} /></div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="card mb-4">
                      <div className="card-header"><i className="fas fa-chart-bar mr-1" /></div>
                      <BarChart
                        width={700}
                        height={500}
                        data={data1}
                        margin={{
                          top: 5, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Blogs" fill="#FFCC33" />
                        <Bar dataKey="Classes" fill="#CC0000" />
                      </BarChart>
                      <div className="card-body"><canvas id="myBarChart" width="100%" height={40} /></div>
                    </div>
                  </div>
                </div>
                <div className="card mb-4">
                </div>
              </div>
            </main>
          </div>
        </div>
        {this.state.goToScreen === 'Home' &&
          <Redirect to={{ pathname: 'Home' }} />
         }
         {this.state.goToScreen === 'HomeAdmin' &&
          <Redirect to={{ pathname: 'StaffManagementAllUser' }} />
         }
      </div>
    )
  }
}
