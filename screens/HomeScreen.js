import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { createStackNavigator } from 'react-navigation';
const APY_KEY = 'api-key=d5248f58-c9ed-4bd6-97d2-ef0acd195aae';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title:"The Guardian",
    
  };

  constructor(props){
      super(props);
      this.state = {
          loading: false,
          section: [],
          url: `https://content.guardianapis.com/sections?${APY_KEY}`,
          refresh: false,
      }
  }

  componentDidMount(){
      this.getSection();
  }

  //show section in api
  getSection = () => {
      this.setState({loading: true})
      fetch(this.state.url)
      .then(res => res.json())
      .then(res => {
          this.setState({
              section: res.response.results,
              loading: false,
          })
      })
      
  };
 
  //renderized sections in render();
  renderItem = ({item}) => (
      <View style={styles.sectionContainer}>
          {<TouchableOpacity style={styles.containerButton}
          onPress= {() => {
            this.props.navigation.navigate("News",{news: item});
          }}> 
          <Text style={styles.text}>{item.webTitle} </Text>
          </TouchableOpacity>}
      </View>
  )
  // render principal
  render(){  
      return(
          
          <View style={styles.container}>
           <ScrollView >
               <View style={styles.viewTitle}>
                    <MonoText>List of the Sections</MonoText>
               </View> 
                <FlatList
                    contentContainerStyle={styles.listSections}
                    data={this.state.section}
                    keyExtractor ={item => item.webTitle.toLowerCase()}
                    renderItem = {this.renderItem}
                />
            </ScrollView>
          </View>
      );
  }
}

// estilização do app
const styles = StyleSheet.create({
  viewTitle: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 5
  },
  container:{
      flex:1,
      backgroundColor:"#fff"
  },
  listSections:{
      padding:10
  },
  sectionContainer:{
    backgroundColor:'transparent',
    flex: 1,
  },
  text:{
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D7CAD",
    },
  containerButton: {
      height: 40,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: "#0D7CAD",
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
  },
});