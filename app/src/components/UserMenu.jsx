import React, { Component } from 'react'

export default class UserMenu extends Component {
    state = {

    }

    onClickOutside = (event) =>{
        if(this.ref && !this.ref.contains(event.target)){
            if(this.props.onClose) {
                this.props.onClose();
            }
        }
    }

    componentDidMount() {
        window.addEventListener('mousedown', this.onClickOutside);
    }

    componentWillUnmount() {
        window.removeEventListener('mousedown', this.onClickOutside);
    }

    render() {
        const {store} = this.props;
        return (
            <div className="user-menu" ref={(ref) => this.ref = ref}>
                <h2>My menu</h2>
                <div className="menu">
                    <div className="menu-item">
                        <li><button>My profile</button></li>
                        <li><button>Change Password</button></li>
                        <li><button onClick={()=>{store.signOut() && this.props.onClose()}}>Sign out</button></li>
                    </div>
                </div>
            </div>
        )
    }
}
