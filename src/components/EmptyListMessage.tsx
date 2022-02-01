import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { scale, ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Label from './Label';
import { Colors } from '../theme';

export default function EmptyListMessage({ message = 'There is not item to show', icon = 'format-list-bulleted' }) {
    return (
        <View style={styles.container}>
            <Icon name={icon} style={styles.icon} size={scale(60)} color={Colors.placeholder} />
            <Label style={styles.label}>
                {message}
            </Label>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        minHeight: '80%',
    },
    label: {
        color: Colors.placeholder,
        fontSize: '15@s',
    },
    icon: {
        aspectRatio: 1,
        borderRadius: '50@s',
        marginBottom: '20@s'
    },
});
