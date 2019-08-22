import React, { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import api from '../../../services/api';
import globalStyles from '../../../styles';

export default function Home(){
    const [postagem, setPostagem] = useState([]);

    useEffect(() => {
        setPostagem([0, 1, 2, 3, 4, 5, 6, 7]);
    }, []);

    return (
        <KeyboardAvoidingView style={[globalStyles.container]}>
            <ScrollView style={localStyles.container}>
                {postagem.map(post => (
                    <View key={post} style={[globalStyles.infoContainer, localStyles.postagemContainer]}>
                        <View style={localStyles.infoHeaderBodyContainer}>
                            <View style={localStyles.headerPostagem}>
                                <View style={localStyles.imagemContainer}>
                                    <Image 
                                        style={localStyles.imagemPostagem}
                                    />
                                </View>
                                <View style={localStyles.nomeDataContainer}>
                                    <Text style={localStyles.nomePostagem}>
                                        Nome da Pessoa
                                    </Text>

                                    <Text style={localStyles.dataPostagem}>
                                        Postado em: 18/08/2019 - 18h46
                                    </Text>
                                </View>
                            </View>

                            <View style={localStyles.mensagemContainer}>
                                <Text style={localStyles.mensagemPostagem}>
                                    Teste, mensagem da postagem de cada dia. Hoje é um Ótemo dia de sol aqui nesta cidade maravilhosa. :)
                                </Text>
                            </View>
                        </View>

                        <View style={localStyles.buttonContainer}>
                            <TouchableOpacity style={[globalStyles.button, localStyles.button]}>
                                <Text>
                                    Interessante
                                </Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={[globalStyles.button, localStyles.button]}>
                                <Text>
                                    Indiferente
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const localStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },

    postagemContainer: {
        flexDirection: 'column',
        borderColor: '#888',
        borderWidth: 2,
        borderRadius: 6,
        marginTop: 10,
    },

    infoHeaderBodyContainer: {
        paddingHorizontal: 8,
        paddingVertical: 6,
    },

    headerPostagem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    imagemContainer: {
        width: 58,
        height: 58,
    },

    imagemPostagem: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#444',
        width: '100%',
        height: '100%',
    },

    nomeDataContainer: {
        marginLeft: 10,
        marginTop: 6,
    },

    nomePostagem: {
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 0.45,
    },

    dataPostagem: {
        fontSize: 12,
        fontWeight: '300',
        color: '#777',
        fontStyle: 'italic',
    },

    mensagemContainer: {
        marginTop: 6,
        padding: 5,
    },

    mensagemPostagem: {

    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    button: {
        marginTop: 6,
        borderRadius: 0,
        borderWidth: 0,
        borderTopWidth: 1,
        borderColor: '#888',
        width: '50%',
    },
});