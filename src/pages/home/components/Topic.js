import React, {PureComponent} from "react";
import {TopicWrapper, TopicItem}from '../style';
import { connect } from 'react-redux';

class Topic extends PureComponent{
    render(){
        const { list } = this.props;
        return (
            <TopicWrapper>
                {
                    list.map((item) =>  (
                            <TopicItem key={item.get('id')}>
                                <div className="topic-pic"></div>
                                {item.get('title')}
                            </TopicItem>
                        )
                    )
                }
            </TopicWrapper>
        )
    }
}

const mapState = (state) => ({
    list: state.getIn(['home','topicList'])
});

export default connect(mapState, null)(Topic);