import React, {Component} from 'react'
import _ from 'lodash';
import classNames from 'classnames';

export default class UserForm extends Component {
    state = {
        message: null,
        user: {
            email: '',
            password: ''
        }
    }

    onSubmit = (event) => {
        const {user} = this.state;
        const {store} = this.props;

        event.preventDefault();
        
        this.setState({
            message: null
        }, ()=> {
            store.loginUser(user.email, user.password).then(user => {
                this.setState({
                    message: null
                })
                this.props.onClose();
            }).catch(err => {
                this.setState({
                    message: err
                });
            });
        }
        
    )
        // 
        // if(user.email && user.password) {
        //     // console.log(_.get(user, 'email'), _.get(user, 'password'))
        //     store.loginUser(user.email, user.password).then(user => {
        //         console.log('callback')
        //     }).catch(err => {
        //         console.log('err', err);
        //     });
        // }
    }

    handleTextChange = (event) => {
        let {user} = this.state;
        const field = event.target.name;
        user[field] = event.target.value;

        this.setState({
            user: user
        })
    }
    render() {
        const {user, message} = this.state;

        return (
            <div className="user-form">
                <form onSubmit={this.onSubmit} method="post">
                    {message ? <p className={classNames("app-message", _.get(message, 'type'))}>{_.get(message, '_body')}</p>:null}
                    <div className="user-form__inputs">
                        <input type="email" name="email" id="" className="user-form__input" onChange={(e)=>this.handleTextChange(e)}/>
                        <input type="password" name="password" className="user-form__input" onChange={(e)=>this.handleTextChange(e)}/>
                    </div>
                    <div className="user-form__action">
                        <button type="submit">Log in</button>
                    </div>
                   
                </form>
            </div>
        )
    }
}