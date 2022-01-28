import React, { useEffect, useCallback } from 'react';
import { Alert, FlatList, ListRenderItem, RefreshControl } from 'react-native'

// components
import PostItem from './PostItem';


//store
import { deletePostAsyncAction, getPostAsyncAction } from '../../../store/actions/postActions';
import { checkIsLoading, getUpdatingItemsId } from '../../../store/slices/uiSlice';
import { selectPostsArray, selectUserPostsArray } from '../../../store/slices/postSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Post } from '../../../api/posts';

//utils
import { useNavigation } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters';


//selectors
import { selectUser } from '../../../store/slices/userSlice';

interface Props {
    getUserPosts?: boolean;
}
export default function PostList({ getUserPosts }: Props) {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>();

    const posts = useAppSelector(getUserPosts ? selectUserPostsArray : selectPostsArray);

    const isLoading = useAppSelector((state) => checkIsLoading(state, getPostAsyncAction.pending.type));
    const deletingItems = useAppSelector((state) => getUpdatingItemsId(state, deletePostAsyncAction.pending.type));
    const user = useAppSelector(selectUser);

    useEffect(() => {
        handleGetPosts();
    }, []);

    const handleGetPosts = useCallback(() => {
        dispatch(getPostAsyncAction({ getUserPosts }))
    }, [getUserPosts]);


    const handleDetail = (postId: Post['id']) => {
        navigation.navigate('MyProfile', { screen: 'PostDetail', params: { postId } });
    }
    const handleEdit = (postId: Post['id']) => {
        navigation.navigate('MyProfile', { screen: 'EditPost', params: { postId } });
    }

    const handleDelete = (postId: Post['id']) => {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete post',
            [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        dispatch(deletePostAsyncAction({ postId, getUserPosts }));
                    }
                }
            ]);
    }

    const _renderItems: ListRenderItem<Post> = useCallback(({ item }) => {
        return <PostItem
            post={item}
            onDetail={() => handleDetail(item.id)}
            byThisUser={user.id === item.userId}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
            deleteLoading={deletingItems.includes(item.id)}
        />
    }, [deletingItems]);
    const _keyExtractor = useCallback((item) => `post-${item.id}`, []);

    return (
        <FlatList
            data={posts}
            extraData={posts}
            renderItem={_renderItems}
            keyExtractor={_keyExtractor}
            refreshing={isLoading}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={handleGetPosts}
                    size={25}
                />
            }
            maxToRenderPerBatch={5}
            style={styles.list}
            contentContainerStyle={styles.content}
        />
    );
}

const styles = ScaledSheet.create({
    list: {
        flex: 1,

    },
    content: {
        padding: '16@s',
    }
});
