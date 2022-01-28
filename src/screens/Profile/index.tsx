import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import Button from '../../components/Button';
import { useAppDispatch } from '../../hooks';
import { Persistor } from '../../store';

export default function ProfileScreen({ }) {
    const dispatch = useAppDispatch();

    const handleLogOut = useCallback(() => {
        Persistor.purge();
    }, []);

    return (
        <View>
            <Button onPress={handleLogOut} mode='contained'>Logout</Button>
        </View>
    );
}

const styles = StyleSheet.create({});
