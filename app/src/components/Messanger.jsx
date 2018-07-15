import React, {Component} from 'react';
import avatar from '../assets/avatar.png';
export default class Messanger extends Component {
    state = {
        messages: []
    }

    componentDidMount() {
        this.addTestMessages();

    }

    componentWillUnmount() {}

    addTestMessages = () => {
        let {messages} = this.state;

        for (let i = 0; i < 100; i++) {
            const newMessage = {
                author: `author:${i}`,
                body: `body of message ${i}`,
                avatar: avatar
            }

            messages.push(newMessage);
        }

        this.setState(() => ({
            messages: messages
        }))
    }
    render() {
        let style = {
            height: this.state.height
        }

        let messageList = this.state.messages.map(message => (
            <div className="messanger__content__messages__message">
                <div className="messanger__content__messages__message-image">
                        <img src={message.avatar} alt=""/>
                </div>
                <div className="messanger__content__messages__message-body">
                    <div className="messanger__content__messages__message-body--author">{message.author}</div>
                    <div className="messanger__content__messages__message-body--text">{message.body}</div>
                </div>
            </div>
        ))


        return (
            <div className="messanger">
                <div className="messanger__header">
                    <div className="messanger__header__left">
                        <div className="messanger__header__left__actions">
                            <button>new message</button>
                        </div>

                    </div>
                    <div className="messanger__header__content">
                        <h2>Chat.me</h2>
                    </div>
                    <div className="messanger__header__right">
                        <div className="user-profile">
                            <div className="user-profile__name">Sj</div>
                            <div className="user-profile__image">
                                <img src={avatar} alt="avatar" className="user-profile__image"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="messanger__main">
                    <div className="messanger__sidebar-left">left sidebar</div>
                    <div className="messanger__content">
                        <div className="messanger__content__messages">

                            {/* test messages render */}
                            {messageList}
                        </div>

                    </div>
                    <div className="messanger__sidebar-right">right sidebar</div>
                </div>
            </div>
        )
    }
};