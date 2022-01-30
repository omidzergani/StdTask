import React, { useRef } from 'react';

//utils
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ScaledSheet } from 'react-native-size-matters';
import { useAppDispatch, useAppSelector } from '../../hooks';

//components 
import Container from '../../components/Container';
import HelperText from '../../components/HelperText';
import Button from '../../components/Button';
import TextInput, { TextInputRef } from '../../components/TextInput';
import { checkIsLoading } from '../../store/slices/uiSlice';
import { loginAsyncAction, signUpAsyncAction } from '../../store/actions/userActions';
import { UserSignUpData } from '../../api/user';
import FormContainer from '../../components/FormContainer';


const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Email format is wrong.').required('This field is required.'),
    firstName: Yup.string().required('This field is required.'),
    lastName: Yup.string().required('This field is required.'),
    password: Yup.string().min(8, 'The min number of characters is 8.').required('This field is required.'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match.').required('This field is required.'),
});


type InputsNames = keyof UserSignUpData | 'passwordConfirm';

export default function SignUpScreen({ navigation }) {
    const inputsRef = useRef({});
    const dispatch = useAppDispatch();

    const { error, loading, message } = useAppSelector((state) => ({
        loading: checkIsLoading(state, loginAsyncAction.pending.type),
        error: state.user.error,
        message: state.user.message,
    }));


    const { values, errors, submitForm, setFieldValue } = useFormik<UserSignUpData & { passwordConfirm: string }>({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            passwordConfirm: '',
        },
        validationSchema: SignUpSchema,
        onSubmit(values) {
            dispatch(signUpAsyncAction(values));
        },
        validateOnChange: false,
        validateOnMount: false,
    });

    const handleValueChange = (name: InputsNames) => (value: string) => {
        setFieldValue(name, value);
    };

    const handleFocus = (name: InputsNames) => () => {
        inputsRef.current[name]?.focus?.();
    };

    const handleRefs = (name: InputsNames) => (ref: TextInputRef) => {
        if (ref) {
            inputsRef.current[name] = ref;
        }
    };

    return (
        <Container screenHasHeader={false} style={styles.container}>
            <FormContainer extraHeight={200} contentContainerStyle={styles.content}>

                <TextInput
                    placeholder='First Name'
                    icon='account-outline'
                    style={styles.input}
                    value={values.firstName}
                    onChangeText={handleValueChange('firstName')}
                    returnKeyType='next'
                    autoCapitalize={'words'}
                    onSubmitEditing={handleFocus('lastName')}

                />
                <HelperText weight='bold' mode='error'>{errors.firstName}</HelperText>
                <TextInput
                    placeholder='Last Name'
                    icon='email-outline'
                    style={styles.input}
                    value={values.lastName}
                    onChangeText={handleValueChange('lastName')}
                    returnKeyType='next'
                    autoCapitalize={'words'}
                    inputRef={handleRefs('lastName')}
                    onSubmitEditing={handleFocus('email')}
                />
                <HelperText weight='bold' mode='error'>{errors.lastName}</HelperText>

                <TextInput
                    placeholder='Email'
                    icon='email-outline'
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleValueChange('email')}
                    onSubmitEditing={handleFocus('password')}
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCapitalize={'none'}
                    inputRef={handleRefs('email')}
                />
                <HelperText weight='bold' mode='error'>{errors.email}</HelperText>

                <TextInput
                    placeholder='Password'
                    icon='lock-outline'
                    style={styles.input}
                    value={values.password}
                    onChangeText={handleValueChange('password')}
                    returnKeyType='next'
                    autoCapitalize={'none'}
                    inputRef={handleRefs('password')}
                    onSubmitEditing={handleFocus('passwordConfirm')}
                />
                <HelperText weight='bold' mode='error'>{errors.password}</HelperText>
                <TextInput
                    placeholder='Password Confirm'
                    icon='lock-outline'
                    style={styles.input}
                    value={values.passwordConfirm}
                    onChangeText={handleValueChange('passwordConfirm')}
                    returnKeyType='go'
                    // secureTextEntry
                    autoCapitalize={'none'}
                    inputRef={handleRefs('passwordConfirm')}
                    onSubmitEditing={submitForm}
                />
                <HelperText weight='bold' mode='error'>{errors.passwordConfirm}</HelperText>
                <HelperText mode='placeholder' style={{ textAlign: 'center' }} weight='light'>
                    By signing up you accept the{' '}
                    <HelperText mode='info'>
                        Terms of Service{' \n'}
                    </HelperText>{' '}
                    and{' '}
                    <HelperText mode='info'>
                        Privacy Policy
                    </HelperText>
                </HelperText>
            </FormContainer>

            <Button
                style={styles.submit}
                radius='round'
                mode='contained'
                labelStyle={styles.buttonLabel}
                loading={loading}
                onPress={submitForm}>
                Sign Up
            </Button>
            {/* <HelperText weight='bold' mode='error'>{error ? message : null}</HelperText> */}

        </Container>
    );
}

const styles = ScaledSheet.create({
    container: {
        alignItems: 'center',
    },
    content: {
        width: '100%',
        alignItems: 'center',
        paddingTop: '50@s',
    },
    input: {
        width: '80%',
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
