import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import userService from 'app/services/userService';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

import { setUserData, logoutUser } from './store/userSlice';

class Auth extends Component {
	state = {
		waitAuthCheck: true
	};

	componentDidMount() {
		return Promise.all([
			this.userCheck()
		]).then(() => {
			this.setState({ waitAuthCheck: false });
		});
	}

	userCheck = () =>
		new Promise(resolve => {
			userService.on('onAutoLogin', () => {
				userService
					.signInWithToken()
					.then(data => {
						this.props.setUserData(data);

						resolve();
					})
					.catch(error => {
						this.props.showMessage({ message: error.message });

						resolve();
					});
			});

			userService.on('onAutoLogout', message => {
				if (message) {
					this.props.showMessage({ message });
				}

				this.props.logout();

				resolve();
			});

			userService.on('onNoAccessToken', () => {
				resolve();
			});

			userService.init();

			return Promise.resolve();
		});

	render() {
		return this.state.waitAuthCheck ? <FuseSplashScreen /> : <>{this.props.children}</>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logout: logoutUser,
			setUserData,
			showMessage,
			hideMessage
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Auth);
