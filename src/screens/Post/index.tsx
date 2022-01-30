import React, { useLayoutEffect, useState } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import Button from '../../components/Button';
import Select from '../../components/Select';
import PostList from '../../components/PostComponents/PostList';



export default function Post({ navigation }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: <Button weight='regular' style={styles.addPost} onPress={() => navigation.navigate('MyProfile', { screen: 'AddPost', initial: false })}>ADD +</Button>,
        })
    }, []);

    return (
        <>
            <PostList screenName='Home' />
        </>
    );
}

const styles = ScaledSheet.create({
    addPost: {
        width: '70@s'
    }
});
