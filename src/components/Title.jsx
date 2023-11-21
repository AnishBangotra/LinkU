import React from 'react';
import {
    Text
} from 'react-native';

export const Title = ({ text, color }) => {
  return (
    <Text
      style={{
          color: color,
          textAlign: 'center',
          fontSize: 48,
          fontFamily: 'LeckerliOne-Regular',
          marginBottom: 30,
    }}
    >{text}
    </Text>
  )
}
