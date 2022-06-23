import React, {PureComponent} from "react";
import {HomeWrapper, HomeLeft, HomeRight} from './style';
import List from './components/List';
import Recommend from './components/Recommend';
import Topic from './components/Topic';
import Writer from './components/Writer';
import axios from "axios";
import { connect } from "react-redux";
import { actionCreators} from './store';
import {BackTop} from './style';
import { act } from "react-dom/test-utils";

class Home extends PureComponent{

    handleScrollTop(){
        window.scrollTo(0,0);
    }

    render(){
        return (
            <HomeWrapper>
                <HomeLeft>
                    <div className="bannger-img"></div>
                    <Topic/>
                    <List/>
                </HomeLeft>
                <HomeRight>
                    <Recommend/>
                    <Writer/>
                </HomeRight>
                {this.props.showScroll ?　<BackTop onClick={this.handleScrollTop}>頂部</BackTop>　:　null　}
                
            </HomeWrapper>
        )
    }
    componentDidMount(){
        this.props.changeHomeData();
        this.bindEvents();
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.props.changeScrollTopShow);
    }

    bindEvents(){
        window.addEventListener('scroll', this.props.changeScrollTopShow);
    }
}

const mapState = (state) => ({
    showScroll: state.getIn(['home', 'showScroll'])
});

const mapDispatch = (dispatch) =>({
    
    changeHomeData(){
        dispatch(actionCreators.getHomeInfo());
    },
    changeScrollTopShow(){
        if(document.documentElement.scrollTop > 150){
            dispatch(actionCreators.toggleTopShow(true))
        }
        else{
            dispatch(actionCreators.toggleTopShow(false))
        }
    }
})

export default connect(mapState, mapDispatch)(Home);