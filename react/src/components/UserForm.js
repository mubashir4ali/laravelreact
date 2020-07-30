import React, { Component } from 'react'
import { connect }    from 'react-redux'

class UserForm extends Component 
{
    constructor(props){
      super(props);
  
      this.state = {
        fields: {},
        errors: {}
      }

    }

    componentWillReceiveProps = (nextProps) => { 
      // Load User Asynchronously
      this.setState({ fields: nextProps.user })
    }
  
    handleValidation(){
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
  
      if(!fields["first_name"]){
        formIsValid = false;
        errors["first_name"] = "First Name Cannot be empty";
      }
  
      if(typeof fields["first_name"] !== "undefined"){
        if(!fields["first_name"].match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["first_name"] = "First Name Only letters";
        }      	
      }

      if(!fields["last_name"]){
        formIsValid = false;
        errors["last_name"] = "Last Name Cannot be empty";
      }
  
      if(typeof fields["last_name"] !== "undefined"){
        if(!fields["last_name"].match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["last_name"] = "Last Name Only letters";
        }      	
      }
  
      //Email
      if(!fields["email"]){
        formIsValid = false;
        errors["email"] = "Email Cannot be empty";
      }
  
      if(typeof fields["email"] !== "undefined"){
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');
  
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fields["email"]))
        {
          formIsValid = false;
          errors["email"] = "Email is not valid";
        }
      }

      console.log()
  
      //password
      if(this.state.fields.id){

      }
      else {
        if(!fields["password"]){
          formIsValid = false;
          errors["password"] = "Password Cannot be empty";
        }
  
        if(!fields["confirm_password"]){
          formIsValid = false;
          errors["confirm_password"] = "Confirm Password Cannot be empty";
        }
      }

      if(fields["password"] && fields["password"]!=fields["confirm_password"]){
        formIsValid = false;
        errors["confirm_password"] = "Confirm password does not match";
      }

  
      if(!fields["access_level"]){
        formIsValid = false;
        errors["access_level"] = "Access Level Cannot be empty";
      }
  
  
      this.setState({errors: errors});
      return formIsValid;
    }
  
    userSubmit(e)
    {
      e.preventDefault()
      this.handleValidation()
      if(this.handleValidation())
      {
        this.props.onSubmit(this.state.fields)
      }
      else
      {
        alert("Form has errors.")
      }
  
    }
  
    handleChange(field, e){    		
      let fields = this.state.fields;
      fields[field] = e.target.value;        
      this.setState({fields});
    }
  
    render(){
      return (
        <div>
          <form name="userform" className="userform" 
            onSubmit= {this.userSubmit.bind(this)}>
            <div>
                <input ref="first_name" type="text" size="30" 
                    placeholder="First Name" 
                    onChange={this.handleChange.bind(this, "first_name")} 
                    value={this.state.fields["first_name"]}/>
                <span className="error">{this.state.errors["first_name"]}</span>
                <br/>

                <input ref="last_name" type="text" size="30" 
                    placeholder="Last Name" 
                    onChange={this.handleChange.bind(this, "last_name")} 
                    value={this.state.fields["last_name"]}/>
                <span className="error">{this.state.errors["last_name"]}</span>
                <br/>

                <input ref="email" type="text" size="30" 
                    placeholder="Email" 
                    onChange={this.handleChange.bind(this, "email")} 
                    value={this.state.fields["email"]}/>
                <span className="error">{this.state.errors["email"]}</span>
                <br/>

                <input ref="password" type="password" size="30" 
                    placeholder="Password" 
                    onChange={this.handleChange.bind(this, "password")} 
                    value={this.state.fields["password"]}/>
                <span className="error">{this.state.errors["password"]}</span>
                <br/>

                <input ref="confirm_password" type="password" size="30" 
                    placeholder="Confirm Password" 
                    onChange={this.handleChange.bind(this, "confirm_password")} 
                    value={this.state.fields["confirm_password"]}/>
                <span className="error">{this.state.errors["confirm_password"]}</span>
                <br/>
                {
                  (this.props.loggedin && this.props.loggedin.access_level!=="user") && 
                  <span>
                  <select ref="access_level" onChange={this.handleChange.bind(this, "access_level")}>
                      <option value="">--Select--</option>
                      <option value="user" selected={this.state.fields["access_level"]=="user"}>User</option>
                      <option value="admin" selected={this.state.fields["access_level"]=="admin"}>Admin</option>
                  </select>
                  <span className="error">{this.state.errors["access_level"]}</span>
                  <br/>
                </span>}
            </div>
            <div>
                <button id="submit" value="Submit">Submit</button>
            </div>
          </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      loggedin : state.userStore.loggedin
  }
}

export default connect(mapStateToProps)(UserForm)