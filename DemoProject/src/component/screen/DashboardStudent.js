import React, { PureComponent } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

export default class DashboardStudent extends PureComponent {
  state = {
      goToScreen:'',
  }
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
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
                <h1 className="mt-4">Dashboard Student</h1>
                <ol className="breadcrumb mb-4">
                  {/* <li className="breadcrumb-item active">Dashboard</li> */}
                  <button onClick={() => this.setState({
                                    goToScreen: 'HomeUser' })}>Back</button>
                </ol>
                <div className="row">
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-primary text-white mb-4">
                      <div className="card-body">Primary Card</div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-warning text-white mb-4">
                      <div className="card-body">Warning Card</div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-success text-white mb-4">
                      <div className="card-body">Success Card</div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-danger text-white mb-4">
                      <div className="card-body">Danger Card</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="card mb-4">
                      <div className="card-header"><i className="fas fa-chart-area mr-1" />Area Chart Example</div>
                      <LineChart
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
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                      </LineChart>
                      <div className="card-body"><canvas id="myAreaChart" width="100%" height={40} /></div>
                    </div>
                  </div>
                  {/* <div className="col-xl-6">
                    <div className="card mb-4">
                      <div className="card-header"><i className="fas fa-chart-bar mr-1" />Bar Chart Example</div>
                      <div className="card-body"><canvas id="myBarChart" width="100%" height={40} /></div>
                    </div>
                  </div> */}
                </div>
                <div className="card mb-4">
                </div>
              </div>
            </main>
          </div>
        </div>
        {this.state.goToScreen === 'StaffManagementAllUser' &&
          <Redirect to={{ pathname: 'StaffManagementAllUser' }} />
        }
        {this.state.goToScreen === 'HomeUser' &&
          <Redirect to={{ pathname: 'Home' }} />
        }
      </div>
    )
  }
}
