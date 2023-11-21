import { useEffect, useLayoutEffect } from 'react';
import { 
    View,
    TouchableOpacity, 
} from 'react-native';
import Thumbnail from '../components/Thumbnail';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RequestScreen from './Requset';
import FriendScreen from './Friends';
import ProfileScreen from './Profile';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import useGlobal from '../core/global';

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {

    const socketConnect = useGlobal(state => state.socketConnect)
    const socketClose = useGlobal(state => state.socketClose)
    const user = useGlobal(state => state.user)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    useEffect(() => {
        socketConnect()
        return () => {
            socketClose()
        }
    }, [])

    function onSearch() {
        navigation.navigate('Search')
    }

    return (
        <Tab.Navigator 
            screenOptions={({ route, navigation }) => ({
                headerLeft: () => (
                    <View style={{marginLeft: 16}}>
                        <Thumbnail
                            url={user.thumbnail}
                            size={28}
                        />
                    </View>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        onPress={onSearch}
                    >
                        <FontAwesomeIcon 
                            style={{marginRight: 16}}
                            icon='magnifying-glass' 
                            size={22} 
                            color='#404040' 
                        />
                    </TouchableOpacity>
                ),
                tabBarIcon: ({ focused, color, size }) => {
                    const icons = {
                        Links: 'inbox',
                        Request: 'bell',
                        Profile: 'user'
                    }
                    const icon = icons[route.name]
                    return (
                        <FontAwesomeIcon icon={icon} size={28} color={color} />
                    );
                },
                tabBarActiveTintColor: '#202020',
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen name="Links" component={FriendScreen} />
            <Tab.Screen name="Request" component={RequestScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default Home