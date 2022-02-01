import { ActivityIndicator, Image, InteractionManager, KeyboardAvoidingView, Platform, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useMessages } from '../../api/collections/hooks';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectChatByUsers } from '../../store/slices/chatSlice';
import { startChat } from '../../api/collections/collections';
import { FlatList } from 'react-native-gesture-handler';
import HelperText from '../../components/HelperText';
import Label from '../../components/Label';
import { Colors } from '../../theme';
import { selectUser } from '../../store/slices/authSlice';
import IconButton from '../../components/IconButton';
import FormContainer from '../../components/FormContainer';
import { FONTS } from '../../constants';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { checkIfSendMessageIsLoading, checkIfStartChatIsLoading, sendMessageAsyncAction, startChatAsyncAction } from '../../store/actions/chatActions';

import { USER_PLACEHOLDER } from '../../assets/images';
import { getTimeFromSeconds } from '../../utils';
import { StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function ChatForm({ route, navigation }) {
    const params = route.params;

    const scrollRef = useRef<FlatList>();
    const dispatch = useAppDispatch();

    const user = useAppSelector(selectUser);

    const chat = useAppSelector((store) => selectChatByUsers(store, [user.id, params.item?.id]));
    const messages = useMessages({ chatId: chat?.id });

    //loadings
    const isLoading = useAppSelector(checkIfStartChatIsLoading(params.item.id));
    const sendingMessage = useAppSelector(checkIfSendMessageIsLoading(chat.id));


    const [text, setText] = useState('');

    const handleSendMessage = useCallback(async () => {
        await dispatch(sendMessageAsyncAction({
            chatId: chat.id,
            text,
            userId: user.id
        }));
        setText('');
        scrollToEnd();
    }, [text]);



    useEffect(() => {
        if (!chat?.id) {
            dispatch(startChatAsyncAction({
                toUserId: params.item.id,
            }));
        }
    }, []);

    const handleNavigateToProfile = useCallback(() => {
        navigation.push("ChatProfile", {
            userId: params.item.id,
            fromChat: true
        })
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `${params.item.first_name} ${params.item.last_name}`,
            headerTitleStyle: {
                ...FONTS.regular
            },
            headerRight: <IconButton icon={'information-outline'} onPress={handleNavigateToProfile} />
        })
    }, []);


    const _renderItem = useCallback(({ item }) => {
        return (
            <View style={[styles.messageContainer, { alignSelf: item.isByThisUser ? 'flex-end' : 'flex-start' }]}>
                {!item.isByThisUser && <Image source={USER_PLACEHOLDER} style={styles.messageIcon} resizeMode='cover' />}
                <View style={[styles.message, item.isByThisUser ? styles.fromThisUser : styles.fromOthers]}>
                    <Label style={[styles.messageText, item.isByThisUser ? styles.lightText : undefined]}>{item.text}</Label>
                    <HelperText mode='placeholder' style={[styles.messageTime, item.isByThisUser ? styles.lightText : undefined]}>{getTimeFromSeconds(item.sent_at)}</HelperText>
                </View>
            </View>
        )

    }, []);

    const _keyExtractor = useCallback((item) => item.id, []);

    const scrollToEnd = useCallback(() => {
        setTimeout(() => {
            scrollRef.current.scrollToEnd({ animated: true });
        }, 100);
    }, []);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            keyboardVerticalOffset={100}
            behavior={Platform.OS == 'ios' ? 'padding' : undefined} >
            <FlatList
                data={messages}
                extraData={messages}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
                style={styles.container}
                contentContainerStyle={styles.content}
                refreshing={isLoading}
                ref={scrollRef}
            />
            <View style={styles.inputBar}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder='message'
                    style={styles.input}
                    multiline
                    onFocus={scrollToEnd}
                    enablesReturnKeyAutomatically={false}
                />
                {sendingMessage ?
                    <ActivityIndicator style={styles.sendButton} color={Colors.primary} /> :
                    <IconButton
                        icon='send'
                        onPress={handleSendMessage}
                        style={styles.sendButton}
                        color={Colors.primary}
                        disabled={!text.length} />
                }
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    content: {
        // alignItems: 'flex-start',
    },
    inputBar: {
        height: '100@s',
        backgroundColor: '#efefef',
        flexDirection: 'row',
        alignItems: 'center',

        alignSelf: 'flex-end'
    },
    input: {
        flex: 1,
        height: '100%',
        padding: '16@s',
        paddingTop: '20@s'
    },
    messageContainer: {
        margin: '12@s',
        flexDirection: 'row',
        maxWidth: '80%',
    },
    messageIcon: {
        width: '45@s',
        height: '45@s',
        borderRadius: '25@s',
        alignSelf: 'flex-end',
        marginRight: '8@s',
    },
    message: {
        borderRadius: '20@s',
        padding: '12@s',
        paddingBottom: '2@s',
    },
    messageText: {
        fontSize: '14@s',
        margin: 0,
    },
    messageTime: {
        fontSize: '11@s',
        margin: 0,
        textAlign: 'right'
    },
    lightText: { color: Colors.lightText },
    fromOthers: {
        backgroundColor: '#efefef',
    },
    fromThisUser: {
        backgroundColor: Colors.primary,
    },
    sendButton: {
        marginRight: '10@s',
        width: '50@s',
        height: '50@s',
    },
});
