import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Text, ListItem } from 'react-native-elements';

const Screen2 = ({ route }) => {
    const { user } = route.params;

    const emoticonUrl = `https://robohash.org/${user.username}.png`;

    return (
        <View style={styles.container}>
            <View style={styles.emoticonContainer}>
                <Image source={{ uri: emoticonUrl }} style={styles.emoticon} />
            </View>
            <View style={styles.userInfoContainer}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.username}>{user.username}</Text>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>Email</ListItem.Title>
                        <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>Phone</ListItem.Title>
                        <ListItem.Subtitle>{user.phone}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>Website</ListItem.Title>
                        <ListItem.Subtitle>

                            <TouchableOpacity onPress={() => Linking.openURL(`http://${user.website}`)}>
                                <Text style={styles.website}>
                                    {user.website}
                                </Text>
                            </TouchableOpacity>

                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>Address</ListItem.Title>
                        <ListItem.Subtitle>
                            {user.address.street}, {user.address.suite}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>
                            {user.address.city} - {user.address.zipcode}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>Company</ListItem.Title>
                        <ListItem.Subtitle>{user.company.name}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    emoticonContainer: {
        marginTop: 50,
        marginBottom: 20,
    },
    emoticon: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black'
    },
    userInfoContainer: {
        flex: 1,
        width: '80%',
        paddingTop: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    username: {
        fontSize: 18,
        fontStyle: 'italic',
        marginBottom: 20,
    },
    website: {
        textDecorationLine: 'underline'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default Screen2;
