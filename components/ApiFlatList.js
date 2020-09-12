import React,{Component} from 'react';
import { Text,FlatList, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import UserItem from "./Api/UserItem";

const USERS_URL = 'https://randomuser.me/api?results=30'


export default class ApiFlatList extends Component{

    state = {
        users: null,
        isLoading: false,
        error: null,
    };

    componentDidMount = () => {
        this.loadUserProfiles();
    };

    startLoading = () => this.setState({ isLoading: true });

    stopLoading = () => this.setState({ isLoading: false });

    setError = message => this.setState({ error: message });

    clearError = () => this.setState({ error: null });

    loadUserProfiles = async () => {
        try {
            this.startLoading();
            const response = await fetch(USERS_URL);
            const json = await response.json();
            console.log('json response from network', json);
            this.setState({ users: json.results });
            this.stopLoading();
            this.clearError();
        } catch (error) {
            this.stopLoading();
            this.setError(error.message);
        }
    };

    render() {
        const { isLoading, users, error } = this.state;
        const firstUser = users ? users[0] : null;


        const renderUsers = ({item}) =>(
            <UserItem user={item}/>
        )

        return (
            <View style={styles.container}>
                {isLoading && <ActivityIndicator />}
                {firstUser && (
                    <Text style={styles.paragraph}>
                        First user: {firstUser.name.first} {firstUser.name.last}
                    </Text>
                )}
                {users && (
                    <Text style={styles.paragraph}>Number of users: {users.length}</Text>
                    /*Her indsætter vi vores liste af brugere der bliver hentet med endpointet (hint brug din sidste flat liste*/

                )}
                {error && <Text style={styles.error}>Error: {error}</Text>}
                <FlatList
                    style={styles.inlineScroll}
                    data={users}
                    renderItem={renderUsers}
                    keyExtractor={item => item.login.uuid}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    inlineScroll:{
        height: 100
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    error: {
        color:'red'
    },
});