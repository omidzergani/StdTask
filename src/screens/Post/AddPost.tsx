import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Image, View } from 'react-native';

// components
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import HelperText from '../../components/HelperText';
import Select from '../../components/Select';
import BackButton from '../../components/BackButton';

// redux
import { useSelector } from 'react-redux';
import { addPostAsyncAction, checkIfAddPostIsLoading, getPostAsyncAction } from '../../store/actions/postActions';
import { selectUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks';
import { IMAGE_PLACEHOLDER } from '../../assets/images';
import { DIMENSIONS } from '../../theme';
import { PostBody } from '../../api/posts';

//utils
import { useFormik } from 'formik';
import { ScaledSheet } from 'react-native-size-matters';
import * as Yup from 'yup';
import FormContainer from '../../components/FormContainer';
import { useAndroidBackHandler } from 'react-navigation-backhandler';


const CATEGORIES = ['Category 1', 'Category 2', 'Category 3'];
const addPostSchema = Yup.object().shape({
    title: Yup.string().max(50, 'The max number of characters is 50.').required('This field is required.'),
    description: Yup.string().max(50, 'The max number of characters is 50.').required('This field is required.'),
    category: Yup.string().required('This field is required.'),
});


export default function AddPost({ navigation }) {
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);
    const isLoading = useSelector(checkIfAddPostIsLoading);

    const { values, errors, setFieldValue, submitForm, resetForm } = useFormik<PostBody>({
        initialValues: {
            category: '',
            description: '',
            title: '',
            userId: user.id,
            website: '',
        },
        validationSchema: addPostSchema,
        async onSubmit(values) {
            const { meta: { arg } } = await dispatch(addPostAsyncAction(values));
            if (arg.title) {
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
        navigation.navigate('Home');
    }, []);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: <Button weight='regular' style={styles.create} onPress={submitForm} loading={isLoading}>CREATE</Button>,
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
