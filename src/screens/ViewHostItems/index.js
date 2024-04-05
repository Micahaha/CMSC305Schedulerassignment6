import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
// import openDatabase hook
import {openDatabase} from "react-native-sqlite-storage";
import Meeting from '../../components/Meeting';
import Host from '../../components/Host';

// create constant object that refers to database
const schedulerDB = openDatabase({name: 'Scheduler.db'});



// create constant that contains the name of the lists table
const hostTableName = 'hosts';
const hostMeetingsTable = 'host_meetings'



const ViewHostMeetingScreen = props => {
  
  const post = props.route.params.post;
  const navigation = useNavigation();


  const [meetings, setMeetings] = useState([]);


  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare empty array that will store results of SELECT
      let results = [];
      // declare variable to compute the total price
      // declare transaction that will execute SELECT
      schedulerDB.transaction(txn => {
        // execute SELECT
        txn.executeSql(

          `SELECT meeting.id, location, date, title FROM ${meetingTableName}, ${hostMeetingsTable} WHERE meeting.id = meeting_id AND host_id = ${post.id}`,
          [],
          // callback function to handle results from SELECT
          (_, res) => {
            // get the number of rows selected
            let len = res.rows.length;
            console.log('Number of rows: ' + len);
            // if more than one row of data was selected
            if(len > 0){
              // loop through the rows of data
              for (let i = 0; i < len; i++){
                // push a row of data at a time onto results array
                let meeting = res.rows.meeting(i);
                results.push({
                  id: meeting.id,
                  title: meeting.title,
                  date: meeting.date,
                  email: meeting.email,
                });
              }
            
              // assign results array to lists state variable
              setMeetings(results);
            } else {
              // if no rows of data were selected
              // assign empty array to meetings state variiable
              setMeetings([]);
            }
          },
          error =>{
            console.log('Error getting meetings' + error.message);
          },
        )
      });
    });
    return listener;
  });

  const ListHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{post.title}</Text>
      </View>
    );
  };



  return (
    <View style={styles.container}>
      <FlatList
        data={meetings}
        renderItem={({item}) => <Meeting post={item}/>}
        ListHeaderComponent={ListHeader}
      />
    </View>
  );
};

export default ViewHostMeetingScreen;