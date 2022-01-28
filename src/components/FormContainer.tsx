
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface Props {
    children: ReactNode,
    screenHasHeader: boolean
}

const EdgesWithoutTop = ['bottom', 'left', 'right'];
const Edges = ['bottom', 'left', 'right', 'top'];


export default function Container({ children, screenHasHeader = true, ...props }: Props & SafeAreaViewProps) {
    return (
        <SafeAreaView {...props} style={[styles.container, props.style]} edges={screenHasHeader ? Edges : EdgesWithoutTop as any}>
            <KeyboardAwareScrollView>
                {children}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
