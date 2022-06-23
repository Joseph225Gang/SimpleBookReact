import React, {PureComponent} from "react";
import {Navigate} from 'react-router-dom';
import { connect } from 'react-redux';

class Write extends PureComponent{
    
    render(){
        const {loginStatus} = this.props;
        if(loginStatus)
        {
        return (
            <div>寫文章頁面</div>
        )
        }
        else{
            return <Navigate to='/login'/>
        }
    }

}

const mapState = (state) => ({
    loginStatus: state.getIn(['login','login'])
})

export default connect(mapState, null)(Write);