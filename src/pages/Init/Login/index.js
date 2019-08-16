import React, { useState, useEffect } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from '../../../styles';
import md5 from 'md5';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../../services/api';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('relry.pesan');
    const [password, setPassword] = useState('12345678');

    useEffect(() => {
        AsyncStorage.getItem('usuario._id').then(userId => {
            if(userId){
                console.log(`_id: ${userId}`);
                navigation.navigate('Home');
            }
        });
        console.log(`Inicialização.`);
    }, []);

    async function handleLogar(){
        if(username.length === 0 || password.length === 0 ) {
            Alert.alert('Ops!', 'Preencha todos os campos.');
            return;
        }

        try {
            Alert.alert('Aguarde...', 'Estamos verificando sua autenticação, espere um momento.');
            const retorno = await api.get(`/login/${username}/${md5(password)}`);
            console.log(retorno);
            
            const { error, response } = retorno.data;

            if(error !== null){
                throw error;
            } else if (response === null){
                Alert.alert('Ops!', 'Usuario e/ou senha não conferem!');
                return;
            }

            console.log(response);
            await AsyncStorage.setItem('usuario._id', response._id);
            await AsyncStorage.setItem('usuario.nome', response.strnome);
            await AsyncStorage.setItem('usuario.login', response.strlogin);
            await AsyncStorage.setItem('usuario.email', response.stremail);
            //await AsyncStorage.setItem('usuario.senha', response.strsenha);
            Alert.alert('SUCESSO!', 'Carregando...');
            navigation.navigate('Home');
            return;
        } catch (error) {
            console.log({message: 'Verifique o endereço e a porta de comunicação, caso Android, verifique se o comando \'adb reverse tcp:PORTNUMBER tcp:PORTNUMBER\' foi executado.', error});
            Alert.alert('Ops!', 'Tivemos um erro na busca.');
            return;
        }
    }

    function handleCadastrar(){
        navigation.navigate('Cadastro');
    }

    return (
        <KeyboardAvoidingView style={styles.container && thisStyles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>
                    Login:
                </Text>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.input}
                    placeholder='Digite seu login'
                    value={username}
                    onChangeText={setUsername}
                    returnKeyType={'next'}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {this.textInputSenha.focus();}}
                />
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>
                    Senha:
                </Text>
                <TextInput
                    ref={(input) => {this.textInputSenha = input}}
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder='Digite sua senha'
                    value={password}
                    onChangeText={setPassword}
                    returnKeyType={'go'}
                    onSubmitEditing={handleLogar}
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogar}
            >
                <Text style={styles.buttonLabel}>
                    ENTRAR
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCadastrar}>
                <Text style={thisStyles.linkCadastrar}>
                    Ainda não sou cadastrado.
                </Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
};

const thisStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },

    linkCadastrar: {
        color: '#15e',
        marginVertical: 35,
        textDecorationLine: 'underline',
    },
});