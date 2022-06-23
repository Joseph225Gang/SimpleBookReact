import React, {PureComponent} from "react";
import {Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import {LoginWrapper, LoginBox, Input, Button} from './style';
import {actionCreators} from './store';

class Login extends PureComponent{
    
    render(){
        const {loginStatus} = this.props;
        if(!loginStatus)
        {
        return (
           <LoginWrapper>
                <LoginBox>
                    <Input placeholder="帳號" ref={(input) => {this.account = input}}/>
                    <Input placeholder="密碼" type='password' ref = {(input) => {this.password = input}}/>
                    <Button onClick={() => this.props.login(this.account, this.password)}>登入</Button>
                </LoginBox>
            </LoginWrapper>
        )
        }
        else{
            return <Navigate to='/'/>
        }
    }

}

const mapState = (state) => ({
    loginStatus: state.getIn(['login','login'])
})

const mapDispatch = (dispatch) => ({
    login(accountElem, passwordElem){
       dispatch(actionCreators.login(accountElem.value, passwordElem.value))
    }
})
export default connect(mapState, mapDispatch)(Login);