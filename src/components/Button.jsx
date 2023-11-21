import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';

export const Button = ({title, onPress}) => {
    return(
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: '#202020',
                height: 52,
                borderRadius: 26,
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
};