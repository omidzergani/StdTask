import { StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { Persistor, store } from './store';
import Screens from './screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { Colors } from './theme';

export default function App() {
    return (

        <Provider store={store}>
            <PersistGate loading={null} persistor={Persistor}>
                <SafeAreaProvider>
                    <Screens />
                    <StatusBar translucent={true} backgroundColor={Colors.background} />
                </SafeAreaProvider>
            </PersistGate>
        </Provider>

    );
}

const styles = StyleSheet.create({});
