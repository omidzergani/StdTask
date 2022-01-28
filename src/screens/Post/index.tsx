import React, { useLayoutEffect } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import Button from '../../components/Button';
import PostList from './components/PostList';



export default function Post({ navigation }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: <Button weight='regular' style={styles.addPost} onPress={() => navigation.navigate('MyProfile', { screen: 'AddPost' })}>ADD +</Button>,
        })
    }, []);


    return (
        <PostList />
    );
}

const styles = ScaledSheet.create({
    addPost: {
        width: '70@s'
    }
});
