import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TabBarIcon({ color, size, name }) {
    return (
        <Icon name={name} size={size + 2} color={color} />
    );
}

