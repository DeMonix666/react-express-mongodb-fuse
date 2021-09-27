import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable camelcase */

class UserService extends FuseUtils.EventEmitter {
    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(
            response => {
                return response;
            },
            err => {
                return new Promise((resolve, reject) => {
                    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                        // if you ever get an unauthorized response, logout the user
                        this.emit('onAutoLogout', 'Invalid access_token');
                        this.setSession(null);
                    }
                    throw err;
                });
            }
        );
    };

    handleAuthentication = () => {
        const access_token = this.getAccessToken();

        if (!access_token) {
            this.emit('onNoAccessToken');
            return;
        }

        if (this.isAuthTokenValid(access_token)) {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        } else {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = data => {
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.REACT_APP_ENDPOINT}/users/register`, data)
            .then(response => {
                if (response.data.code === 1) {
                    this.setSession(response.data.token);
                    resolve(response.data.data);
                } else{
                    reject((response.data.errorFields !== undefined) ? FuseUtils.parseErrorFields(response.data.errorFields) : [
                        {
                            type: 'username',
                            message: response.data.message
                        }
                    ]);
                }
            });
        });
    };

    signIn = (username, password) => {
        return new Promise((resolve, reject) => {
            axios
            .post(`${process.env.REACT_APP_ENDPOINT}/users/login`,  {
                username,
                password
            })
            .then(response => {
                if (response.data.code === 1) {
                    this.setSession(response.data.token);
                    resolve(response.data.data);
                } else{
                    reject((response.data.errorFields !== undefined) ? FuseUtils.parseErrorFields(response.data.errorFields) : [
                        {
                            type: 'username',
                            message: response.data.message
                        }
                    ]);
                }
            });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.REACT_APP_ENDPOINT}/users/refreshtoken`)
                .then(response => {
                    if (response.data.code === 1) {
                        this.setSession(response.data.token);
                        resolve(response.data.data);
                    } else {
                        this.logout();
                        reject(new Error('Failed to login with token.'));
                    }
                })
                .catch(error => {
                    this.logout();
                    reject(new Error('Failed to login with token.'));
                });
        });
    };

    updateUserData = user => {
        return axios.post(`${process.env.REACT_APP_ENDPOINT}/auth/user/update`, { user });
    };

    setSession = access_token => {
        console.log('setSession');
        console.log(access_token);

        if (access_token) {
            localStorage.setItem('access_token', access_token);
            axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        } else {
            localStorage.removeItem('access_token');
            delete axios.defaults.headers.common.Authorization;
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = access_token => {
        if (!access_token) {
            return false;
        }

        return true;
    };

    getAccessToken = () => {
        return window.localStorage.getItem('access_token');
    };
}

const instance = new UserService();

export default instance;
