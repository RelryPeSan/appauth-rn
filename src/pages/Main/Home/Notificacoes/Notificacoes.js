import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../../../services/api';
import globalStyles from '../../../../styles/globalStyles';
import AsyncStorage from '@react-native-community/async-storage';

import withoutPhoto from '../../../../assets/sem-foto.png';

export default function Notificacoes() {
  const [userid, setUserid] = useState();
  const [postagem, setPostagem] = useState(null);
  const [novaPublicacao, setNovaPublicacao] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const id = await AsyncStorage.getItem('usuario._id');
      console.log(id);

      setUserid(id);

      console.log(`/postagem?userid=${id}`);
      const resp = await api.get(`/postagem?userid=${id}`);

      if (resp && resp.data) {
        const respAPIPosts = resp.data.posts;
        const posts = [];

        respAPIPosts.map(function(e, i, a) {
          posts.push({
            userid: e.userid,
            userfoto: e.userfoto,
            usernome: e.usernome,
            postid: e.postid,
            posttexto: e.posttexto,
            postdata: e.postdata
          });
        });

        setPostagem(posts);
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  useEffect(() => {}, [loading, postagem, novaPublicacao])

  async function handleNovaPublicacao(){
    setLoading(true);

    const resp = await api.post(`/postagem?userid=${userid}`, {texto: novaPublicacao});

    console.log(resp);
    if(resp) { 
      Alert.alert('SUCESSO!', 'Seu novo post foi publicado, seus amigos já podem ver');
      setNovaPublicacao('');
    } else {
      Alert.alert('OPS!', 'Seu post não foi publicado, algo aconteceu de errado desculpe.\n' +
        'Verifique sua conexão com a internet ou tente novamente mais tarde');
    }
    
    setLoading(false);
  }

  function convertDateToString(date) {
    const dt = new Date(date);
    return (
      dt.getDate() +
      "/" +
      dt.getMonth() +
      "/" +
      dt.getFullYear() +
      ' - ' +
      dt.getHours() +
      ":" +
      dt.getMinutes()
    );
  }

  return (
    <KeyboardAvoidingView style={[globalStyles.container]}>
      { !loading && postagem ? (
          postagem.length > 0 ? (
          <ScrollView style={localStyles.container}>
            <View style={[globalStyles.infoContainer, localStyles.containerNovaPublicacao]}>
              <TextInput
                style={localStyles.inputNovaPublicacao}
                multiline={true}
                value={novaPublicacao}
                onChangeText={setNovaPublicacao}
                placeholder='Nova publicação'
                blurOnSubmit={false}
              />
              <TouchableOpacity 
                style={[localStyles.buttonNovaPublicacao, (novaPublicacao.length > 0 ? null: globalStyles.disabled)]}
                disabled={!(novaPublicacao.length > 0)}
                onPress={handleNovaPublicacao}
              >
                <Icon name="send" style={localStyles.imageButtonSend} />
              </TouchableOpacity>
            </View>
            {postagem.map(post => (
              <View
                key={post.postid}
                style={[
                  globalStyles.infoContainer,
                  localStyles.postagemContainer,
                ]}
              >
                <View style={localStyles.infoHeaderBodyContainer}>
                  <View style={localStyles.headerPostagem}>
                    <View style={localStyles.imagemContainer}>
                      <Image
                        style={localStyles.imagemPostagem}
                        source={
                          !post.userfoto ? withoutPhoto : { uri: post.userfoto }
                        }
                      />
                    </View>
                    <View style={localStyles.nomeDataContainer}>
                      <Text style={localStyles.nomePostagem} numberOfLines={2}>
                        {post.usernome}
                      </Text>

                      <Text style={localStyles.dataPostagem} numberOfLines={1}>
                        Postado em: {convertDateToString(post.postdata)}
                      </Text>
                    </View>
                  </View>

                  <View style={localStyles.mensagemContainer}>
                    <Text style={localStyles.mensagemPostagem}>
                      {post.posttexto}
                    </Text>
                  </View>
                </View>

                <View style={localStyles.buttonContainer}>
                  <TouchableOpacity
                    style={[globalStyles.button, localStyles.button]}
                  >
                    <Text>Gostei</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[globalStyles.button, localStyles.button]}
                  >
                    <Text>Foda-se</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={localStyles.postsEmptyContainer}>
            <Text style={localStyles.postsEmptyText}>
              Sem noticias no seu feed ainda :/
            </Text>
          </View>
        )) : null}
      
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
}

const localStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },

  containerNovaPublicacao: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eee',
    paddingRight: 4,
    maxHeight: 200,
  },

  inputNovaPublicacao: {
    flex: 6,
    margin: 12,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    alignSelf: 'stretch',
    fontSize: 15,
    paddingVertical: 1,
    paddingHorizontal: 3,
  },

  containerButtonNovaPublicacao: {
    flex: 1,
    flexDirection: 'row',
  },

  buttonNovaPublicacao: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#74a',
    height: 45,
    width: 45,
    marginVertical: 10,
  },

  imageButtonSend: {
    fontSize: 30,
    color: '#fff',
  },

  postagemContainer: {
    backgroundColor: '#eee',
    flexDirection: 'column',
    borderColor: '#888',
    borderWidth: 1.3,
    borderRadius: 6,
    marginTop: 10,
  },

  infoHeaderBodyContainer: {
    padding: 4,
  },

  headerPostagem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  imagemContainer: {
    width: 50,
    height: 50,
  },

  imagemPostagem: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#444',
    width: '100%',
    height: '100%',
  },

  nomeDataContainer: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: '80%',
    marginLeft: 6,
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
    maxWidth: '100%',
  },

  mensagemContainer: {
    marginTop: 6,
    padding: 5,
  },

  mensagemPostagem: {
    fontSize: 15,
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

  postsEmptyContainer: {
    margin: 30,
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },

  postsEmptyText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#aaa'
  },
});
