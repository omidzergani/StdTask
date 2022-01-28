import { StyleSheet } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { Persistor, store } from './store';
import Screens from './screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={Persistor}>
                <SafeAreaProvider>
                    <Screens />
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}

const styles = StyleSheet.create({});
