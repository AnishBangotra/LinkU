import React, {useLayoutEffect, useState} from 'react';
import {
    Keyboard,
    SafeAreaView,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import utils from "../core/utils";
import api from '../core/api';
import { Title } from '../components/Title';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import useGlobal from '../core/global';


const Signin = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [responseError, setResponseError] = useState('');
    const login = useGlobal(state => state.login)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
      }, [])
  
    const onSignin = () => {
        const failUsername = !username
        if (failUsername) {
            setUsernameError('Username not provided');
        }
        const failPassword = !password
        if (failPassword) {
            setPasswordError('Password not provided');
        }
        if (failUsername || failPassword) {
            return
        }

        api({
            method: 'POST',
            url: '/chat/signin/',
            data: {
                username: username,
                password: password
            }
        }).then(response => {
            const credentials = {
                username: username,
                password: password
            }
            utils.log('SignIn', response.data)
            login(credentials, response.data.user, response.data.tokens)
            setResponseError('')
        }
        ).catch(error => {
            if (error.response) {
                // console.log(error.response.data);
                console.log(error.response.status);
                if (error.response.status === 401) {
                    setResponseError('Incorrect Username or Password')
                }
            //     console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log(error.message);
              }
              console.log(error.config);
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior='height' style={{flex: 1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ 
                            flex: 1, 
                            justifyContent: 'center',
                            paddingHorizontal: 20,
                        }}
                    >
                        <Title text="LinkU" color="#202020" />
                        <Input 
                            title="Username"
                            value={username}
                            error={usernameError}
                            setValue={setUsername}
                            setError={setUsernameError}
                        />
                        <Input 
                            title="Password" 
                            value={password}
                            error={passwordError} 
                            setValue={setPassword}
                            setError={setPasswordError}
                            secureTextEntry={true}
                        />
                        {responseError.length > 0 ? <Text style={{color: 'red', marginLeft: 3, marginTop: 3}}>{responseError}</Text> : null}
                        <Button title="Sign In" onPress={onSignin}/>
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>
                            Don't have an account? <Text 
                            style={{color: 'blue'}}
                            onPress={() => navigation.navigate('SignUp')}
                            >Sign Up</Text>
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Signin