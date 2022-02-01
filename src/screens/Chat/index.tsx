import { FlatList } from 'react-native';
import React, { useCallback } from 'react';

import { useChatsAndUsers } from '../../api/collections/hooks';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUsers, setChats, setUsers } from '../../store/slices/chatSlice';
import { selectUser } from '../../store/slices/authSlice';
import Items from './item';
import EmptyListMessage from '../../components/EmptyListMessage';
import { ScaledSheet } from 'react-native-size-matters';

export default function ChatScreen({ navigation }) {
    const dispatch = useAppDispatch();
    const profile = useAppSelector(selectUser);
    const users = useAppSelector(selectUsers);
    const userDetail = useAppSelector(selectUser);

    useChatsAndUsers({
        onUser(users) {
            dispatch(setUsers(users));
        },
        onChat(chats) {
            dispatch(setChats(chats));
        },
        ignoreUserIds: [String(profile.id)],
        filterByUserId: userDetail.id,
    });


    const handlePress = item => {
        navigation.navigate('ChatForm', { item });
    }

    const _renderItems = useCallback(({ item }) => {
        return (
            <Items
                {...item}
                myId={userDetail.id}
                onPress={() => handlePress(item)}
            />
        )
    }, []);

    return (
        <FlatList
            data={users}
            extraData={users}
            renderItem={_renderItems}
            style={styles.container}
            contentContainerStyle={styles.content}
            keyExtractor={(item) => `chat-${item.id}`}
            ListEmptyComponent={<EmptyListMessage message='There is no user here' />}
        />
    );
}

const styles = ScaledSheet.create({
    container: {
        flexGrow: 1,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: '16@s',
    },
});
