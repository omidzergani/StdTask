import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Image } from 'react-native';

// components
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import HelperText from '../../components/HelperText';
import Select from '../../components/Select';
import BackButton from '../../components/BackButton';

// redux
import { checkIfUpdatePostIsLoading, updatePostAsyncAction } from '../../store/actions/postActions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IMAGE_PLACEHOLDER } from '../../assets/images';
import { DIMENSIONS } from '../../theme';
import { Post, PostBody } from '../../api/posts';

//utils
import { useFormik } from 'formik';
import { ScaledSheet } from 'react-native-size-matters';
import * as Yup from 'yup';
import FormContainer from '../../components/FormContainer';
import { selectPost } from '../../store/slices/postSlice';

import { useAndroidBackHandler } from 'react-navigation-backhandler';

const CATEGORIES = ['Category 1', 'Category 2', 'Category 3'];
const editPostSchema = Yup.object().shape({
    title: Yup.string().max(50, 'The max number of characters is 50.').required('This field is required.'),
    description: Yup.string().max(50, 'The max number of characters is 50.').required('This field is required.'),
    category: Yup.string().required('This field is required.'),
});


export default function EditPost({ navigation, route }) {
    const params = route.params as { prevScreenName: string; postId: Post['id'] };
    const dispatch = useAppDispatch();
    const post = useAppSelector((state) => selectPost(state, params.postId));
    const isLoading = useAppSelector(checkIfUpdatePostIsLoading);

    const { values, errors, setFieldValue, submitForm, resetForm } = useFormik<PostBody>({
        initialValues: {
            category: post.category,
            description: post.description,
            title: post.title,
            userId: post.userId,
            website: post.website,
            time: post.time,
        },
        validationSchema: editPostSchema,
        async onSubmit(values) {
            const { meta: { arg } } = await dispatch(updatePostAsyncAction({ post: values, postId: params.postId }));
            if (arg.post.title) {
                resetForm();
                handleGoBack();
            }
        },
        validateOnChange: false,
    });


    useAndroidBackHandler(() => {
        handleGoBack();
        return true;
    });

    useEffect(() => {
        navigation.setOptions({
            headerLeft: (
                <BackButton
                    onBackPress={handleGoBack}
                />),
        });
    }, []);

    const handleGoBack = useCallback(() => {
        navigation.goBack();
        navigation.navigate(params.prevScreenName);
    }, [params.prevScreenName]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: <Button weight='regular' style={styles.create} onPress={submitForm} loading={isLoading}>UPDATE</Button>,
        });
    }, [isLoading]);


    const handleChange = (name: keyof PostBody) => (value: any) => {
        setFieldValue(name, value);
    }


    return (
        <FormContainer style={styles.container} contentContainerStyle={styles.content} >
            <Image source={IMAGE_PLACEHOLDER} resizeMode='cover' style={styles.image} />
            <TextInput
                placeholder='Title'
                value={values.title}
                onChangeText={handleChange('title')}
                icon='information-outline'
                style={styles.input}

            />
            <HelperText mode='error'>{errors.title}</HelperText>
            <TextInput
                placeholder='Description'
                value={values.description}
                onChangeText={handleChange('description')}
                icon='information-outline'
                style={styles.input}
            />
            <HelperText mode='error'>{errors.description}</HelperText>
            <Select
                placeholder='Category'
                items={CATEGORIES}
                value={values.category}
                onChange={handleChange('category')}
                style={styles.input}
            />
            <HelperText mode='error'>{errors.category}</HelperText>

            <TextInput
                placeholder='Website'
                value={values.website}
                onChangeText={handleChange('website')}
                icon='web'
                style={styles.input}

            />
        </FormContainer>
    );
}

const styles = ScaledSheet.create({
    container: {
        width: '100%',
    },
    content: {
        alignItems: 'center',
        width: '100%',
        paddingTop: '20@s'

    },
    create: {
        width: '95@s'
    },
    image: {
        height: '120@s',
        aspectRatio: 1,
        borderRadius: DIMENSIONS.border,
        marginBottom: '16@s',
    },
    input: {
        width: '80%',
    }
});
