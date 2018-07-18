import React, {Component} from 'react';
import SearchUser from './SearchUser';
import UserBar from './UserBar';
import avatar from '../assets/avatar.png';
import classNames from 'classnames';
import {OrderedMap} from 'immutable';
import _ from 'lodash';
import {ObjectID} from '../helper/objectid';
import moment from 'moment';

export default class Messanger extends Component {
    state = {
        newMessage: '',
        searchUser: '',
        showSearchUser: false,
    }

    componentDidUpdate() {
        this.scrollMessagesToBottom();
    }

    componentDidMount() {
        // this.addTestMessages();
    }

    componentWillUnmount() {}

    scrollMessagesToBottom = () => {
        if (this.messagesRef) {
            this.messagesRef.scrollTop = this.messagesRef.scrollHeight;
        }
    }

    renderMessage = (message) => (
        <p dangerouslySetInnerHTML={{__html: message.body}} />
    )

    renderChannelTitle = (channel = {}) => {
        if(!channel)
            return null;

        const {store} = this.props;
        
        const members = store.getMembersFromChannel(channel);
        const names = [];
        members.forEach((user) => {
            names.push(_.get(user, 'name'));
        })

        return <h2>{_.join(names, ', ')}</h2>
    }

    // addTestMessages = () => {

    //     const {store} = this.props;
        
    //     for (let i = 0; i < 100; i++) {
    //         const newMessage = {
    //             _id:`${i}`,
    //             author: `author:${i}`,
    //             body: `body of message ${i}`,
    //             avatar: avatar,
    //             me: i % 2 === 0
    //         }
    //         store.addMessage(i, newMessage);
    //     }

    //     for (let c = 0; c < 5; c++) {
    //         const newChannel = {
    //             _id: `${c}`,
    //             title: `channel ${c}`,
    //             lastMessage: `last message ${c}`,
    //             members: new OrderedMap({
    //                 '2': true,
    //                 '3': true,
    //                 '4': true
    //             }),
    //             messages: new OrderedMap(),
    //             created: new Date()
    //         }
    //         const msgId = `${c}`;
    //         newChannel.messages = newChannel.messages.set(msgId, true);
    //         newChannel.messages = newChannel.messages.set(`${c+1}`, true);
           
    //         store.addChannel(c, newChannel);
    //     }
    // }

    onCreateChannel = () => {
        const {store} = this.props;
        let newChannelId = new ObjectID().toString();
        const currentUser = store.getCurrentUser();
        
        const newChannel = {
            _id: newChannelId,
            title: `new channel`,
            // userId: currentUser._id,
            lastMessage: "",
            members: new OrderedMap(),
            messages: new OrderedMap(),
            isNew: true,
            created: new Date()
        }

        store.onCreateNewChannel(newChannel);
    }

    selectChannel = (key) => {
        const {store} = this.props;
        store.setActiveChannel(key);
    }

    handleSend = () => {
        const { newMessage } = this.state;
        const { store } = this.props;

        if (newMessage.trim().length > 0) {
            const messageId = new ObjectID().toString();
            const channel = store.getActiveChannel();
            const channelId = channel._id;
            const currentUser = store.getCurrentUser();

            const message = {
                _id: messageId,
                channelId: channelId,
                body: newMessage,
                author: currentUser.name,
                me: 'true',
                userId: currentUser._id
            }
            this.setState(() => ({ newMessage: '' }))

            store.addMessage(messageId, message);
        }
        
    }

