import { StyleSheet, TextInput as DefaultTextInput, TextInputProps, View } from 'react-native';
import React from 'react';
import { Colors, DIMENSIONS } from '../theme';
import startCase from 'lodash/startCase';
import { FONTS, WEIGHTS } from '../constants';
import { memo } from 'react';
import { scale, ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



interface Props {
    weight?: WEIGHTS,
    disabled?: boolean;
    icon?: string;
    inputRef?: React.LegacyRef<DefaultTextInput>
}

function TextInput({ weight, icon = 'info', inputRef, ...props }: Props & TextInputProps) {
    const _textInputStyle = [
        styles.input,
        FONTS[weight ?? 'regular'],
    ];

    return <View style={[styles.container, props.style]}>
        <DefaultTextInput {...props} style={_textInputStyle} inlineImageLeft='' placeholderTextColor={Colors.placeholder} ref={inputRef} />
        <Icon name={icon} size={scale(22)} style={styles.icon} color={Colors.placeholder} />
    </View>;
}

const styles = ScaledSheet.create({
    container: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: DIMENSIONS.round * 1.8,
        borderColor: Colors.placeholder,
        height: '45@s',
        overflow: 'hidden',
        backgroundColor: Colors.background,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        color: Colors.text,
        height: '100%',
        flex: 1,
        paddingHorizontal: '20@s',
        fontSize: '13@s',

    },
    icon: {
        width: '30@s',
        textAlign: 'center',
        textAlignVertical: 'bottom',
        marginRight: '16@s',
    }
});

export type TextInputRef = DefaultTextInput;
export default TextInput;


// memo(TextInput, (prev, next) => {
//     if (prev.weight !== next.weight) return false
//     if (prev.value !== next.value) return false;
//     if (prev.style !== next.style) return false;
//     if (prev.onChangeText !== next.onChangeText) return false;
//     if (prev.placeholder !== next.placeholder) return false;
//     if (prev.disabled !== next.disabled) return false;
//     if (prev.icon !== next.icon) return false;
//     if (prev.style !== next.style) return false;

//     return true;
// })