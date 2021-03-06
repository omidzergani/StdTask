import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

//components
import Label from './Label';
import BackButton from './BackButton';

//utils
import { getHeaderTitle } from '@react-navigation/elements';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Colors } from '../theme';
import { scale } from 'react-native-size-matters';

export default function Header({ navigation, options, route, back }: NativeStackHeaderProps) {
    const title = getHeaderTitle(options, route.name);

    const backButton = useMemo(() => {
        if (!back) return null;
        return (
            <BackButton onBackPress={navigation.goBack} />
        );
    }, []);


    return (
        <View style={[styles.container, options.headerStyle]}>
            <View style={styles.headerSide}>
                {options.headerLeft ?? backButton}
            </View>
            <View style={styles.titleContainer}>
                <Label weight='thin' style={[styles.title, options.headerTitleStyle]}>
                    {title}
                </Label>
            </View>
            <View style={styles.headerSide}>
                {options.headerRight}
            </View>
        </View>
    );
}

const PADDING_TOP = getStatusBarHeight(true);
const HEIGHT = scale(50);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        width: '100%',
        paddingTop: PADDING_TOP,
        height: HEIGHT + PADDING_TOP,
        paddingHorizontal: 8,
    },
    icon: {
        backgroundColor: "grey"
    },
    title: {
        fontSize: scale(20),
        color: Colors.text,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    headerSide: {
        zIndex: 2,
    },
    titleContainer: {
        paddingTop: PADDING_TOP,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
