import {OrderedMap} from 'immutable';
import _ from 'lodash';

const users = OrderedMap({
    1: {
        _id: '1',
        name: "Sj",
        email: "Sj@email.com",
        created: new Date()
    },
    2: {
        _id: '2',
        name: "Sj2",
        email: "Sj2@email.com",
        created: new Date()
    },
    3: {
        _id: '3',
        name: "Sj3",
        email: "Sj3@email.com",
        created: new Date()
    },
    4: {
        _id: '4',
        name: "Sj4`",
        email: "Sj4@email.com",
        created: new Date()
    }
});

export default class Store {

    constructor(appComponent) {
        this.app = appComponent;
        this.messages = new OrderedMap();
        this.channels = new OrderedMap();
        this.activeChannelId = null;

        //current logged in user
        // this.user = {
        //     _id: '1',
        //     name: 'Alex Mercer',
        //     created: new Date()
        // };
        this.user = null
    }

    getUserFromLocalStorage = () => {
        let user = null;
        const data = localStorage.getItem('currentUser');
        try {
            user = JSON.parse(data)
        } catch (err) {
            console.log(err);
        }
        return user;
    }

    setCurrentUser = (user) =>{
        this.user = user;

        if(user) {
            console.log('set current User', user);
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.update();
        console.log('current user', this.user)
    }
    loginUser = (email, password) => {
        // console.log(email, '+', password);
        const userEmail = _.toLower(email);
        // const _this = this;

        const user = users.find((user) => _.toLower(user.email) === userEmail);
        if(user) {
            console.log('current User', user)
            this.setCurrentUser(user);
        }
        return new Promise((resolve, reject) => {
            return user ? resolve(user) : reject("user not found");  
        })
        this.update();
        // return user;   
    }

    signOut = () =>{
        this.user=null;
        localStorage.removeItem('currentUser');
        this.update();
    }
    addUserToChannel = (channelId, userId) => {
        console.log('adding user to chanel');
        const channel = this.channels.get(channelId);

        if(channel) {
            channel.members = channel.members.set(userId, true);
            this.channels = this.channels.set(channelId, channel);
            this.update();
        }
    }

    searchUsers = (search = '') =>{
        const keyword = _.toLower(search);

        let searchItems = new OrderedMap();
        console.log(search);
        if(_.trim(search).length) {

            // do a search in user list to match required name
            // users.filter(user => {
            //     const name = _.get(user, 'name');
            //     const userId = _.get(user, '_id');
            //     if(_.includes(name, search)) {
            //         searchItems = searchItems.set(userId, user);
            //     }
            // })
            const currentUserId = _.get(this.getCurrentUser(), '_id');
            searchItems = users.filter((user) => _.get(user, '_id')!==currentUserId && _.includes(_.toLower(_.get(user, 'name')), keyword))
        }

        return searchItems.valueSeq();
    }

    getCurrentUser = () => {
        console.log(this.user);
        return this.user;
    }

    addMessage = (id, message = {}) => {
        const user = this.getCurrentUser();
        message.user = user;
        this.messages = this.messages.set(`${id}`, message);

        // add new message to current channel

        const channelId = message.channelId;

        if(channelId) {
            let channel = this.channels.get(channelId);
            channel.isNew = false;
            channel.lastMessage = _.get(message, 'body');
            channel.messages = channel.messages.set(id, true);
            this.channels = this.channels.set(channelId, channel);
        }

        this.update();
    }

    getMessages = () => {
        return this.messages.valueSeq();
    }

    getMessagesFromChannel = (channel) => {
        let messages = new OrderedMap();
        if(channel){
            // channel.messages.map((value, key) => {
            //     // console.log('msg key store', key)
            //     const message = this.messages.get(key);
            //     messages.push(message);

            channel.messages.forEach((value, key) => {
                const message = this.messages.get(key);
                messages = messages.set(key, message);
            })
        }
        // console.log(`store - ${messages}`);
        return messages;
    }

    getMembersFromChannel = (channel) => {
        let members = new OrderedMap();

            if(channel) {
                channel.members.map((value, key) => {
                    const member = users.get(key);
                    const loggedUser = this.getCurrentUser();
                    if(_.get(loggedUser, '_id') !== _.get(member, '_id')){
                        members = members.set(key, member);
                    }
            })
        }
        return members.valueSeq();
    }

    removeMemberFromChannel = (channel = null, user = null) => {
        if (!channel || !user)
            return;

        const userId = _.get(user, '_id');
        const channelId = _.get(channel, '_id');

        channel.members = channel.members.remove(userId);

        this.channels = this.channels.set(channelId, channel);
        this.update();
    }   

    setActiveChannel = (id) => {
        this.activeChannelId = id;
        this.update();
    }

    getActiveChannel = () => {
        const channel = this.activeChannelId ? this.channels.get(this.activeChannelId): this.channels.first();
        
        return channel;
    }

    addChannel = (index, channel) => {
        this.channels = this.channels.set(`${index}`, channel);
        this.update();
    }

    onCreateNewChannel = (channel = {}) => {
        const channelId = channel._id;
        this.addChannel(channelId, channel);
        this.activeChannelId = channel._id;
        
    }
    
    getChannels = () => {
        this.channels = this.channels.sort((a,b) => a.created > b.created);
        return this.channels;
    }

    update = () => {
        this.app.forceUpdate();
    }
}

