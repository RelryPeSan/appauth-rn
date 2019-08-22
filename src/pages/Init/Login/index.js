import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    KeyboardAvoidingView,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import Modal from 'react-native-modal';
import globalStyles from '../../../styles';
import md5 from 'md5';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../../../assets/app-auth.png';

import api from '../../../services/api';

export default function Login({ navigation }) {
    const [id, setId] = useState(null);
    const [username, setUsername] = useState('relrypesan');
    const [password, setPassword] = useState('12345678');
    const [loading, setLoading] = useState(false);
    const [esqueceuSenha, setEsqueceuSenha] = useState(false);
    const [emailRecuperacao, setEmailRecuperacao] = useState(null);
    const [emailAtivacao, setEmailAtivacao] = useState(false);
    const [codigoAtivacao, setCodigoAtivacao] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('usuario._id').then(userId => {
            if(userId){
                navigation.navigate('Home');
            }
        });
    }, []);

    useEffect(() => {

    }, [loading, esqueceuSenha, emailAtivacao]);

    async function handleLogar(){
        setLoading(true);

        if(username.length === 0 || password.length === 0 ) {
            Alert.alert('Ops!', 'Preencha todos os campos.');
            setLoading(false);
            return;
        }

        try {
            // Alert.alert('Aguarde...', 'Estamos verificando sua autenticação, espere um momento.');
            const retorno = await api.get(`/login?user=${username}&pass=${md5(password)}`);
            
            const { error, response } = retorno.data;

            if(error !== null && error !== undefined ){
                throw new Error("Ocorreu um erro.\n" + error);
            } else if (response === null){
                Alert.alert('Ops!', 'Usuário e senha inválidos!');
                setLoading(false);
                return;
            }
            setId(response._id);
            if (!response.blncontaativada) {
                Alert.alert('Ops!', 'Seu usuário está desativado.');
                setLoading(false);
                return;
            } else if (!response.blnemailconfirmado) {
                //Alert.alert('Ops!', 'Seu email ainda não foi confirmado.');
                setEmailAtivacao(true);
                setLoading(false);
                return;
            }

            console.log(response);
            // await AsyncStorage.multiSet(JSON.parse(response));
            await AsyncStorage.setItem('usuario._id', response._id);
            await AsyncStorage.setItem('usuario.nome', response.strnome);
            await AsyncStorage.setItem('usuario.login', response.strlogin);
            await AsyncStorage.setItem('usuario.email', response.stremail);
            // await AsyncStorage.setItem('usuario.senha', response.strsenha);
            if(response.strfotoperfil){
                await AsyncStorage.setItem('usuario.fotoperfil', response.strfotoperfil);
            }

            setLoading(false);
            navigation.navigate('Home');
            return;
        } catch (error) {
            setLoading(false);
            console.log(new Error(error));
            Alert.alert('Ops!', 'Tivemos um erro na busca.');
        }
    }

    function handleRecuperarSenha(email = null){
        if(!esqueceuSenha){
            setEsqueceuSenha(true);
        } else {
            setEsqueceuSenha(false);

            if(!validateEmail(email)){
                Alert.alert('Ops!', 'Email inválido, favor informar um endereço de email existente');
                setEmailRecuperacao(email);
                setEsqueceuSenha(true);
                return;
            }

            Alert.alert(
                'Recuperação de senha',
                'Estamos te enviando um email para redefinir sua senha.',
                [
                    {text: 'OK'}
                ]);

            // enviar email
        }
    }
    
    function validateEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    function handleCadastrar(){
        navigation.navigate('Cadastro');
    }

    async function handleAtivarEmail(){
        setEmailAtivacao(false);
        setLoading(true);

        if(new String(codigoAtivacao).length < 6) {
            setLoading(false);
            Alert.alert('Ops!', 'O código de ativação deve conter 6 digitos.');
            setEmailAtivacao(true);
            return;
        }

        const response = await api.put('/validaremail', {userid: id, strcodigoativacao: codigoAtivacao});

        const { body } = response.data;

        console.log(body);
        if(body === null || body === undefined){
            console.log('Código informado errado.');
            Alert.alert('Ops!', 'Você informou o código errado. :(');
        } else if(body.blnemailconfirmado){
            setLoading(false);
            Alert.alert('SUCESSO!', 'Sua conta foi ativada com sucesso e agora você poderá usufruir de todo o nosso aplicativo. :)');
            handleLogar();
        } else {
            Alert.alert('Ops!', 'Aconteceu algo de estranho, contate um administrador.');
        }
        setLoading(false);
    }

    function handleReenviarCodigoAtivacao(){
        setEmailAtivacao(false);

    }

    return (
        <KeyboardAvoidingView style={localStyles.maximum}>
            { emailAtivacao ?
                <Modal 
                    style={localStyles.modalContainer}
                    isVisible={emailAtivacao}
                    animationIn="slideInLeft"
                    animationOut="slideOutRight"
                >
                    <View style={localStyles.content}>

                        <View style={localStyles.modalViewTouchFechar}>
                            <TouchableOpacity
                                style={localStyles.modalTouchFechar}
                                onPress={() => {setEmailAtivacao(false); setCodigoAtivacao(null)}}
                            >
                                <Text style={localStyles.modalTouchFecharLabel}>X</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={localStyles.modalTitle}>Ativação de conta</Text>
                        <Text style={localStyles.modalMessage}>Insira o código que foi enviado em seu email a baixo para ativar a sua conta.</Text>
                        <TextInput
                            keyboardType='numeric'
                            style={[globalStyles.input, localStyles.modalInputCodigo]}
                            value={codigoAtivacao}
                            onChangeText={setCodigoAtivacao}
                            textAlignVertical='center'
                            maxLength={6}
                        />

                        <TouchableOpacity 
                            style={[globalStyles.button, globalStyles.buttonPurple, localStyles.modalTouchEnviar]}
                            onPress={handleAtivarEmail}
                        >
                            <Text style={[globalStyles.buttonLabel]}>
                                ATIVAR
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={localStyles.modalTouchLinkReenviar}
                            onPress={() => {handleReenviarCodigoAtivacao(); setCodigoAtivacao(null)}}
                        >
                            <Text style={localStyles.modalTouchLinkReenviarLabel}>Reenviar código de ativação</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                : null
            }
            { esqueceuSenha ?
                <DialogInput 
                    isDialogVisible={esqueceuSenha}
                    title='Recuperar senha'
                    message='Insira o email cadastrado que enviaremos um link para que você possa redefinir sua senha.'
                    hintInput='exemplo@email.com'
                    initValueTextInput={emailRecuperacao}
                    textInputProps={{keyboardType: 'email-address'}}
                    submitInput={(inputText) => {handleRecuperarSenha(inputText)}}
                    closeDialog={ () => {setEsqueceuSenha(false)} }
                    cancelText='Cancelar'
                    submitText='Enviar'
                />
                : null
            }
            { loading ? 
                <ActivityIndicator 
                    style={globalStyles.loading}
                    size='large'
                    color='#84a'
                />
                : null
            }

            <View style={globalStyles.container && localStyles.container}>
                <View style={localStyles.logoContainer}>
                    <Image 
                        style={localStyles.logo}
                        source={logo}
                    />
                </View>

                <View style={localStyles.fieldsContainer}>
                    <View style={globalStyles.infoContainer}>
                        <Text style={globalStyles.label}>
                            Login:
                        </Text>
                        <TextInput
                            ref={(input) => {this.textInputLogin = input}}
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={globalStyles.input}
                            placeholder='Digite seu login'
                            value={username}
                            onChangeText={setUsername}
                            returnKeyType={'next'}
                            blurOnSubmit={true}
                            onSubmitEditing={() => {this.textInputSenha.focus();}}
                        />
                    </View>

                    <View style={globalStyles.infoContainer}>
                        <Text style={globalStyles.label}>
                            Senha:
                        </Text>
                        <TextInput
                            ref={(input) => {this.textInputSenha = input}}
                            secureTextEntry={true}
                            style={globalStyles.input}
                            placeholder='Digite sua senha'
                            value={password}
                            onChangeText={setPassword}
                            returnKeyType={'go'}
                            onSubmitEditing={handleLogar}
                        />
                    </View>

                    <TouchableOpacity
                        style={[globalStyles.button, globalStyles.buttonPurple]}
                        onPress={handleLogar}
                    >
                        <Text style={globalStyles.buttonLabel}>
                            ENTRAR
                        </Text>
                    </TouchableOpacity>
                </View>
                
                <View style={localStyles.linksContainer}>
                    <TouchableOpacity onPress={handleRecuperarSenha}>
                        <Text style={localStyles.linkCadastrar}>
                            Esqueci a senha.
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleCadastrar}>
                        <Text style={localStyles.linkCadastrar}>
                            Quero me cadastrar.
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            
            
            
        </KeyboardAvoidingView>
    );
};

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 30,
    },

    maximum: {
        width: '100%',
        height: '100%',
    },

    logoContainer: {
        width: '100%',
        height: 50,
    },

    logo: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },

    fieldsContainer: {
        alignSelf: 'stretch',
    },

    linksContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
    },

    linkCadastrar: {
        marginTop: 16,
        color: '#15e',
        textDecorationLine: 'underline',
    },

    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },

    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

    modalTitle: {
        fontSize: 18,
        marginVertical: 12,
        fontWeight: 'bold',
    },

    modalMessage: {
        fontSize: 15,
        marginBottom: 12,
    },

    modalInputCodigo: {
        textAlign: 'center',
        fontSize: 16,
        letterSpacing: 14,
    },

    modalViewTouchFechar: {
        alignSelf: 'stretch',
        alignItems: 'flex-end',
    },

    modalTouchFechar: {
        paddingHorizontal: 8,
    },

    modalTouchFecharLabel: {
        fontSize: 20,
    },

    modalTouchEnviar: {
        marginVertical: 20,
    },

    modalTouchLinkReenviar: {
        marginTop: 20,
        padding: 5,
    },

    modalTouchLinkReenviarLabel: {
        color: '#15e',
        textDecorationLine: 'underline',
    }
});