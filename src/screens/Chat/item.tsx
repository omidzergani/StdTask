import { Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useAppSelector } from '../../hooks';
import { selectChatByUserId, selectChatByUsers } from '../../store/slices/chatSlice';
import Label from '../../components/Label';
import { ScaledSheet } from 'react-native-size-matters';

import { USER_PLACEHOLDER } from '../../assets/images';
import { Colors } from '../../theme';
import { firebase } from '@react-native-firebase/firestore';
import { getFromTimeString } from '../../utils';

interface Props {
    id: string,

    first_name: string,
    last_name: string,
    email: string,
    online: boolean;
    myId: string;
    onPress: () => void;
}
export default function item({ first_name, last_name, myId, id, online, onPress }: Props) {
    const chat = useAppSelector((state) => selectChatByUsers(state, [myId, id]));

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.image}>
                <Image source={USER_PLACEHOLDER} resizeMode='cover' style={styles.image} />
                <View style={[styles.onlineIndicator, { backgroundColor: Colors[online ? 'success' : 'placeholder'] }]} />
            </View>
            <View style={styles.content}>
                <Label numberOfLines={1} style={styles.name}>{`${first_name} ${last_name}`}</Label>
                <View style={styles.lastMessageContainer}>
                    <Label weight='light' numberOfLines={1} style={styles.message}>{chat?.last_message ?? "Start Chat"}</Label>
                    <Label weight='light' numberOfLines={1} style={styles.time}>{getFromTimeString(chat?.last_message_at)}</Label>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '20@s',
        overflow: 'hidden',
    },
    content: {
        flex: 1,
    },
    image: {
        height: '50@s',
        aspectRatio: 1,
        borderRadius: '30@s',
        marginRight: '8@s',
    },
    lastMessageContainer: {
        flexDirection: 'row',
    },
    name: {
        fontSize: '16@s',
        textAlignVertical: 'center',
    },
    message: {
        textAlignVertical: 'center',
        width: '50%',
    },
    time: {
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'right',
    },
    onlineIndicator: {
        height: '15@s',
        aspectRatio: 1,
        borderRadius: '10@s',
        position: 'absolute',
        bottom: 0,
        right: '4@s',
        borderWidth: '3@s',
        borderColor: '#ffffff'
    }
});
