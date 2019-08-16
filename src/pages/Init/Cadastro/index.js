import React, { useState, useEffect } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import styles from '../../../styles';
import md5 from 'md5'


import api from '../../../services/api';

export default function Cadastro({ navigation }){
    const [ nome, setNome ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ login, setLogin ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ confirmarSenha, setConfirmarSenha ] = useState('');

    useEffect(() => {
        this.textInput1.focus();
    }, []);

    async function handleFinalizarCadastro(){
        let regex = /[^a-zA-Z0-9\-_.]/;

        // teste nome
        if(nome === ''){
            Alert.alert('Erro!', 'Por favor, insira seu nome.');
            return;
        }

        // teste email
        if(!validateEmail(email)){
            Alert.alert('Erro!', 'Por favor, informe um email válido.');
            return;
        }

        // teste login
        if(regex.test(login)){
            Alert.alert('Login inválido!', 'Caracteres permitidos: letras, números, underline, hifen e ponto.');
            return;
        }
        if(login.length < 8){
            Alert.alert('Login inválido!', 'Seu login deve conter pelo menos 8 caracteres.');
            return;
        }

        // teste senha
        if(regex.test(senha)){
            Alert.alert('Senha inválida!', 'Sua senha só pode conter letras, números e underline.');
            return;
        }
        if(senha !== confirmarSenha) {
            Alert.alert('Senha inválida!', 'Os campos de senhas devem ser identicos.');
            return;
        }
        if(senha.length < 8) {
            Alert.alert('Senha inválida!', 'Sua senha deve conter pelo menos 8 caracteres.');
            return;
        }

        var hashMd5 = md5(senha);

        try {
            const res = await api.get('/usuario', {strlogin: login});
            console.log(`retorno1: ${res.data}`);
            const response = await api.post('/usuario', {strnome: nome, stremail: email, strlogin: login, strsenha: hashMd5});
            console.log(`retorno2: ${response.data}`);
        } catch(error){
            console.log({ mensagem: 'Houve algum erro!', error})
            return;
        }

        Alert.alert('OK!', 'Usuario cadastrado com sucesso.');

        navigation.navigate('Login');
    }

    function validateEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView style={thisStyles.containerSCrollView}>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>
                        Nome completo:
                    </Text>
                    <TextInput
                        ref={(input) => {this.textInput1 = input}}
                        autoCapitalize='words'
                        style={styles.input}
                        placeholder='Digite seu nome completo'
                        value={nome}
                        onChangeText={setNome}
                        returnKeyType={'next'}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {this.textInput2.focus();}}
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>
                        Email:
                    </Text>
                    <TextInput
                        ref={(input) => {this.textInput2 = input}}
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.input}
                        placeholder='Ex.: exemplo@email.com.br'
                        value={email}
                        onChangeText={setEmail}
                        returnKeyType={'next'}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {this.textInput3.focus();}}
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>
                        Login:
                    </Text>
                    <TextInput
                        ref={(input) => {this.textInput3 = input}}
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.input}
                        placeholder='Digite seu login'
                        value={login}
                        onChangeText={setLogin}
                        returnKeyType={'next'}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {this.textInput4.focus();}}
                    />
                </View>
                
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>
                        Senha:
                    </Text>
                    <TextInput
                        ref={(input) => {this.textInput4 = input}}
                        secureTextEntry={true}
                        style={styles.input}
                        placeholder='Digite sua senha'
                        value={senha}
                        onChangeText={setSenha}
                        returnKeyType={'next'}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {this.textInput5.focus();}}
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>
                        Confirmar senha:
                    </Text>
                    <TextInput
                        ref={(input) => {this.textInput5 = input}}
                        secureTextEntry={true}
                        style={styles.input}
                        placeholder='Confirme sua senha'
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                        returnKeyType={'go'}
                        onSubmitEditing={handleFinalizarCadastro}
                    />
                </View>

                <TouchableOpacity 
                    ref={(input) => {this.buttonFinalizar = input}}
                    style={styles.button}
                    onPress={handleFinalizarCadastro}
                >
                    <Text style={styles.buttonLabel}>
                        FINALIZAR
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const thisStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20
    },

    containerSCrollView: {
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
});