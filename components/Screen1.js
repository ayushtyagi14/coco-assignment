import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ToastAndroid, TouchableOpacity } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ListItem } from 'react-native-elements';

const Screen1 = ({ navigation }) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkInternetConnection();
    }, []);

    const getOnlineData = async () => {
        try {
            const response = await axios.get('http://jsonplaceholder.typicode.com/users');
            const usersWithEmoticons = response.data.map((user) => {
                const username = user.username;
                const url = `https://robohash.org/${username}.png`;
                return { ...user, emoticonUrl: url };
            });
            setUsers(usersWithEmoticons);
            await AsyncStorage.setItem('users', JSON.stringify(usersWithEmoticons));
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getOfflineData = async () => {
        try {
            const value = await AsyncStorage.getItem('users');
            if (value !== null) {
                setUsers(JSON.parse(value));
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const checkInternetConnection = async () => {
        const state = await NetInfo.fetch();
        if (!state.isConnected) {
            ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
            getOfflineData();
        } else {
            setLoading(true);
            getOnlineData();
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Your Profile', { user: item })}>
            <ListItem>
                <Image source={{ uri: item.emoticonUrl }} style={{ width: 50, height: 50 }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.username}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </TouchableOpacity>
    );

    return (
        <View>
            {loading ?
                <Text>Loading...</Text> :
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            }
        </View>
    );
};

export default Screen1;
