import React, {Component} from 'react';
import avatar from '../assets/avatar.png';
import classNames from 'classnames';
import {OrderedMap} from 'immutable';
// import _ from 'lodash';
import {ObjectID} from '../helper/objectid';


export default class Messanger extends Component {
    state = {
        newMessage: 'hello there...',
    }
    componentDidMount() {
        this.addTestMessages();
    }

    componentWillUnmount() {}

    addTestMessages = () => {

        const {store} = this.props;
        
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
                title: `channel ${c}`,
                lastMessage: `last message ${c}`,
                members: new OrderedMap({

                    '2': true,
                    '3': true,
                }),
                messages: new OrderedMap(),
            }
            const msgId = `${c}`;
            newChannel.messages = newChannel.messages.set(msgId, true);
            newChannel.messages = newChannel.messages.set(`${c+1}`, true);
           
            store.addChannel(c, newChannel);
        }
    }

    selectChannel = (key) => {
        // console.log('key',key);
        const {store} = this.props;
        store.setActiveChannel(key);

    }
    render() {
        const {store} = this.props;

        const activeChannel = store.getActiveChannel();
        const messages = store.getMessagesFromChannel(activeChannel);
        const channels = store.getChannels();
        const members = store.getMembersFromChannel(activeChannel);

        let messageList = messages.map((message, index) => (
            <div
                className={classNames("messanger__content__messages__message", {'messanger__content__messages__message-self': message.me})}
                key={index}>
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
        ));

        let channelList = channels.map((channel) => (
            
            <div 
                className="channels__channel" 
                onClick={()=> this.selectChannel(channel._id)}
                key={channel._id}>
                <div className="user-image">
                    <img src={avatar} alt=""/>
                </div>
                <div className="user-info">
                    <h2>{channel.title}</h2>
                    <p>joined on 3 days</p>
                </div>
            </div>
        ));

        let membersList = members.map((member, key) => (
            <div className="members__member" key={key}>
                <div className="user-image">
                    <img src={avatar} alt=""/>
                </div>
                <div className="user-info">
                    <h2>{member.name}</h2>
                    <p>joined on 3 days</p>
                </div>
            </div>
        ));


        return (
            <div className="messanger">
                 {/* {console.log('active chanel messanger,',activeChannel)}
                 {console.log('message messanger', messages)}; */}

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
                            {/* {console.log('messages',messages)} */}

                        </div>

                        {/* message input */}
                        <div className="messanger__input">
                            <div className="messanger__input__text">
                                <input 
                                    type="text" 
                                    placeholder="Write message" 
                                    value={this.state.newMessage}
                                    onChange={(event)=>{this.setState({newMessage: event.target.value})}}
                                    />
                            </div>
                            <div className="messanger__input__actions">
                                <button className="messanger__input__actions__send">send</button>
                            </div>
                        </div>
                    </div>

                    {/* right sidebar */}
                    <div className="messanger__sidebar-right">
                        <h2>Members</h2>

                        {/* members list */}
                        <div className="members">
                            {membersList}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};