import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

//navigators
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screens
import LoginScreen from './Login';
import SignUpScreen from './SignUp';
import HomeScreen from './Home';
import ChatScreen from './Chat';
import ProfileScreen from './Profile';
import AddPost from './Post/AddPost';
import EditPost from './Post/EditPost';

//slices
import { selectIsSignedIn } from '../store/slices/userSlice';

//components
import Header from '../components/Header';
import TabBarIcon from '../components/TabBarIcon';
import { Colors } from '../theme';
import { scale, ScaledSheet } from 'react-native-size-matters';

import { getBottomSpace } from 'react-native-iphone-x-helper';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#fff',
        primary: '#333'
    },
};

export default function RootScreens() {
    const isSignedIn = useSelector(selectIsSignedIn);
    return (
        <NavigationContainer theme={Theme}>
            <RootStack.Navigator initialRouteName={isSignedIn ? 'Login' : 'Landing'} screenOptions={defaultOptions}>
                {!isSignedIn && <Fragment>
                    <RootStack.Screen name='Login' component={LoginScreen} options={{ title: 'LOGIN' }} />
                    <RootStack.Screen name='SignUp' component={SignUpScreen} options={{ title: 'SIGN UP' }} />
                </Fragment>}
                {!!isSignedIn && <RootStack.Screen name='Landing' component={LandingStackScreen} options={{ headerShown: false }} />}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}


function LandingStackScreen() {
    return (
        <Tab.Navigator
            screenOptions={{
                ...defaultOptions,
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.text,
                tabBarStyle: styles.tabBar
            }}
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{ tabBarIcon: (props) => <TabBarIcon {...props} name={'home-outline'} /> }}
            />
            <Tab.Screen
                name='Chat'
                component={ChatScreen}
                options={{ tabBarIcon: (props) => <TabBarIcon {...props} name={'chat-outline'} /> }}
            />
            <Tab.Screen
                name='MyProfile'
                component={ProfileStackScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: (props) => <TabBarIcon {...props} name={'account-outline'} />
                }}
            />
        </Tab.Navigator>
    );
}


function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator initialRouteName='Profile' screenOptions={defaultOptions}>
            <ProfileStack.Screen name='Profile' component={ProfileScreen} />
            <ProfileStack.Screen name='AddPost' component={AddPost} />
            <ProfileStack.Screen name='EditPost' component={EditPost} />
        </ProfileStack.Navigator>
    )
}


const defaultOptions: any = {
    header: (props) => <Header {...props} />,
}



const styles = ScaledSheet.create({
    tabBar: {
        borderTopWidth: 0,
        height: getBottomSpace() + scale(45),
        paddingBottom: getBottomSpace() + 5,
        paddingTop: '15@s',
    }
})