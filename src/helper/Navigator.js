import React from 'react';  // Add this import

//Authentication
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../components/screens/authentication/RegisterScreen";
import AccountRecoveryScreen from "../components/screens/authentication/AccountRecoveryScreen";
import LandingScreen from "../components/screens/authentication/LandingScreen";
import LoginScreen from "../components/screens/authentication/LoginScreen";

//Admin

//Oganizer
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/screens/organizer/sidebar';
import MyEventScreen from '../components/screens/organizer/myevent';
import EditScreen from '../components/screens/organizer/edit';
import Profile from '../components/screens/organizer/profile';
import Notifications from '../components/screens/organizer/notification';
import Settings from '../components/screens/organizer/settings';
import Feedback from '../components/screens/organizer/feedback';
import Budget from '../components/screens/organizer/budget';
import Inventory from '../components/screens/organizer/inventory';
import Attendees from '../components/screens/organizer/attendee';
import Dashboard from '../components/screens/organizer/dashboard';
import Event from '../components/screens/organizer/event';
import Services from '../components/screens/organizer/services';
import Schedule from '../components/screens/organizer/schedule';
import About from '../components/screens/organizer/about';
import Contact from '../components/screens/organizer/contact';
import FindEvent from '../components/screens/organizer/findevent';
import Create from '../components/screens/organizer/create';
import ViewSched from '../components/screens/organizer/viewsched';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function AuthenticationStack() {
    return ( 
        <Stack.Navigator>
            <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AccountRecoveryScreen" component={AccountRecoveryScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}


function OrganizerStack() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Drawer.Screen name="Create" component={Create} options={{ headerShown: false }} />
            <Drawer.Screen name="ViewSched" component={ViewSched} options={{ headerShown: false }} />
            <Drawer.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Drawer.Screen name="EditScreen" component={EditScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
            <Drawer.Screen name="MyEventScreen" component={MyEventScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Attendees" component={Attendees} options={{ headerShown: false }} />
            <Drawer.Screen name="Inventory" component={Inventory} options={{ headerShown: false }} />
            <Drawer.Screen name="Budget" component={Budget} options={{ headerShown: false }} />
            <Drawer.Screen name="Feedback" component={Feedback} options={{ headerShown: false }} />
            <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            
            <Drawer.Screen name="Event" component={Event} options={{ headerShown: false }} />
            <Drawer.Screen name="Services" component={Services} options={{ headerShown: false }} />
            <Drawer.Screen name="Schedule" component={Schedule} options={{ headerShown: false }} />
            <Drawer.Screen name="About" component={About} options={{ headerShown: false }} />
            <Drawer.Screen name="Contact" component={Contact} options={{ headerShown: false }} /> 
            <Drawer.Screen name="FindEvent" component={FindEvent} options={{ headerShown: false }} />
      </Drawer.Navigator>
    );
}


export default function Navigator() {
    return <OrganizerStack />;
}

