import React, { useState } from 'react';
import styles from './styles';
import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import openDatabase hook
const database = require('../../components/Handlers/database.js');
import { openDatabase } from "react-native-sqlite-storage";

// create constant that object that refers to database
const schedulerDB = openDatabase({name: 'Scheduler.db'});

// create contant that contains the naem of the lists table
const hostTableName = 'hosts';

const ExistingHostScreen = props => {

    const post = props.route.params.post;

    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 

    const navigation = useNavigation()

    
    const onHostUpdate = () => {
        if (!name)
        {
            alert('Please enter a host name.');
            return;
        }
        if(!email)
        {
            alert('Please enter a Email.');
            return;
        }

        schedulerDB.transaction(txn => {
            txn.executeSql(
                `UPDATE ${hostTableName} SET name = "${name}", email = "${email}" WHERE id = "${post.id}"`,
                [],
                () => {
                    console.log(`${name} updated successfully`)
                },
                error => {
                    console.log('Error on updating host ' + error.message);
                }
            );
        });

        alert(name + ' updated!');
    }

    const onHostDelete = () => {
        return Alert.alert(
            // title
            'Confirm',
            // message
            'Are you sure you want to delete this host?',
            // code for buttons 
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        schedulerDB.transaction(txn => {
                            txn.executeSql(
                                `DELETE FROM ${listsTableName} WHERE id = ${post.id}`,
                                [],
                                () => 
                                {
                                    console.log(`${name} deleted successfully`);
                                },
                                error => {
                                    console.log('Error on deleting list ' + error.message);
                                }
                            );
                        });
                        alert('List Deleted!');
                    },
                },
                {
                    text: 'No',
                },
            ],
        );
    }
    const onAssignMeeting = () => {
        navigation.navigate('Add Host Meeting', {post: post});

      
    }
    const onViewList = () => {
        navigation.navigate('View Host Meetings', {post:post});
    }



  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput
                value={name}
                onChangeText={value => setName(value)}
                style={styles.name}
                placeholder={'Enter Name'}
                placeholderTextColor={'grey'}
            />
            <TextInput
                value={email}
                onChangeText={value => setEmail(value)}
                style={styles.name}
                placeholder={'Enter Email'}
                placeholderTextColor={'grey'}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable style={styles.updateButton} onPress={onHostUpdate}>
            <Text style={styles.buttonText}>Update</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={onHostDelete}>
            <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
            <Pressable style={styles.addButton} onPress={onAssignMeeting}>
            <Text style={styles.buttonText}>Assign Meeting</Text>
            </Pressable>
            <Pressable style={styles.viewButton} onPress={onViewList}>
            <Text style={styles.buttonText}>View Meetings</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default ExistingHostScreen;