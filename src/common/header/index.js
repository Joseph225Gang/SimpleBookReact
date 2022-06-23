import React, {Component} from "react";
import { connect } from 'react-redux';
import {HeaderWrapper,Logo, Nav, NavItem, NavSearch, Addition, Button, SearchInfo, SearchInfoTitle, SearchInfoSwitch, SearchInfoItem, SearchInfoList} from "./style";
import { CSSTransition} from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from "../../pages/login/store";
import {Link} from 'react-router-dom';

class Header extends Component {
    getListArea() {
        const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage} = this.props;
        const newList = list.toJS();
        const pageList = []
        if(newList.length)
        {
            for(let i = (page - 1) * 10; i < page * 10; i++){
                pageList.push(
                 <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }

        if(focused || mouseIn){
            return (
                <SearchInfo onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                            <SearchInfoTitle>
                                熱門搜索
                                <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage)}>
                                    換一批
                                </SearchInfoSwitch>
                            </SearchInfoTitle>
                            <SearchInfoList>
                               {pageList}
                            </SearchInfoList>
                        </SearchInfo>
            )
        }
        else
            return null;
    }
    render(){
        const { focused, handleInputFocus, handleInputBlur, list, login, logout } = this.props;
        return (
            <HeaderWrapper>
                        <Link to='/'>
                            <Logo/>
                        </Link>
                        <Nav>
                            <NavItem className="left active">首頁</NavItem>
                            <NavItem className="left">下載App</NavItem>
                            {
                                login ? 
                                <NavItem className="right" onClick={logout}>退出</NavItem> : 
                                <Link to='/login'><NavItem className="right">登錄</NavItem></Link>
                            }
                            <NavItem className="right">Aa</NavItem>
                            <CSSTransition
                               in={focused}
                               timeout={200}
                               classNames="slide"
                            >
                            <NavSearch
                                className={focused ? 'focused' : ''}
                                onFocus={() => {handleInputFocus(list)}}
                                onBlur={handleInputBlur}>
                            </NavSearch>
                            </CSSTransition>
                            <Addition>
                                <Link to='/write'>
                                    <Button className="writting">寫文章</Button>
                                </Link>
                                <Button className="reg">註冊</Button>
                            </Addition>
                            {this.getListArea()}
                        </Nav>
                    </HeaderWrapper>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        //focused: state.get('header').get('focused')
        focused: state.getIn(['header','focused']),
        list: state.getIn(['header','list']),
        page: state.getIn(['header','page']),
        totalPage: state.getIn(['header','totalPage']),
        mouseIn: state.getIn(['header','mouseIn']),
        login: state.getIn(['login','login'])
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        handleInputFocus(list){
         (list.size === 0)  && dispatch(actionCreators.getList());
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur(){
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave());
        },
        handleChangePage(page, totalPage){
            if(page < totalPage)
            {
                dispatch(actionCreators.changePage(page + 1));
            }
            else
                dispatch(actionCreators.changePage(page));
        },
        logout(){
            dispatch(loginActionCreators.logout());
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Header);