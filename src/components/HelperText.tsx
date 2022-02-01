import { Platform, StyleSheet, Text, TextProps, View } from 'react-native';
import React from 'react';
import { Colors } from '../theme';
import startCase from 'lodash/startCase';
import { FONTS, WEIGHTS } from '../constants';
import { ScaledSheet } from 'react-native-size-matters';
import { memo } from 'react';




interface Props {
    weight?: WEIGHTS,
    mode?: 'success' | 'warning' | 'error' | 'info' | 'placeholder'
}


function HelperText({ weight, mode, ...props }: Props & TextProps) {
    return <Text {...props} style={[styles.label, { ...FONTS[weight ?? 'regular'], color: Colors[mode] }, props.style]} />;
}

const styles = ScaledSheet.create({
    label: {
        color: Colors.text,
        fontSize: '12@s',
        marginVertical: '6@s'
    }
});



export default memo(HelperText, (prev, next) => {
    if (prev.weight !== next.weight) return false
    if (prev.mode !== next.mode) return false;
    if (prev.children !== next.children) return false;
    if (prev.style !== next.style) return false;
    return true;
})