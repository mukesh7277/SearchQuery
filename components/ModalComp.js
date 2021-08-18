/* eslint-disable prettier/prettier */
import {
    Button,
    List,
    Text,
    View
  } from 'native-base';
  import React from 'react';
  import {
    ScrollView,
    Modal,
    StyleSheet
  } from 'react-native';
  
  function ModalComp(props) {
    return (
      <Modal visible={props.modal}>
        <ScrollView>
          <View style={styles.quesStyle}>
            <Text style={styles.quesHeading}>{props.heading}</Text>
          </View>
          <Text style={{color:'#ef8236',fontWeight:'bold'}}>Answers</Text>
          {props.headingData.map((item, index) => (
            <List key={index} style={{ padding: 20 }}>
              <Text style={styles.heading}>{index + 1} :</Text>
              <Text style={styles.answerbody}>{item.body}</Text>
              <ScrollView>
                <Text>{item.excerpt}</Text>
              </ScrollView>
            </List>
          ))}
        </ScrollView>
        <Button onPress={props.onPress} style={{backgroundColor:'#ef8236'}}>
          <Text style={{width:"100%",textAlign:'center'}}>Go Back</Text>
        </Button>
      </Modal>
    )
  }
  
  export default ModalComp;
  
  const styles = StyleSheet.create({
    quesStyle: {
      alignItems: 'center',
    },
    quesHeading: {
      fontSize: 30,
      color: 'black',
      fontWeight: 'bold',
    },
    answerbody: {
      fontSize: 18,
    },
    heading: {
      fontSize: 20,
      color: '#ef8236',
    },
  });
  