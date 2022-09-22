import {HomeScreen} from "../screens/HomeScreen";
import {FullTaskScreen} from "../screens/FullTaskScreen";
import {createStackNavigator} from 'react-navigation-stack-web';
import {createBrowserApp, NavigationContainer} from '@react-navigation/web';


const Navigation = createStackNavigator(
    {
        Home: HomeScreen,
        FullTask: FullTaskScreen,
    },
    {
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#000',
            },
        },
    }
);

const container = createBrowserApp(Navigation);

export default container;