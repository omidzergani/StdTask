import React, { ReactNode, useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, Modal, View, useWindowDimensions, Dimensions, StatusBar, Platform } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { ScaledSheet } from 'react-native-size-matters';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Colors } from '../../src/theme';

const SPRING_CONFIG = {
    damping: 80,
    overshootingClamping: true,
    resetDisplacementThreshold: 0.1,
    resetSpeedThreshold: 0.1,
    stiffness: 500
};
const BOTTOM_SPACE = getBottomSpace();
const WINDOW_HEIGHT = Dimensions.get('window').height;

interface Props {
    children?: ReactNode;
    visible?: boolean;
    style?: any,
    onDismiss?: () => void;
}

function BottomSheet({ children, visible, onDismiss, style }: Props) {
    const [modalVisible, setModalVisible] = useState(false);

    const dimension = useWindowDimensions();
    const viewHeight = useSharedValue(0);
    const startTop = useSharedValue(0);
    const top = useSharedValue(dimension.height);

    useLayoutEffect(() => {
        if (visible) {
            setModalVisible(true);
            showBottomSheet();
        } else {
            hideBottomSheet();
        }
    }, [visible]);


    const showBottomSheet = useCallback(() => {
        top.value = withSpring(WINDOW_HEIGHT - viewHeight.value, SPRING_CONFIG);
        if (Platform.OS == 'android') {
            StatusBar.setBackgroundColor(Colors.modalBackColor, true);
        }
    }, []);

    const hideBottomSheet = () => {
        top.value = withSpring(WINDOW_HEIGHT, SPRING_CONFIG, () => {
            runOnJS(setModalVisible)(false);
        });
        if (Platform.OS == 'android') {
            StatusBar.setBackgroundColor(Colors.background, true);
        }
    };


    // get content view height to use as default size of the bottom sheet
    const handleViewLayout = (event) => {
        const height = event.nativeEvent.layout.height + BOTTOM_SPACE;
        viewHeight.value = height;

        // if visible set the initial height of the view
        if (visible) {
            top.value = withSpring(WINDOW_HEIGHT - height, SPRING_CONFIG);
        }
    }

    const animatedStyle = useAnimatedStyle(() => ({
        top: top.value
    }));

    const gesture = Gesture.Pan()
        .onStart(() => {
            startTop.value = top.value;
        })
        .onUpdate((event) => {
            top.value = withSpring(startTop.value + event.translationY, SPRING_CONFIG);
        }).onEnd(() => {
            if (top.value > WINDOW_HEIGHT - viewHeight.value + (viewHeight.value * 0.1)) {
                top.value = withSpring(WINDOW_HEIGHT, SPRING_CONFIG, runOnJS(onDismiss));
            } else {
                top.value = withSpring(WINDOW_HEIGHT - viewHeight.value, SPRING_CONFIG);
            }
        });


    return (
        <Modal
            visible={modalVisible}
            transparent
            animationType='fade'
            onRequestClose={onDismiss}
            onDismiss={onDismiss}
        >
            <GestureHandlerRootView style={StyleSheet.absoluteFill}>
                <GestureDetector gesture={gesture}>
                    <View style={styles.container}>
                        <Animated.View style={[styles.bottomSheet, animatedStyle]}>
                            <View style={[styles.content, style]} onLayout={handleViewLayout}>
                                {children}
                            </View>
                        </Animated.View>
                    </View>
                </GestureDetector>
            </GestureHandlerRootView>
        </Modal>

    );
}

const styles = ScaledSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.modalBackColor,
    },
    bottomSheet: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.background,
        borderTopRightRadius: '6@s',
        borderTopLeftRadius: '6@s',
        overflow: 'hidden',
    },
    content: {
        width: '100%',
    }
});



export default BottomSheet;