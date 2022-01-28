import { View, Image } from 'react-native';
import React from 'react';
//components

import Button from '../../../components/Button';

//utils
import { ScaledSheet } from 'react-native-size-matters';

//types
import { Post } from '../../../api/posts';
import Label from '../../../components/Label';


import { IMAGE_PLACEHOLDER } from '../../../assets/images';
import { Colors } from '../../../theme';

interface Props {
    post: Post,
    byThisUser?: boolean,
    onEdit?: () => void;
    onDelete?: () => void;
    onDetail: () => void;
    deleteLoading: boolean;
}

export default function PostItem({ onDelete, onDetail, onEdit, post, byThisUser, deleteLoading = false }: Props) {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={IMAGE_PLACEHOLDER} style={styles.placeholder} resizeMode='cover' />
                <View style={styles.info}>
                    <Label style={styles.title}>{post.title}</Label>
                    <Label style={styles.description} weight='light' numberOfLines={3} textBreakStrategy='simple'>{post.description}</Label>
                </View>
            </View>
            <View style={styles.actions}>
                <Button
                    labelStyle={styles.buttonsLabel}
                    style={styles.detailButton}
                    onPress={onDetail}
                    weight='regular'
                >
                    Details
                </Button>
                {!!byThisUser &&
                    <View style={styles.authorActions}>
                        <Button
                            labelStyle={styles.buttonsLabel}
                            style={styles.deleteButton}
                            onPress={onDelete}
                            weight='regular'
                            loading={deleteLoading}
                            disabled={deleteLoading}
                        >
                            Delete
                        </Button>
                        <Button
                            labelStyle={styles.buttonsLabel}
                            style={styles.editButton}
                            onPress={onEdit}
                            weight='regular'

                        >
                            Edit
                        </Button>
                    </View>
                }
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        padding: '6@s'
    },
    content: {
        flexDirection: 'row',
        overflow: 'hidden',
        width: '100%',
    },
    placeholder: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: '10@s',
    },
    info: {
        flex: 2,
    },
    title: {
        fontSize: '20@s',
        textAlign: 'center',
    },
    description: {
        fontSize: '17@s',
        textAlign: 'center',
        color: Colors.placeholder,
        paddingHorizontal: '8@s'
    },

    actions: {
        flexDirection: 'row',
        height: '30@s',
        width: '100%',
        marginTop: '8@s',
    },
    authorActions: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    editButton: {
        height: '100%',
        width: '20%',
        margin: 0,
        marginLeft: '5@s',
    },
    deleteButton: {
        height: '100%',
        minWidth: '30%',
        flex: 1,
        maxWidth: '40%',
        margin: 0,

    },
    detailButton: {
        height: '100%',
        // flexShrink: 1,
        margin: 0,
    },
    buttonsLabel: {
        fontSize: '16@s'
    }
});
