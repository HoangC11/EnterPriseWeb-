import React, { Component } from 'react';
import {userProfile, getDataLocal} from '../screen/config/settings'
import {managerChangeRuleStaff, managerChangeRuleTeacher, managerRemoveUser, managerGetUserProfile} from '../api/apiAdmin'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom'


class ManagementProfile extends React.Component {
    state = {
      goToScreen: '',
      name: '',
      gmail: '',
      rule: '',
      defaultRule: '',
      user: undefined,
      profileUser: undefined
    }
    
    onChangeText(text, type){
        // console.log('ttttttt: ', text)
        if(type === 1){
            this.setState({
                name: text.target.value
            })
        }else if(type === 2){
            this.setState({
                gmail: text.target.value
            })
        }else if(type === 3){
            this.setState({
                rule: text.target.value
            })
        }else{

        }
    }
    componentDidMount(){
        if(this.props.user !== undefined){
            const {user} = this.props
           if(user !== undefined){
            this.setState({
                user: user,
                name: user.name,
                gmail:user.gmail,
                rule: user.isTeacher ? 'Teacher' : user.isStaff ? 'Staff' : user.isAdmin ? 'Admin' : 'Student',
                defaultRule: user.isTeacher ? 'Teacher' : user.isStaff ? 'Staff' : user.isAdmin ? 'Admin' : 'Student'
            })
           }
        }
    }
   componentDidUpdate(prevProps){
       if(this.props.user !== prevProps.user){
           const {user} = this.props
           if(user !== undefined){
            this.setState({
                user: user,
                name: user.name,
                gmail:user.gmail,
                rule: user.isTeacher ? 'Teacher' : user.isStaff ? 'Staff' : user.isAdmin ? 'Admin' : 'Student',
                defaultRule: user.isTeacher ? 'Teacher' : user.isStaff ? 'Staff' : user.isAdmin ? 'Admin' : 'Student'
            })
           }
       }
       if(this.props.profileUserSelected !== prevProps.profileUserSelected){
           this.setState({
               profileUser: this.props.profileUserSelected
           })
       }
   }
   changeTextRule(){
        let r = this.state.rule
        let dr = this.state.defaultRule
        
        if(dr === 'Student'){
            if(r === 'Student'){
                r = 'Teacher'
            }else if( r === 'Teacher'){
                r = 'Student'
            }
        }else if(dr === 'Teacher'){
            if(r === 'Teacher'){
                r = 'Staff'
            }else if(r==='Staff'){
                r = 'Teacher'
            }
        }else if(dr ==='Staff'){
            if(r ==='Staff'){
                r = 'Teacher'
            }else if(r === 'Teacher'){
                r = 'Staff'
            }
        }
        this.setState({
            rule: r
        })

   }
   async onRemoveUser(){
        const response = await managerRemoveUser(this.state.user._id)
        if(response !== undefined){
            if(response.data !== undefined && response.data._id !== undefined ){
                alert('Delete Success')
                this.props.getAllUser()
                this.props.onChangeSelectedUser()
            }else{
                alert('Delete failed')
            }
        }else{
            alert('Delete failed')
        }
   }
   async onSaveNewDate(){
        if(this.state.defaultRule === 'Student'){
            if(this.state.rule === 'Teacher'){
                const response = await managerChangeRuleTeacher(this.state.user._id)
                if(response !== undefined){
                    if(response.statusCode === 1 ){
                        alert('Change role Student success')
                        this.props.getAllUser()
                    }
                }
            }
        }else if(this.state.defaultRule === 'Teacher'){
            if(this.state.rule === 'Staff'){
                const response = await managerChangeRuleStaff(this.state.user._id)
                if(response !== undefined){
                    if(response.statusCode === 1 ){
                        alert('Change role Teacher success')
                        this.props.getAllUser()
                    }
                }
            }
        }else if(this.state.defaultRule === 'Staff'){
            if(this.state.rule ==='Teacher'){
                const response = await managerChangeRuleStaff(this.state.user._id)
                if(response !== undefined){
                    if(response.statusCode === 1 ){
                        alert('Change role Staff success')
                        this.props.getAllUser()
                    }
                }
            }
        }
   }
  render() {
      let {user} = this.state
    return (
      <div>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/* ---- Include the above in your HEAD tag -------- */}
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/* ---- Include the above in your HEAD tag -------- */}

        <title>Bootstrap Example</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <hr />
        <div className="container bootstrap snippet">
          <div className="row">
            
            <div className="col-sm-9">
              
              <div className="tab-content">
                <div className="tab-pane active" id="home">
                  <hr />
                  <form className="form" action="##" method="post" id="registrationForm">
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="first_name"><h4>Name</h4></label>
                        <label  className="form-control"  >{this.state.name}</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="mobile"><h4>Gmail</h4></label>
                        <label  className="form-control"  >{this.state.gmail}</label>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="first_name"><h4>Facebook</h4></label>
                        <label  className="form-control"  >{this.state.name}</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="first_name"><h4>Zalo</h4></label>
                        <label  className="form-control"  >{this.state.name}</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="first_name"><h4>Twitter</h4></label>
                        <label  className="form-control"  >{this.state.name}</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="first_name"><h4>Instagram</h4></label>
                        <label  className="form-control"  >{this.state.name}</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-6">
                        <label htmlFor="email"><h4>Rule <button onClick={() => {this.changeTextRule()}} class="btn btn-outline-success my-2 my-sm-0" type="button"> > </button></h4></label>
                        <label  className="form-control"  >{this.state.rule}</label>
                        
                      </div>
                    </div>


                    <div className="form-group">
                      <div className="col-xs-12">
                        <br />
                        {/* <button  className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"> Save</button> */}
                        {/* <a className="btn btn-lg btn-success" >Save</a> */}
                        <button onClick={() => {this.onSaveNewDate()}} type="button" class="btn btn-success">Save</button>
                        {/* <Button variant="secondary" onClick={() => {}}>
                        Close
                        </Button> */}
                        <button onClick={() => {this.onRemoveUser()}} type="button" className="btn btn-secondary">Delete</button>
                      </div>
                    </div>
                  </form>
                  <hr />
                  {this.state.goToScreen === 'HomeUser' &&
                        <Redirect to={{ pathname: '/Home' }} />
                    }
                    {this.state.goToScreen === 'HomeAdmin' &&
                        <Redirect to={{ pathname: '/HomeAdmin' }} />
                    }
                </div>{/*/tab-pane*/}
              </div>{/*/tab-pane*/}
            </div>{/*/tab-content*/}
          </div>{/*/col-9*/}
        </div>{/*/row*/}
      </div>
      
    );
  }
}
export default ManagementProfile;