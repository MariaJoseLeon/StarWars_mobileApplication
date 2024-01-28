import { 
  StyleSheet,
  Text,
  View,
  Button, 
  FlatList,
  ImageBackground,
  ScrollView, 
  Image, 
  TouchableOpacity,
  TextInput
} from 'react-native';
import React, { useState, useEffect } from 'react';
//My files
import {getAllCharacters, getOneCharacter} from './end_points/people';
import { getAllStarShips, getOneStarShip } from './end_points/starShips';
// Create a new component for user greeting and welcome message
/**
 * Component to welcome pop up. 
 * @param {*} param0 
 * @returns welcome message with instructions
 */
const WelcomePopup = ({ isVisible, onClose, onContinue }) => {
  const [name, setName] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);

  const handleContinue = () => {
    setShowWelcome(true);
  };

  return (
    isVisible && (
      <View style={styles.popupContainer}>
        <TouchableOpacity style={styles.closePopup} onPress={onClose}>
          <Text style={{ color: '#000000', fontSize: 30 }}>X</Text>
        </TouchableOpacity>

        <View style={styles.popupContent}>
          {!showWelcome ? (
            <View>
              <Text style={styles.popupText}>Enter your name:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setName(text)}
                  value={name}
                  placeholder="Your name"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
              <TouchableOpacity style={styles.submitButton} onPress={handleContinue}>
                <Text style={styles.submitText}>Start</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.welcomeText}>Welcome, {name},  Star Wars FAN! Explore iconic characters and legendary starships here. Tap the Darth Vader to discover the fascinating charcaters. Touch the starship button for incredible details. Join us on this thrilling journey into the epic Star Wars universe, where characters and ships await your exploration. Let's dive in together!"</Text>
              <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    )
  );
};