    // render
    render() {
        const {store} = this.props;

        const activeChannel = store.getActiveChannel();
        const messages = store.getMessagesFromChannel(activeChannel);
        const channels = store.getChannels();
        const members = store.getMembersFromChannel(activeChannel);


        // message list
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
                    <div className="messanger__content__messages__message-body--text">
                        {this.renderMessage(message)}
                    </div>
                </div>
            </div>
        ));


        // channel list to be rendered
        let channelList = channels.map((channel) => (
            <div 
                className={classNames("channels__channel", {"active": activeChannel._id === channel._id})} 
                onClick={() => this.selectChannel(channel._id)}
                key={channel._id}>
                <div className="user-image">
                    <img src={avatar} alt=""/>
                </div>
                <div className="user-info">
                    {this.renderChannelTitle(channel)}
                    <p>{channel.lastMessage}</p>
                </div>
            </div>
        ));


        // members list to be rendered
        let membersList = members.map((member, key) => (
            <div className="members__member" key={key}>
                <div className="user-image">
                    <img src={avatar} alt=""/>
                </div>
                <div className="user-info">
                    <h2>{member.name}</h2>
                    <p>Joined: {moment(member.created).fromNow()}</p>
                </div>
            </div>
        ));

       

        //main return statement
        return (
            <div className="messanger">

                {/* header */}
                <div className="messanger__header">
                    <div className="messanger__header__left">
                        <div className="messanger__header__left__actions">
                            <button className="left-action"><i className="icon-settings"></i></button>
                            <button>new message</button>
                            <button 
                                className="right-action"
                                onClick={this.onCreateChannel}>
                                    <i className="icon-edit-modify-streamline"></i>
                            </button>
                        </div>
                    </div>

                    {/* messanger header search */}
                    <div className="messanger__header__content">
                       { _.get(activeChannel, 'isNew') ? 
                            <div className="toolbar">
                                {
                                    members.map((user, key)=>{
                                        return <span onClick={ ()=> {
                                            console.log('you want to remove user', user);
                                            store.removeMemberFromChannel(activeChannel, user);
                                        }} 
                                        key={key}>
                                            {_.get(user, 'name')}
                                        </span>
                                    })
                                }
                                <input 
                                    type="text" 
                                    value={this.state.searchUser}
                                    onChange={(event)=>{this.setState({searchUser: event.target.value, showSearchUser: true})}}
                                    placeholder="to,"
                                    />

                                {this.state.showSearchUser ?
                                    <SearchUser
                                        search={this.state.searchUser}
                                        store={this.props.store}
                                        onSelect={(user) => {
                                            console.log(user);

                                            this.setState({showSearchUser: false}, () => {
                                                const userId = _.get(user, '_id');
                                                const channelId = _.get(activeChannel, '_id');
                                                store.addUserToChannel(channelId, userId);
                                            })
                                        }} /> :
                                        null }
                            </div> :  
                            <h2>{_.get(activeChannel, 'title')}</h2>}
                    </div>

                    <div className="messanger__header__right">
                        <UserBar store={store}/>
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
                        <div className="messanger__content__messages" ref={(ref) => this.messagesRef = ref}>

                            {/* test messages render */}
                            {messageList}

                        </div>

                        {/* message input */}
                        { activeChannel && members.size > 0? 
                        <div className="messanger__input">
                            <div className="messanger__input__text">
                                <input 
                                    type="text" 
                                    placeholder="Write message" 
                                    value={this.state.newMessage}
                                    onChange={(event)=>{this.setState({newMessage: event.target.value})}}
                                    onKeyPress={(event)=>{if(event.keyCode === 13) {
                                        this.handleSend()
                                    }}}
                                    />
                            </div>
                            <div className="messanger__input__actions">
                                <button 
                                    className="messanger__input__actions__send" 
                                    onClick={this.handleSend}><i className="icon-paperplane"></i></button>
                            </div>
                        </div> : null } 
                    </div>

                    {/* right sidebar */}
                    <div className="messanger__sidebar-right">
                        
                        {/* members list */}
                        {members.size > 0 ? <div><h2 className="members-heading">Members</h2><div className="members">
                            {membersList}
                        </div></div> : <h2 className="members-heading">No members</h2>}
                        
                    </div>
                </div>
            </div>
        )
    }
};