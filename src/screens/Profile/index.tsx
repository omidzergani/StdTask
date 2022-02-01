import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';


//components
import Button from '../../components/Button';
import Container from '../../components/Container';
import Label from '../../components/Label';

import PostList from '../../components/PostComponents/PostList';
import BackButton from '../../components/BackButton';

//utils
import { ScaledSheet } from 'react-native-size-matters';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Persistor } from '../../store';
import { selectUser } from '../../store/slices/authSlice';



//assets 
import { USER_PLACEHOLDER } from '../../assets/images';
import { Colors } from '../../theme';
import { useIsFocused } from '@react-navigation/native';
import { getPostAsyncAction } from '../../store/actions/postActions';
import { setUserOnline } from '../../api/collections/collections';
import { deleteUserProfile, selectUserProfile } from '../../store/slices/profileSlice';
import { checkIfProfileIsLoading, getUserProfileAsyncAction } from '../../store/actions/profileActions';

export default function ProfileScreen({ navigation, route }) {
    const params = route.params;
    const chatProfile = route.params?.fromChat;
    const dispatch = useAppDispatch();
    const user = useAppSelector(chatProfile ? selectUserProfile(params?.userId) : selectUser);
    const userId = params?.userId ?? user.id;
    const isLoading = useAppSelector(checkIfProfileIsLoading);


    const handleLogOut = useCallback(async () => {
        Persistor.purge();
        setUserOnline(user.id, false);
    }, []);

    const isScreenFocused = useIsFocused();

    useEffect(() => {
        if (isScreenFocused) {
            dispatch(getUserProfileAsyncAction(userId));
            dispatch(getPostAsyncAction(userId));
        }
    }, [isScreenFocused]);


    useLayoutEffect(() => {
        if (!chatProfile) {
            navigation.setOptions({
                headerRight:
                    (<Button
                        weight='regular'
                        radius='sharp'
                        style={styles.logout}
                        labelStyle={styles.logoutLabel}
                        onPress={handleLogOut}>
                        Log Out
                    </Button>),
            })
        }

        return () => {
            //delete the user data by userId after the pushed profile unmounted;
            dispatch(deleteUserProfile(userId));
        }
    }, []);


    if (isLoading) return <ActivityIndicator size={'large'} style={styles.loading} />

    return (
        <Container>
            <View style={styles.header}>
                <Image source={USER_PLACEHOLDER} resizeMode='cover' style={styles.profile} />
                <View>
                    <Label weight='bold' style={styles.name}>{`${user?.firstName} ${user?.lastName}`}</Label>
                    <Label style={styles.email}>{user?.email}</Label>
                </View>
            </View>
            <Label weight='light' style={styles.title}>
                {params?.fromChat ? 'Posts' : 'My Posts'}
            </Label>
            <PostList profileUserId={userId} screenName='Profile' />
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
    },
    loading: {
        paddingTop: '100@s',
    }
});
