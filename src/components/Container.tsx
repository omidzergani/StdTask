
import React, { ReactNode } from 'react';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';

interface Props {
    children: ReactNode,
    screenHasHeader?: boolean
}

const EdgesWithoutTop = ['bottom', 'left', 'right'];
const Edges = ['bottom', 'left', 'right', 'top'];


export default function Container({ children, screenHasHeader = true, ...props }: Props & SafeAreaViewProps) {
    return (
        <SafeAreaView {...props} style={[styles.container, props.style]} edges={screenHasHeader ? EdgesWithoutTop as any : Edges}>
            {children}
        </SafeAreaView>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    }
});
