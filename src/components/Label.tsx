import { Platform, StyleSheet, Text, TextProps, View } from 'react-native';
import React from 'react';
import { Colors } from '../theme';
import startCase from 'lodash/startCase';
import { FONTS, WEIGHTS } from '../constants';
import { memo } from 'react';



interface Props {
    weight?: WEIGHTS,
}

function Label(props: Props & TextProps) {
    return <Text {...props} style={[styles.label, FONTS[props.weight ?? 'thin'], props.style]} />;
}

const styles = StyleSheet.create({
    label: {
        color: Colors.text,
    }
});


export default memo(Label, (prev, next) => {
    if (prev.weight !== next.weight) return false
    if (prev.children !== next.children) return false;
    if (prev.style !== next.style) return false;

    return true;
})