export default function App() {
  const [characters, setCharacters] = useState([]);
  const [starShips, setStarShips] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [details, setDetails] = useState({
    image:'characters/1.jpeg',
    title:'Luke',
    description:'',
    property1:{
      name:'name',
      value:'value'
    },
    property2:{
      name:'name',
      value:'value'
    },

    property3:{
      name:'name',
      value:'value'
    },
    property4:{
      name:'name',
      value:'value'
    },
    property5:{
      name:'name',
      value:'value'
    },
  });
  /**/
  /*getAllCharacters().then((charactersList) => {
    setCharacters(charactersList);
  })*/
  return (
    <ScrollView>
      <ImageBackground source={require("./assets/images/background.jpg")} style={styles.container}>
        <View>
          <Image source={require("./assets/images/logo.png")} style={styles.header} resizeMode={'cover'}/>
        </View>
        <WelcomePopup
        isVisible={showWelcomePopup}
        onClose={() => setShowWelcomePopup(false)}
        onContinue={() => setShowWelcomePopup(false)}
        />
        <TouchableOpacity style={styles.reloadButton} activeOpacity={.5} onPress={() => window.location.reload()}>
          <Image
            source={require('./assets/images/reload.png')} // Replace 'reload.png' with your image path
            style={styles.reloadImage}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
        <ScrollView style={styles.listContainer}>
          <FlatList
            style={styles.listStyle}
            data={characters}
            renderItem={({ item }) => (
              <View style={styles.itemListStyle}>
                <Text style={styles.itemName}>{item.name}</Text>
                <TouchableOpacity style={styles.itemButton} onPress={() =>{
                  getOneCharacter(item.uid).then((result) => {
                    console.log('Character id => ', item.uid+'.jpeg');
                    setDetails({
                      image:'characters/'+item.uid+'.jpeg',
                      title:result.result.properties.name,
                      description:result.result.description,
                      property1:{
                        name:'birth_year',
                        value:result.result.properties.birth_year
                      },
                      property2:{
                        name:'gender',
                        value:result.result.properties.gender
                      },
  
                      property3:{
                        name:'height',
                        value:result.result.properties.height
                      },
                      property4:{
                        name:'mass',
                        value:result.result.properties.mass
                      },
                      property5:{
                        name:'',
                        value:''
                      },
                    });
                    setShowDetails(true);
                  })
                  
                }}><Text style={{color:'#fff'}}>VER</Text></TouchableOpacity> 
              </View>
            )}
          />
        </ScrollView>
        <ScrollView style={styles.listContainer}>
          <FlatList
            style={styles.listStyle}
            data={starShips}
            renderItem={({ item }) => (
              <View style={styles.itemListStyle}>
                <Text style={styles.itemName}>{item.name}</Text>
                <TouchableOpacity style={styles.itemButton} onPress={() => 
                  {
                    getOneStarShip(item.uid).then((result) => {
                      console.log('starship id => ', item.uid+'.jpeg');
                      setDetails({
                        image:'starShips/'+item.uid+'.jpeg',
                        title:result.result.properties.name,
                        description:result.result.description,
                        property1:{
                          name:'passengers',
                          value:result.result.properties.passengers
                        },
                        property2:{
                          name:'length',
                          value:result.result.properties.length
                        },
    
                        property3:{
                          name:'max atmosphering speed',
                          value:result.result.properties.max_atmosphering_speed
                        },
                        property4:{
                          name:'MGLT',
                          value:result.result.properties.MGLT
                        },
                        property5:{
                          name:'cargo_capacity',
                          value:result.result.properties.cargo_capacity
                        },
                      });
                      setShowDetails(true);
                    })
                  }
                }><Text style={{color:'#fff'}}>VER</Text></TouchableOpacity> 
              </View>
            )}
          />
        </ScrollView>
        <TouchableOpacity style={styles.characterButton} activeOpacity={.5} onPress={() =>
            getAllCharacters(82).then((charactersList) => {
              setStarShips([]);
              setCharacters(charactersList);
            })
          }>
              <Image
              source={require('./assets/images/character.jpeg')}
              style={styles.characterImage}
              resizeMode={'cover'}
              />
        </TouchableOpacity>
        <TouchableOpacity style={styles.starShipButton} activeOpacity={.5} onPress={() =>
            getAllStarShips(30).then((starShipsList) => {
              setCharacters([]);
              setStarShips(starShipsList);
            })
          }>
              <Image
              source={require('./assets/images/starShip.png')}
              style={styles.starShipImage}
              resizeMode={'cover'}
              />
        </TouchableOpacity>
      </ImageBackground>
      {showDetails && 
      <View style={styles.detailCard}>
        <TouchableOpacity style={styles.closeDatail} activeOpacity={.5} onPress={() =>
            setShowDetails(false)
          }>
              <Text style={{color:'#000000', fontSize:30}}>X</Text>
        </TouchableOpacity>
        <Image
              source={require(`./assets/images/${details.image}`)}
              style={styles.detailImage}
              resizeMode={'cover'}
        />
        <View style={styles.textDetails}>
          <Text style={styles.titleDetail}>{details.title}</Text>
          <Text style={styles.descriptionDetail}>{details.description}</Text>
          {details.property1.name != '' &&<Text style={styles.propertyDetail}><Text style={{fontWeight:'bold'}}>{details.property1.name}: </Text>{details.property1.value}</Text>}
          {details.property2.name != '' &&<Text style={styles.propertyDetail}><Text style={{fontWeight:'bold'}}>{details.property2.name}: </Text>{details.property2.value}</Text>}
          {details.property3.name != '' &&<Text style={styles.propertyDetail}><Text style={{fontWeight:'bold'}}>{details.property3.name}: </Text>{details.property3.value}</Text>}
          {details.property4.name != '' &&<Text style={styles.propertyDetail}><Text style={{fontWeight:'bold'}}>{details.property4.name}: </Text>{details.property4.value}</Text>}
          {details.property5.name != '' &&<Text style={styles.propertyDetail}><Text style={{fontWeight:'bold'}}>{details.property5.name}: </Text>{details.property5.value}</Text>}
        </View>
      </View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'100vw',
    height:'100vh',
    backgroundColor: '#fff',
  },
  header:{
    width:'100vw',
    height:'20vh',
  },
  listContainer:{
    position:'absolute',
    top: 180,
    left: 0,
    maxHeight:'65vh',
    width:'100%'
  },
  listStyle:{
    width:'100%',
    backgroundColor:'rgba(255, 255, 255, .8)'
  },
  itemListStyle:{
    flex: 1, 
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'space-between' 
  },
  itemName:{
    fontSize: 25
  },
  itemButton:{
    backgroundColor: '#000000',
    color:'#FFF',
    paddingHorizontal:10,
    paddingVertical: 5
  },
  popupContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  popupContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  popupText: {
    fontSize: 30,
    marginBottom: 10
  },
  welcomeText: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 20, 
    alignSelf: 'center',
    marginBottom: 20
  },
  input: {
    color: '#000',
    fontSize: 20,
  },
  submitButton: {
    backgroundColor: '#FFD700', 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderRadius: 10, 
    alignSelf: 'center', 
    marginTop: 10
  },
  submitText: {
    color: '#000000', 
    fontSize: 25, 
    textAlign: 'center', 
  },
  continueButton: {
    backgroundColor: '#FFD700', 
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  continueText: {
    color: '#000000', 
    fontSize: 25,
  },
  reloadButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: '53%',
    transform: [{ translateX: -55 }], 
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000'
  },
  reloadImage: {
    width: '45%',
    height: '45%',
    borderRadius: '50%'
  },
  characterButton:{
    width:110,
    height:110,
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    bottom: 20,
    left: 20,
    borderRadius:'50%'
  },
  characterImage:{
    width:'100%',
    height:'100%',
    borderRadius:'50%'
  },
  starShipButton:{
    width:110,
    height:110,
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius:'50%'
  },
  starShipImage:{
    width:'100%',
    height:'100%',
    borderRadius:'50%'
  },
  detailCard:{
    position: "absolute",
    bottom: 0,
    right: 0,
    width:'100vw',
    height:'100vh',
    backgroundColor: 'rgba(255, 255, 255, .99)',
  },
  closeDatail:{
    position: "absolute",
    top: 10,
    right: 10,
  },
  detailImage:{
    width:'90vw',
    height:'60vh',
    display: 'block',
    marginTop: 60,
    marginHorizontal: 'auto'
  },
  textDetails:{
    width:'90vw',
    display: 'block',
    marginTop: 10,
    marginHorizontal: 'auto'
  },
  titleDetail:{
    textAlign:'center',
    display:'block',
    fontWeight:'bold',
    fontSize:30
  },
  descriptionDetail:{
    textAlign:'center',
    display:'block',
    fontSize:20,
    marginTop:5
  }
  ,
  propertyDetail:{
    textAlign:'left',
    display:'block',
    fontSize:20,
    marginTop:5
  }
});
