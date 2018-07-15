import {OrderedMap} from 'immutable';

const user = OrderedMap({
    1: {
        _id: 1,
        name: "Sj",
        created: new Date()
    },
    2: {
        _id: 2,
        name: "Sj2",
        created: new Date()
    },
    3: {
        _id: 3,
        name: "Sj3",
        created: new Date()
    }
});

export default class Store {

    constructor(appComponent) {
        this.app = appComponent;
        this.messages = new OrderedMap();
        this.channels = new OrderedMap();
        this.activeChannelId = null;
        this.user = user;
    }

    addMessage = (index, message = {}) => {
        this.messages = this.messages.set(index, message);
        this.update();
    }

    getMessages = () => {
        return this.messages.valueSeq();
    }

    getMessagesFromChannel = (channel) => {

        let messages = [];
        if(channel){
            channel.messages.map((key) => {
                const message = this.messages.get(key);
                messages.push(message)
            })
        }
        return messages;
        
    }

    getMembersFromChannel = (channel) => {
        let members = [];
        if(channel) {
            channel.members
        }
        return members;
    }
    addChannel = (index, channel) => {
        this.channels = this.channels.set(index, channel);
    }

    setActiveChannel = (id) => {
        this.activeChannelId = id;
        this.update();
    }

    getActiveChannel = () => {
        return this.activeChannelId ? this.channels.get(this.activeChannelId): this.channels.first();
    }

    getChannels = () => {
        return this.channels.valueSeq();
    }

    update = () => {
        this.app.forceUpdate();
    }
}