import { StyleSheet } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../theme';
import { ScaledSheet } from 'react-native-size-matters';


interface Props {
    onPress(): void;
    style?: any;
    icon: string;
    color?: string;
    size?: number;
    disabled?: boolean;
}

export default function IconButton({ onPress, style, icon, color = Colors.text, size = 30, disabled }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style, disabled ? styles.disabled : undefined]} disabled={disabled}>
            <Icon name={icon} color={color} size={size} />
        </TouchableOpacity>
    );
}

const styles = ScaledSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '50@s',
        width: '50@s'
    },
    disabled: {
        opacity: 0.5
    }
});
