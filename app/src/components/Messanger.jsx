import React, {Component} from 'react';
import avatar from '../assets/avatar.png';
import classNames from 'classnames';
import {OrderedMap} from 'immutable';
import _ from 'lodash';
export default class Messanger extends Component {

    state = {
        activeChannel: null,
    }

    onSelectChannel = (key) => {
        const {store} = this.props;
        store.setActiveChannel(key)
    }

    componentDidMount() {
        this.addTestMessages();
    }

    componentWillUnmount() {}

    addTestMessages = () => {

        const {store} = this.props;
        // console.log(store)
        for (let i = 0; i < 100; i++) {
            const newMessage = {
                _id:`${i}`,
                author: `author:${i}`,
                body: `body of message ${i}`,
                avatar: avatar,
                me: i % 2 == 0
            }
            store.addMessage(i, newMessage);
        }

        for (let c = 0; c < 10; c++) {
            const newChannel = {
                _id: `${c}`,
                title: 'linus cat tips',
                lastMessage: `last message ${c}`,
                members: new OrderedMap({
                    '2': true,
                    '3': true
                }),
                messages: new OrderedMap(),
            }
            const msgId = `${c}`;
            newChannel.messages = newChannel.messages.set(msgId, true)
            newChannel.messages = newChannel.messages.set('11', true)
            store.addChannel(c, newChannel);
        }
    }
    render() {
        const {store} = this.props;

        const activeChannel = store.getActiveChannel();
        const messages = store.getMessagesFromChannel(activeChannel);
        const channels = store.getChannels();
        const members = store.getMembersFromChannel(activeChannel);
        // const activeChannel = 


        let messageList = messages.map(message => (
            <div
                className={classNames("messanger__content__messages__message", {'messanger__content__messages__message-self': message.me})}
                key={message._id}>
                <div className="messanger__content__messages__message-image">
                    <img src={message.avatar} alt=""/>
                </div>
                <div className="messanger__content__messages__message-body">
                    <div className="messanger__content__messages__message-body--author">
                        {!message.me? message.author: 'you says'}
                    </div>
                    <div className="messanger__content__messages__message-body--text">{message.body}</div>
                </div>
            </div>
        ))

        // let messageList = messages.map(message => (
        //     <div
        //         className={classNames("messanger__content__messages__message", {'messanger__content__messages__message-self': message.me})}
        //         key={message._id}>
        //         <div className="messanger__content__messages__message-image">
        //             <img src={message.avatar} alt=""/>
        //         </div>
        //         <div className="messanger__content__messages__message-body">
        //             <div className="messanger__content__messages__message-body--author">
        //                 {!message.me? message.author: 'you says'}
        //             </div>
        //             <div className="messanger__content__messages__message-body--text">{message.body}</div>
        //         </div>
        //     </div>
        // ))

        let channelList = channels.map(channel => (
            <div className="channels__channel" key={channel._id} onClick={this.onSelectChannel(channel._id)}>
                <div className="user-image">
                    <img src={avatar} alt=""/>
                </div>
                <div className="user-info">
                    <h2>{channel.title}</h2>
                    <p>hello lets talk about cats</p>
                </div>
            </div>
        ))

        // let membersList = members
        return (
            <div className="messanger">

                {/* header */}
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

                {/* main section */}
                <div className="messanger__main">

                    {/* left sidebar */}
                    <div className="messanger__sidebar-left">
                        <div className="channels">
                            {channelList}
                        </div>
                    </div>

                    {/* messages */}
                    <div className="messanger__content">
                        <div className="messanger__content__messages">

                            {/* test messages render */}
                            {messageList}

                        </div>

                        {/* message input */}
                        <div className="messanger__input">
                            <div className="messanger__input__text">
                                <input type="text" placeholder="Write message"/>
                            </div>
                            <div className="messanger__input__actions">
                                <button className="messanger__input__actions__send">send</button>
                            </div>
                        </div>
                    </div>

                    {/* right sidebar */}
                    <div className="messanger__sidebar-right">

                        <h2>Members</h2>
                        <div className="members">
                            <div className="members__member">
                                <div className="user-image">
                                    <img src={avatar} alt=""/>
                                </div>
                                <div className="user-info">
                                    <h2>foo nanem</h2>
                                    <p>joined 3 days afo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};