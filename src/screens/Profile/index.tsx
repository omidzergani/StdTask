import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';


//components
import Button from '../../components/Button';
import Container from '../../components/Container';
import Label from '../../components/Label';
import HelperText from '../../components/HelperText';
import PostList from '../../components/PostComponents/PostList';

//utils
import { ScaledSheet } from 'react-native-size-matters';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Persistor } from '../../store';
import { selectUser } from '../../store/slices/userSlice';



//assets 
import { USER_PLACEHOLDER } from '../../assets/images';
import { Colors } from '../../theme';
import { useIsFocused } from '@react-navigation/native';
import { getPostAsyncAction } from '../../store/actions/postActions';

export default function ProfileScreen({ navigation }) {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const handleLogOut = useCallback(() => {
        Persistor.purge();
    }, []);

    const isScreenFocused = useIsFocused();
    useEffect(() => {
        if (isScreenFocused) {
            dispatch(getPostAsyncAction(true));
        }
    }, [isScreenFocused]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: (
                <Button
                    weight='regular'
                    radius='sharp'
                    style={styles.logout}
                    labelStyle={styles.logoutLabel}
                    onPress={handleLogOut}>
                    Log Out
                </Button>
            ),
        })
    }, []);


    return (
        <Container>
            <View style={styles.header}>
                <Image source={USER_PLACEHOLDER} resizeMode='cover' style={styles.profile} />
                <View>
                    <Label weight='bold' style={styles.name}>{`${user.firstName} ${user.lastName}`}</Label>
                    <Label style={styles.email}>{user.email}</Label>
                </View>
            </View>
            <Label weight='light' style={styles.title}>
                My Posts
            </Label>
            <PostList getUserPosts screenName='Profile' />
        </Container>
    );
}

const styles = ScaledSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profile: {
        width: '60@s',
        aspectRatio: 1,
        borderRadius: '30@s',
        margin: '12@s'
    },

    name: {
        textTransform: 'uppercase'
    },
    email: {
        fontSize: '14@s',
        color: Colors.placeholder,
    },

    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: '18@s'
    },
    logout: {

    },
    logoutLabel: {
        fontSize: '16@s',
    }
});
