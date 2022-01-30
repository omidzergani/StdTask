
import { StyleSheet } from 'react-native';
import React, { ReactNode } from 'react';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view'

export default function FormContainer({ children, ...props }: KeyboardAwareScrollViewProps) {
    return (
        <KeyboardAwareScrollView {...props} style={[styles.container, props.style]} extraScrollHeight={10} enableOnAndroid>
            {children}
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
