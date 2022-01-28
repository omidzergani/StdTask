import React, { useMemo } from 'react';
import {
    ActivityIndicator,
    StyleProp,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';
import { Colors } from '../theme';
import { ScaledSheet } from 'react-native-size-matters';
import { memo } from 'react';
import Label from './Label';
import { WEIGHTS } from '../constants';

interface Props {
    mode?: 'contained' | 'text' | 'outline',
    color?: string,
    weight?: WEIGHTS,
    radius?: 'pill' | 'round' | 'sharp',
    labelStyle?: StyleProp<TextStyle>,
    loading?: boolean;
}


function Button({
    mode = 'contained',
    weight = 'medium',
    color = Colors.primary,
    radius = 'round',
    loading = false,
    disabled = false,
    labelStyle,
    children,
    ...props }: Props & TouchableOpacityProps) {

    const _touchableStyle = useMemo(() => [
        styles.button,
        styles[radius],
        mode == 'contained' ? { backgroundColor: color } : undefined,
        mode == 'outline' ? { borderWidth: 1, borderColor: color } : undefined,
        props.style,
        disabled ? styles.disabledButton : undefined,
    ], [mode, disabled, color, radius, props.style]);

    const _labelStyle = useMemo(() => [
        mode == 'contained' ? styles.lightLabel : styles.label,
        mode == 'outline' ? { color } : styles.label,
        labelStyle,
    ], [mode, labelStyle, color]);

    return (
        <TouchableOpacity {...props} style={_touchableStyle} disabled={disabled}>
            <Label weight={weight} style={_labelStyle}>
                {children}
            </Label>
            {loading ?
                <ActivityIndicator style={styles.loading} size={'small'} color={mode == 'contained' ? Colors.lightText : color} animating={true} /> : null}
        </TouchableOpacity>
    );
}

const styles = ScaledSheet.create({
    button: {
        margin: '16@s',
        width: '100@s',
        height: '30@s',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    disabledButton: {
        // backgroundColor: Colors.placeholder,
        opacity: 0.5,
    },
    loading: {
        marginHorizontal: '5@s'
    },
    pill: {
        borderRadius: '100@s'
    },
    round: {
        borderRadius: "6@s"
    },
    lightLabel: {
        fontSize: '14@s',
        color: Colors.lightText
    },
    label: {
        fontSize: '14@s',
    }
});


export default memo(Button, (prev, next) => {
    if (prev.color !== next.color) return false;
    if (prev.mode !== next.mode) return false;
    if (prev.children !== next.children) return false;
    if (prev.weight !== next.weight) return false;
    if (prev.radius !== next.radius) return false;
    if (prev.disabled !== next.disabled) return false;
    if (prev.loading !== next.loading) return false;
    if (prev.style !== next.style) return false;

    return true;
})