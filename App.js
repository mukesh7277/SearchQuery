/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Item,
  Input,
  ListItem,
  Body,
} from 'native-base';
import ModalComp from './components/ModalComp';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [heading, setHeading] = useState('');
  const [modal, setModal] = useState(false);
  const [queryData, setQueryData] = useState([]);
  const [headingData, setHeadingData] = useState([]);

  const handleModal = () => setModal(() => !modal);

  const URL = "https://api.stackexchange.com/2.3/search/excerpts?order=desc&sort=relevance&title="

  const getQuestions = () => {
    axios.get(`${URL}${query}&site=stackoverflow`)
    .then(res=>{
     const r = res.data.items;
     console.log(r);
      setQueryData(r);
    });
  };

  const getAnswer = () => {
   axios.get(`${URL}${heading}&site=stackoverflow`)
    .then(res=>{
  const r1 = res.data.items;
  setHeadingData(r1);
    });
  };
  const onSearch = v => {
    Keyboard.dismiss();
    setQuery(v);
    getQuestions();
  };

  return (
    <Container>
      <Text style={styles.stack}>stackoverflow.com</Text>
        <Item>
          <Input
          style={{borderColor:"#ef8236",borderWidth:5,borderRadius:7}}
            placeholder="   Search...."
            onChangeText={query => setQuery(query)}
            value={query}
            onSubmitEditing={() =>onSearch()}
          />
        </Item>
        <FlatList
          data={queryData}
          keyExtractor={({ index }) => index}
          renderItem={({ item }) => (
            <ListItem avatar>
                <Text>{item.score}</Text>
                <Text> ^</Text>
              <Body>
                <TouchableOpacity
                  onPress={() => {
                    setHeading(item.title);
                    getAnswer();
                    handleModal();
                  }}>
                  <Text style={styles.questiontext}>{item.title}</Text>
                  <Text>
                    {item.tags.map((tag, index) => (
                      <Text key={index} style={styles.tag}>
                        {' '}{tag} |
                      </Text>
                    ))}
                  </Text>
                </TouchableOpacity>
              </Body>
            </ListItem>
          )}
        />
      <ModalComp
        modal={modal}
        headingData={headingData}
        heading={heading}
        onPress={() =>handleModal()} />
    </Container>
  );
};
export default App;

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#C4E5F4',
    fontSize: 12,
  },
  questiontext: {
    color: '#0475AA',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stack: {
    textAlign: 'center',
    backgroundColor: '#ef8236',
    fontWeight: 'bold',
    fontSize: 15,
    height:25,
  },
});
