import { createStackNavigator } from 'react-navigation';

import NewsScreen from "../screens/NewsScreen";


export default createStackNavigator({
    NewsScreen, 
    },
    {
        navigationOptions: {
            headerStyle:{
                backgroundColor:"transparent",
            },
            headerTintColor:"transparent",
        }
});