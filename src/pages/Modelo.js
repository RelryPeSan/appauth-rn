import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function Modelo(){
    return (
        <View style={styles.container}>
            <Text>
                Página modelo.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    }
});