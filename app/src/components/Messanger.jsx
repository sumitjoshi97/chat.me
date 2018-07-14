import React, {Component} from 'react';

export default class Messanger extends Component {
    state = {
        height: window.innerHeight
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        let style = {
            height: this.state.height
        }
        return (
            <div className="messanger">
                <div className="messanger__header">
                    <div className="messanger__header__left">new message</div>
                    <div className="messanger__header__content">
                        <h1 className="heading-primary">Chat.me</h1>
                    </div>
                    <div className="messanger__header__right">
                        <div className="user-profile">
                            <div className="user-profile__name">Sj</div>
                            <img
                                src={require("../assets/avatar.jpg")}
                                alt="avatar"
                                className="user-profile__image"/>
                        </div>
                    </div>
                </div>
                <div className="messanger__main">
                    <div className="messanger__sidebar-left">left sidebar</div>
                    <div className="messanger__content">Content</div>
                    <div className="messanger__sidebar-right">right sidebar</div>
                </div>
            </div>
        )
    }
};