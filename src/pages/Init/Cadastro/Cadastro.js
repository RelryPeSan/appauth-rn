import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import md5 from 'md5'


import api from '../../../services/api';

export default function Cadastro({ navigation }){
    const [ nome, setNome ] = useState('Relry Pereira dos Santos');
    const [ email, setEmail ] = useState('relrypesan@gmail.com');
    const [ login, setLogin ] = useState('relrypesan');
    const [ senha, setSenha ] = useState('12345678');
    const [ confirmarSenha, setConfirmarSenha ] = useState('12345678');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        this.textInput1.focus();
    }, []);

    useEffect(() => {
        console.log(`mudou nome: ${nome}`);
    }, [nome, email, login, senha, confirmarSenha]);

    async function handleFinalizarCadastro(){
        setLoading(true);

        let regex = /[^a-zA-Z0-9\-_.]/;

        // teste nome
        if(nome === ''){
            Alert.alert('Erro!', 'Por favor, insira seu nome.');
            setNome(undefined);
            setLoading(false);
            return;
        }

        // teste email
        if(!validateEmail(email)){
            Alert.alert('Erro!', 'Por favor, informe um email válido.');
            setEmail(undefined);
            setLoading(false);
            return;
        }

        // teste login
        if(regex.test(login)){
            Alert.alert('Login inválido!', 'Caracteres permitidos: letras, números, underline, hifen e ponto.');
            setLogin(undefined);
            setLoading(false);
            return;
        }
        if(login.length < 8){
            Alert.alert('Login inválido!', 'Seu login deve conter pelo menos 8 caracteres.');
            setLogin(undefined);
            setLoading(false);
            return;
        }

        // teste senha
        if(regex.test(senha)){
            Alert.alert('Senha inválida!', 'Sua senha só pode conter letras, números e underline.');
            setSenha(undefined);
            setLoading(false);
            return;
        }
        if(senha !== confirmarSenha) {
            Alert.alert('Senha inválida!', 'Os campos de senhas devem ser identicos.');
            setSenha(undefined);
            setLoading(false);
            return;
        }
        if(senha.length < 8) {
            Alert.alert('Senha inválida!', 'Sua senha deve conter pelo menos 8 caracteres.');
            setSenha(undefined);
            setLoading(false);
            return;
        }

        var hashMd5 = md5(senha);

        try {
            const res = await api.get('/usuario', {strlogin: login});
            console.log(`retorno1: ${res.data}`);
            const response = await api.post('/usuario', {strnome: nome, stremail: email, strlogin: login, strsenha: hashMd5});
            console.log(response.data);

            // verifica a existencia de outra conta com email ou login repetido
            if(response.data.error){
                var campos = '';
                if(response.data.error.existEmail){
                    campos += 'email';
                }
                if(response.data.error.existLogin){
                    if(campos !== '') campos += ', ';
                    campos += 'login';
                }

                Alert.alert('Ops!', `Os seguintes campos não estão disponiveis: ${campos}`);
                setLoading(false);
                return;
            }
        } catch(error){
            console.log({ mensagem: 'Houve algum erro!', error})
            setLoading(false);
            return;
        }

        Alert.alert('OK!', 'Estamos enviando um email para você com o código de ativação da sua conta, insira seus dados e clique em ENTRAR para digitar seu código.');

        setLoading(false);
        navigation.navigate('Login');
    }

    function validateEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    return (
        <KeyboardAvoidingView style={globalStyles.container}>
            <ScrollView style={localStyles.containerSCrollView}>

                <View style={globalStyles.infoContainer}>
                    <Text style={globalStyles.label}>
                        Nome completo:
                    </Text>
                    <TextInput
                        ref={(input) => {this.textInput1 = input}}
                        autoCapitalize='words'
                        style={[globalStyles.input, (nome === undefined ? localStyles.campoInvalido : null)]}
                        placeholder='Digite seu nome completo'
                        value={nome}
                        onChangeText={setNome}
                        returnKeyType={'next'}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {this.textInput2.focus();}}
                    />
                </View>

                <View style={globalStyles.infoContainer}>
                    <Text style={globalStyles.label}>
                        Email:
                    </Text>
                    <TextInput
                        ref={(input) => {this.textInput2 = input}}
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='email-address'
                        style={[globalStyles.input, (email === undefined ? localStyles.campoInvalido : null)]}
                        placeholder='Ex.: exemplo@email.com.br'
                        value={email}
                        onChangeText={setEmail}
                        returnKeyType={'next'}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {this.textInput3.focus();}}
                    />
                </View>

                <View style={globalStyles.infoContainer}>
                    <Text style={globalStyles.label}>
                        Login:
                    </Text>
                    <TextInput
                        ref={(input) => {this.textInput3 = input}}
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={[globalStyles.input, (login === undefined ? localStyles.campoInvalido : null)]}
                        placeholder='Digite seu login'
                        value={login}
                        onChangeText={setLogin}
                        returnKeyType={'next'}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {this.textInput4.focus();}}
                    />
                </View>
                
                <View style={globalStyles.infoContainer}>
                    <Text style={globalStyles.label}>
                        Senha:
                    </Text>
                    <TextInput
                        ref={(input) => {this.textInput4 = input}}
                        secureTextEntry={true}
                        style={[globalStyles.input, (senha === undefined ? localStyles.campoInvalido : null)]}
                        placeholder='Digite sua senha'
                        value={senha}
                        onChangeText={setSenha}
                        returnKeyType={'next'}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {this.textInput5.focus();}}
                    />
                </View>

                <View style={globalStyles.infoContainer}>
                    <Text style={globalStyles.label}>
                        Confirmar senha:
                    </Text>
                    <TextInput
                        ref={(input) => {this.textInput5 = input}}
                        secureTextEntry={true}
                        style={[globalStyles.input, (senha === undefined ? localStyles.campoInvalido : null)]}
                        placeholder='Confirme sua senha'
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                        returnKeyType={'go'}
                        onSubmitEditing={handleFinalizarCadastro}
                    />
                </View>

                <TouchableOpacity 
                    ref={(input) => {this.buttonFinalizar = input}}
                    style={[globalStyles.button, globalStyles.buttonPurple]}
                    onPress={handleFinalizarCadastro}
                >
                    <Text style={globalStyles.buttonLabel}>
                        FINALIZAR
                    </Text>
                </TouchableOpacity>

            </ScrollView>
            { loading ? 
                <ActivityIndicator 
                    style={globalStyles.loading}
                    size='large'
                    color='#84a'
                />
                : null
            }

        </KeyboardAvoidingView>
    );
};

const localStyles = StyleSheet.create({
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

    campoInvalido: {
        borderColor: '#c32',
    },
});