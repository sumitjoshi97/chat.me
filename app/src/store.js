import {OrderedMap} from 'immutable';

const users = OrderedMap({
    1: {
        _id: '1',
        name: "Sj",
        created: new Date()
    },
    2: {
        _id: '2',
        name: "Sj2",
        created: new Date()
    },
    3: {
        _id: '3',
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
        // this.user = users;
    }

    addMessage = (id, message = {}) => {
        this.messages = this.messages.set(`${id}`, message);
        this.update();
    }

    getMessages = () => {
        return this.messages.valueSeq();
    }

    getMessagesFromChannel = (channel) => {
        let messages = [];
        if(channel){
            channel.messages.map((value, key) => {
                // console.log('msg key store', key)
                const message = this.messages.get(key);
                messages.push(message);
            })
        }
        // console.log(`store - ${messages}`);
        return messages;
    }

    getMembersFromChannel = (channel) => {
        let members = [];

            if(channel) {
                channel.members.map((value, key) => {
                    const member = users.get(key);
                    members.push(member);
            })
        }
        return members;
    }

    setActiveChannel = (id) => {
        this.activeChannelId = id;
        // console.log('active channel id', id)
        // console.log('active channel store', this.activeChannelId);
        this.update();
    }

    getActiveChannel = () => {
        const channel = this.activeChannelId ? this.channels.get(this.activeChannelId): this.channels.first();
        // console.log('active ch get', channel);
        
        return channel;
    }

    addChannel = (index, channel) => {
        this.channels = this.channels.set(`${index}`, channel);

        this.update();
    }

    getChannels = () => {
        return this.channels.valueSeq();
    }

    update = () => {
        this.app.forceUpdate();
    }
}