import { StyleProp, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Colors, DIMENSIONS } from '../theme';
import BottomSheet from './BottomSheet';
import Label from './Label';
import { scale, ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


interface Props {
    placeholder: string;
    icon?: string;
    items: string[],
    value: string;
    onChange?: (value: string) => void;
    style: StyleProp<any>
}

export default function Select({ placeholder, style, value, items, onChange }: Props) {
    const [visible, setVisible] = useState(false);

    const handleDismiss = useCallback(() => {
        setVisible(false)
    }, []);

    const handleOpen = useCallback(() => {
        setVisible(true)
    }, []);


    const handleChange = (value: string) => () => {
        onChange?.(value);
        handleDismiss();
    }

    const renderItem = (el: string) => {
        return (
            <TouchableOpacity onPress={handleChange(el)} style={styles.item} key={el}>
                <Label style={styles.label}>{el}</Label>
                {el === value ? <Icon name={'check'} size={scale(22)} style={styles.icon} color={Colors.primary} /> : null}
            </TouchableOpacity>
        );
    }
    return (
        <>
            <TouchableOpacity onPress={handleOpen} style={[styles.container, style]}>
                <Label style={value ? styles.label : styles.placeholder}>{value?.length ? value : placeholder}</Label>
            </TouchableOpacity>
            <BottomSheet style={styles.bottomSheet} visible={visible} onDismiss={handleDismiss}>
                <Label weight='bold' style={styles.title}>{placeholder}</Label>
                {items.map(renderItem)}
            </BottomSheet>
        </>
    );
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
    label: {
        color: Colors.text,
        flex: 1,
        paddingHorizontal: '20@s',
        fontSize: '13@s',
        textAlignVertical: 'center',
    },
    placeholder: {
        color: Colors.placeholder,
        flex: 1,
        paddingHorizontal: '20@s',
        fontSize: '13@s',
        textAlignVertical: 'center',
    },
    icon: {
        width: '30@s',
        textAlign: 'center',
        textAlignVertical: 'bottom',
        marginRight: '16@s',
    },
    item: {
        height: '45@s',
        flexDirection: 'row',
    },
    title: {
        width: '100%',
        fontSize: '18@s',
        textAlign: 'center',
        marginVertical: '8@s',
        height: '20@s',
    },
    bottomSheet: {
        minHeight: '100@s',
    }
});
