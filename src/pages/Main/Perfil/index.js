import React, { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';
import styles from '../../../styles';
import ImagePicker from 'react-native-image-picker';

import withoutPhoto from '../../../assets/sem-foto.png';

export default function Perfil(){
    const { photo, setPhoto } = useState(null);
    //'https://res.cloudinary.com/reratos/image/upload/samples/people/smiling-man.jpg'

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
            this.setState({ photo: response });
            }
        });
    };
    
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView style={localStyles.containerSCrollView}>
                <View style={localStyles.imageView}>
                    <TouchableOpacity
                        style={localStyles.imageButton}
                        onPress={handleChoosePhoto}
                    >
                        <Image 
                            source={ !photo ? withoutPhoto : photo}
                            style={localStyles.image}
                        />
                    </TouchableOpacity>
                </View>

                <View style={localStyles.infoContainer}>
                    <Text style={styles.label}>
                        Nome:
                    </Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                    />
                </View>

                <View style={localStyles.infoContainer}>
                    <Text style={styles.label}>
                        Email:
                    </Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                    />
                </View>

                <View style={localStyles.infoContainer}>
                    <Text style={styles.label}>
                        Data de Nascimento:
                    </Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                    />
                </View>

                <View style={localStyles.infoContainer}>
                    <Text style={styles.label}>
                        Descrição:
                    </Text>
                    <TextInput
                        style={styles.input}
                        editable={true}
                        returnKeyType={'route'}
                        numberOfLines={10}
                    />
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
        borderWidth: 1,
        borderColor: '#f00',
        height: 180,
    },

    imageButton: {
        borderWidth: 2,
        borderColor: '#43f',
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

});