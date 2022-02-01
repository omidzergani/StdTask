import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

//utils
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ScaledSheet } from 'react-native-size-matters';
import { useAppDispatch, useAppSelector } from '../../hooks';

//components 
import Container from '../../components/Container';
import Label from '../../components/Label';
import HelperText from '../../components/HelperText';
import Button from '../../components/Button';
import TextInput, { TextInputRef } from '../../components/TextInput';
import { useSelector } from 'react-redux';
import { checkIsLoading } from '../../store/slices/uiSlice';
import { loginAsyncAction } from '../../store/actions/authActions';

interface Props { }


const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email format is wrong.').required('This field is required.'),
    password: Yup.string().required('This field is required.')
});

export default function LoginScreen({ navigation }) {
    const passwordInputRef = useRef<TextInputRef>();
    const dispatch = useAppDispatch();
    const { error, loading, message } = useAppSelector((state) => ({
        loading: checkIsLoading(state, loginAsyncAction.pending.type),
        error: state.auth.error,
        message: state.auth.message,
    }));


    const { values, errors, submitForm, setFieldValue } = useFormik<{ email: string, password: string }>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit(values) {
            dispatch(loginAsyncAction({
                email: values.email,
                password: values.password
            }));
        },
        validateOnChange: false,
        validateOnMount: false,
    });


    const handleNavigateToSignUp = useCallback(() => {
        navigation.navigate('SignUp');
    }, []);

    const handleValueChange = useCallback((name, value) => {
        setFieldValue(name, value);
    }, []);

    const handleFocusOnPassword = useCallback(() => {
        passwordInputRef.current.focus();
    }, []);

    return (
        <Container screenHasHeader={false} style={styles.container}>
            <View style={styles.content}>
                <TextInput
                    placeholder='Email'
                    icon='email-outline'
                    style={styles.input}
                    value={values.email}
                    onChangeText={(value) => handleValueChange('email', value)}
                    onSubmitEditing={handleFocusOnPassword}
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCapitalize={'none'}
                />
                <HelperText weight='bold' mode='error'>{errors.email}</HelperText>

                <TextInput
                    placeholder='Password'
                    icon='lock-outline'
                    style={styles.input}
                    value={values.password}
                    onChangeText={(value) => handleValueChange('password', value)}
                    inputRef={passwordInputRef}
                    returnKeyType='go'
                    secureTextEntry
                    autoCapitalize={'none'}
                    onSubmitEditing={submitForm}
                />

                <HelperText weight='bold' mode='error'>{errors.password}</HelperText>

                <Button
                    style={styles.submit}
                    radius='round'
                    mode='contained'
                    labelStyle={styles.buttonLabel}
                    loading={loading}
                    onPress={submitForm}>
                    Log In
                </Button>
                <HelperText weight='bold' mode='error'>{error ? message : null}</HelperText>
            </View>
            <Button
                weight='light'
                style={styles.footerButton}
                mode='text'
                onPress={handleNavigateToSignUp}>Sign Up</Button>
        </Container>
    );
}

const styles = ScaledSheet.create({
    container: {
        alignItems: 'center',
    },
    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '80%',
        // marginBottom: '24@s'
    },
    submit: {
        width: '80%',
        marginBottom: '24@s',
        height: '45@s',
    },
    buttonLabel: {
        fontSize: '18@s'
    },
    footerButton: {
        borderBottomWidth: 1,
        marginTop: '100@s'
    }
});
