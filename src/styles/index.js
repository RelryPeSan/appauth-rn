import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    infoContainer: {
        marginBottom: 2,
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
        marginVertical: 5,
        alignSelf: 'stretch',
        backgroundColor: '#84a',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderColor: '#849',
        borderWidth: 2,
        borderRadius: 5,
    },

    buttonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    }

});