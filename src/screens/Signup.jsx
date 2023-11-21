import React, {useLayoutEffect, useState} from 'react'
import { 
    SafeAreaView, 
    View,
    Text,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import api from '../core/api';
import utils from '../core/utils';
import { Title } from '../components/Title';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import useGlobal from '../core/global';

const Signup = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password2Error, setPassword2Error] = useState('');

    const login = useGlobal(state => state.login)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    const onSignUp = () => {
        const failUsername = !username || username.length < 5
        if (failUsername) {
            setUsernameError('Username must be atleast 5 characters');
        }
        const failFirstName = !firstname;
        if (failFirstName) {
            setFirstnameError('First name not provided');
        }
        const failLastName = !lastname;
        if (failLastName) {
            setLastnameError('Last name not provided');
        }
        const failPassword = !password || password.length < 8
        if (failPassword) {
            setPasswordError('Password is too short');
        }
        const failPassword2 = password2 !== password
        if (failPassword2) {
            setPassword2Error(`Password don't match`);
        }
        if (failUsername ||
            failFirstName ||
            failLastName || 
            failPassword ||
            failPassword2
            ) {
            return
        }
        api({
            method: 'POST',
            url: '/chat/signup/',
            data: {
                username: username,
                first_name: firstname,
                last_name: lastname,
                password: password
            }
        }).then(response => {
            utils.log('SignUp', response.data)
            const credentials = {
                username: username,
                password: password
            }
            login(credentials, response.data.user, response.data.tokens)
        }
        ).catch(error => {
            if (error.response) {
                // console.log(error.response.data);
                console.log(error.response.status);
            //     console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
        });
    };    
      
    return (
        <SafeAreaView style={{flex: 1}}>
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
                            setValue={setUsername}
                            error={usernameError}
                            setError={setUsernameError} 
                        />
                        <Input 
                            title="First Name" 
                            value={firstname}
                            setValue={setFirstname}
                            error={firstnameError}
                            setError={setFirstnameError} 
                        />
                        <Input 
                            title="Last Name" 
                            value={lastname}
                            setValue={setLastname}
                            error={lastnameError}
                            setError={setLastnameError} 
                        />
                        <Input 
                            title="Password"
                            value={password}
                            setValue={setPassword}
                            error={passwordError}
                            setError={setPasswordError}
                            secureTextEntry={true}
                        />
                        <Input 
                            title="Retype Password"
                            value={password2}
                            setValue={setPassword2}
                            error={password2Error}
                            setError={setPassword2Error}  
                            secureTextEntry={true}
                        />
                        <Button title="Sign Up" onPress={onSignUp}/>
                        <Text style={{ textAlign: 'center', marginTop: 10 }}>
                            Already have an account? <Text
                            style={{color: 'blue'}}
                            onPress={() => navigation.goBack()}
                            >Log in</Text>
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Signup;