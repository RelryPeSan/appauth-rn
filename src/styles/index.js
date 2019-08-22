import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    infoContainer: {
        marginBottom: 5,
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
    },

    label: {
        marginHorizontal: 5,
        marginTop: 5,
        marginBottom: 2,
        fontSize: 15,
        fontWeight: 'bold',
    },

    input: {
        paddingHorizontal: 10,
        fontWeight: '400',
        alignSelf: 'stretch',
        borderColor: '#84a',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
    },

    inputInvalid:{
        borderColor: '#e22',
    },

    button: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderWidth: 2,
        borderRadius: 5,
    },

    buttonPurple: {
        borderColor: '#849',
        backgroundColor: '#84a',
    },
    
    buttonGreen: {
        borderColor: '#5a6',
        backgroundColor: '#3d4',
    },

    buttonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },

    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(150,150,150, 0.7)',
        zIndex: 100,
    },

});

module.exports = globalStyles;