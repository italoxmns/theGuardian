import React from 'react';

import { Text, View, StyleSheet, FlatList, Image,TouchableOpacity,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import Moment from 'moment';
import { SearchBar } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation'
const baseUrl = 'https://content.guardianapis.com/'
const APY_KEY = 'api-key=d5248f58-c9ed-4bd6-97d2-ef0acd195aae';
const perPage = 15;

export default class News extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            page: 1,
            section: [],
            search: '',
        }
    }

    static navigationOptions = ({ navigation }) => (
        {
            title: navigation.state.params.news.webTitle ,
            headerLeft: (
                <TouchableOpacity style={styles.headerRightButton}
                    onPress=  {() => navigation.navigate("Home",)}>
                    <Icon
                        name="md-arrow-round-back"
                        size={30}
                        style={{ marginLeft: 5 }}
                        color="#0D7CAD"
                    /> 
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity style={styles.headerRightButton}
                    onPress= {() => navigation.navigate("Links",)}>
                    <Icon
                        name="md-search"
                        size={30}
                        // style={{ marginBottom: -3 }}
                        color="#0D7CAD"
                    /> 
                </TouchableOpacity>
            ),
        }
    );
    
    componentDidMount(){
        this.loadNews();
    }

    loadNews = async () => {
        const { page } = this.state;
        const backSection = '&section='+this.props.navigation.state.params.news.id+'&';
        const url = `${baseUrl}search?${backSection}show-fields=all&order-by=newest&pageSize=${perPage}&pages=${page}&${APY_KEY}`;
        this.setState({ loading: true });
        const response = await fetch(url);
        const newest = await response.json();
        this.setState({
            page: page + 1,
            section: [...this.state.section, ...newest.response.results],
            loading: false,
        })
    };
    updateSearch = search => {
        // console.log(search);
        this.setState({ search });
    };
    renderItem = ({item}) => (
        
        <View style={styles.newsContainer}>
            <TouchableOpacity>     
                <Image source={{
                uri: item.fields.thumbnail,
                }} style={{flex:1, height: 100}} />
                <Text style={styles.newsTitle}> {item.webTitle} </Text>
                <Text style={styles.newsDescription}> 
                    {Moment(item.fields.lastModified).format("DD/MM/YYYY HH:mm:ss")}
                </Text>
            </TouchableOpacity>  
        </View>
    )
    render() {
        const { search } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView >
                    <SearchBar
                        noIcon
                        placeholder="Search for ..."
                        onChangeText={this.updateSearch}
                        value={search}
                        Platform={'android'}
                    />
                    <FlatList
                            contentContainerStyle={styles.list}
                            data={this.state.section}
                            keyExtractor ={item => item.id}
                            renderItem = {this.renderItem}
                            onEndReached={this.loadNews}
                            onEndReachedThreshold={0.1}
                    />
                </ScrollView>      
            </View>
      );
    }
  }


// estilização do app
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    list:{
        padding:10
    },
    newsContainer:{
        flex: 1,
        backgroundColor:"#fff",
        borderWidth: 1,
        borderColor: "#0D7CAD",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333"
    },
    newsDescription: {
        fontSize: 14,
        color: "#484F53",
        marginTop: 5,
        lineHeight: 24,
        flex: 1,
    },
    headerRightButton: {
        padding: 5,
    }
});