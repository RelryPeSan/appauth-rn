import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';
import api from '../../../services/api';
import globalStyles from '../../../styles';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

import withoutPhoto from '../../../assets/sem-foto.png';

export default function Perfil(){
    const [id, setId] = useState(undefined);
    const [nome, setNome] = useState(undefined);
    const [login, setLogin] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [nascimento, setNascimento] = useState(undefined);
    const [descricao, setDescricao] = useState(undefined);
    const [photo, setPhoto] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        async function loadUser(){
            setPhoto(await AsyncStorage.getItem('usuario.fotoperfil'));
            setId(await AsyncStorage.getItem('usuario._id'));
            setNome(await AsyncStorage.getItem('usuario.nome'));
            setLogin(await AsyncStorage.getItem('usuario.login'));
            setEmail(await AsyncStorage.getItem('usuario.email'));
            
        }

        loadUser();
    }, []);

    useEffect(() => {
    }, [photo, nome, login, email]);
    
    // inicia/sair do modo edição de perfil
    useEffect(() => {
        if(editar){
            this.textInput1.focus();
        }
    }, [editar]);

    async function handleChoosePhoto() {
        const options = {
            noData: true,
        };

        const id = await AsyncStorage.getItem('usuario._id');
        
        ImagePicker.launchImageLibrary(options, async (response) => {
            if ( response.didCancel ) {
                console.log('Usuario cancelou o upload de foto');
            }
            if (response.uri) {
                const image = new FormData();
                image.append('image', {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName,
                });
                
                try {
                    setLoading(true);
                    Alert.alert('Carregando', 'Sua foto está sendo carrega, por favor aguarde.');
                    console.log({id, image});
                    const tmp = await api.post(`/usuario/imagem?userid=${id}`, image);
                    console.log({temporaria: tmp});
                    
                    setPhoto(tmp.data.body.strfotoperfil);
                    await AsyncStorage.setItem('usuario.fotoperfil', tmp.data.body.strfotoperfil);
    
                    Alert.alert('SUCESSO', 'Sua foto foi carregada com sucesso.');
                } catch (error) {
                    Alert.alert('OPS', 'Houve algum problema ao fazer o upload da foto.');
                }
                setLoading(false);

            }
        });
    };
    
    function handleEditarPerfil() {
        // inverte o estado de edição
        setEditar(!editar);
    }

    return (
        <KeyboardAvoidingView style={globalStyles.container}>
            <ScrollView style={localStyles.containerSCrollView}>
                <View style={localStyles.imageView}>
                    <TouchableOpacity
                        style={localStyles.imageButton}
                        onPress={handleChoosePhoto}
                    >
                        <Image 
                            source={ ( !photo ? 
                                withoutPhoto : 
                                {uri: photo}) }
                            style={localStyles.image}
                        />
                    </TouchableOpacity>
                    { loading ? 
                        <ActivityIndicator 
                            style={globalStyles.loading}
                            size='large'
                        />
                        : null
                    }
                </View>

                <View style={localStyles.infoContainer}>
                    <Text style={globalStyles.label}>
                        Nome:
                    </Text>
                    <TextInput
                        ref={(input) => {this.textInput1 = input}}
                        style={globalStyles.input}
                        editable={editar}
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                <View style={localStyles.infoContainer}>
                    <Text style={globalStyles.label}>
                        Email:
                    </Text>
                    <TextInput
                        ref={(input) => {this.textInput2 = input}}
                        style={globalStyles.input}
                        editable={editar}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={localStyles.infoContainer}>
                    <Text style={globalStyles.label}>
                        Data de Nascimento:
                    </Text>
                    <TextInput
                        ref={(input) => {this.textInput3 = input}}
                        style={globalStyles.input}
                        editable={editar}
                        value={nascimento}
                        onChangeText={setNascimento}
                    />
                </View>

                <View style={localStyles.infoContainer}>
                    <Text style={globalStyles.label}>
                        Descrição:
                    </Text>
                    <TextInput
                        ref={(input) => {this.textInput4 = input}}
                        style={globalStyles.input}
                        editable={editar}
                        returnKeyType={'route'}
                        numberOfLines={10}
                        value={descricao}
                        onChangeText={setDescricao}
                    />
                </View>

                <View style={localStyles.infoContainer}>
                    <TouchableOpacity
                        style={[globalStyles.button, (editar ? globalStyles.buttonGreen : globalStyles.buttonPurple)]}
                        onPress={handleEditarPerfil}
                    >
                        <Text style={globalStyles.buttonLabel}>
                            { editar ? 'SALVAR' : 'EDITAR'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </KeyboardAvoidingView>
    );
};

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    containerSCrollView: {
        alignSelf: 'stretch',
    },
    
    imageView: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: '#f00',
        height: 180,
    },

    loading: {
        position: 'absolute',
    },

    imageButton: {
        borderWidth: 2,
        borderColor: '#84a',
        borderRadius: 200,
        //resizeMode: 'contain',
    },

    image: {
        borderRadius: 200,
        height: 146,
        width: 146,
    },

    infoContainer: {
        paddingHorizontal: 20,
        marginBottom: 2,
        alignSelf: "stretch",
        justifyContent: "flex-start",
    },

    buttonGreen: {
        borderColor: '#495',
        backgroundColor: '#3d4',
    },

});