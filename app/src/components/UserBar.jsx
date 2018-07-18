import React, {Component} from 'react'
import avatar from '../assets/avatar.png';
import UserForm from  './UserForm';
import UserMenu from './UserMenu';
export default class UserBar extends Component {
    state = {
        showUserForm: false,
        showUserMenu: false
    }

    render() {
        const {store} = this.props;

        const currentUser = store.getCurrentUser();

        return (
            <div className="user-bar">
                {!currentUser
                    ? <button onClick={()=>this.setState({showUserForm:true})}>Login</button>
                    : <div className="user-profile">
                        <div className="user-profile__name">{currentUser.name}</div>
                        <div className="user-profile__image" onClick={() => {this.setState(()=>({showUserMenu: true}))}}>
                            <img src={avatar} alt="avatar" className="user-profile__image"/>
                        </div>
                    </div>
                }

                {console.log(currentUser)}
                {this.state.showUserForm && <UserForm store={store} onClose={()=>this.setState({showUserForm: false})}/>}
                
                {this.state.showUserMenu && <UserMenu onClose={()=>this.setState({showUserMenu: false})} store={store}/>}
            </div>
        )
    }
}
// onClick={this.setState({userForm: true})}