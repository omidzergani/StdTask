import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from '../theme';


const BACK_BUTTON_SIZE = 25;
export default function BackButton({ onBackPress }) {
    return (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Icon name='arrow-left-circle' size={BACK_BUTTON_SIZE} color={Colors.text} />
        </TouchableOpacity>
    );
}

const styles = ScaledSheet.create({
    backButton: {
        height: '50@s',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
