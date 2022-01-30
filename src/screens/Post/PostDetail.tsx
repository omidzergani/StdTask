import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';


//redux
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectPost } from '../../store/slices/postSlice';
import { Post } from '../../api/posts';

//components
import BackButton from '../../components/BackButton';
import Container from '../../components/Container';
import Label from '../../components/Label';

//utils
import { ScaledSheet } from 'react-native-size-matters';
import { Colors } from '../../theme';
import { useAndroidBackHandler } from 'react-navigation-backhandler';

//assets
import { IMAGE_PLACEHOLDER } from '../../assets/images';


export default function PostDetail({ navigation, route }) {
    const params = route.params as { prevScreenName: string; postId: Post['id'] };
    const post = useAppSelector((state) => selectPost(state, params.postId));

    useAndroidBackHandler(() => {
        handleGoBack();
        return true;
    });

    useEffect(() => {
        navigation.setOptions({
            headerLeft: (
                <BackButton
                    onBackPress={handleGoBack}
                />
            ),
        });
    }, []);

    const handleGoBack = useCallback(() => {
        navigation.goBack();
        navigation.navigate(params.prevScreenName);
    }, [params]);


    return (
        <Container>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Image source={IMAGE_PLACEHOLDER} resizeMode='cover' style={styles.image} />
                <Label style={styles.title}>{post.title}</Label>
                <Label style={styles.description} textBreakStrategy='balanced'>
                    {post.description}
                </Label>
            </ScrollView>
        </Container>
    );
}

const styles = ScaledSheet.create({
    container: {
        flexGrow: 1,
    },
    content: {
        alignItems: 'center',
        padding: '12@s',
    },
    image: {
        height: '80%',
        maxHeight: '300@s',
        aspectRatio: 1,
        borderRadius: '40@s'
    },
    title: {
        fontSize: '20@s',
        marginVertical: '10@s'
    },
    description: {
        fontSize: '16@s',
        textAlign: 'center',
        color: Colors.placeholder
    }

});
