import React, { useContext } from 'react';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LogBox, View, ActivityIndicator } from "react-native";
//Stacks
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Authentication
import RegisterScreen from "../components/screens/authentication/RegisterScreen";
import AccountRecoveryScreen from "../components/screens/authentication/AccountRecoveryScreen";
import LandingScreen from "../components/screens/authentication/LandingScreen";
import LoginScreen from "../components/screens/authentication/LoginScreen";


//Oganizer
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


//EventsTab
import EventsScreen from '../components/screens/participants/EventsScreen';
import CalendarScreen from '../components/screens/participants/CalendarScreen';
import JoinedEventsScreen from '../components/screens/participants/JoinedEventsScreen';
import BirthdayScreen from '../components/screens/participants/BirthdayScreen';
import SummitScreen from '../components/screens/participants/SummitScreen';
import ReunionScreen from '../components/screens/participants/ReunionScreen';
import ConcertScreen from '../components/screens/participants/ConcertScreen';
import FestivalScreen from '../components/screens/participants/FestivalScreen';
import WeddingScreen from '../components/screens/participants/WeddingScreen';
import SelectedEventScreen from '../components/screens/participants/SelectedEventScreen';
import FeedbackScreen from '../components/screens/participants/FeedbackScreen';
import BookEventScreen from '../components/screens/participants/BookEventScreen';
import FeedbackParticipant from '../components/screens/participants/FeedbackParticipant';
import CopyLinkScreen from '../components/screens/participants/CopyLinkScreen';


//Participants
import HomeScreen from '../components/screens/participants/HomeScreen';
import AboutScreen from '../components/screens/participants/AboutScreen';
import ServicesScreen from '../components/screens/participants/ServicesScreen';
import ProfileScreen from '../components/screens/participants/ProfileScreen';
import NotificationsScreen from '../components/screens/participants/NotificationsScreen';
import BudgetParticipant from '../components/screens/participants/BudgetParticipant';
import EventPortfolioScreen from '../components/screens/participants/EventPortfolioScreen';
import EventDetails from '../components/screens/participants/EventDetails';
import SelectedContactViewScreen from '../components/screens/participants/SelectedContactViewScreen';
import ConversationViewScreen from '../components/screens/participants/ConversationViewScreen';

import { AuthContext } from '../services/authentication/authContext';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const AuthenticationStack = () => {
    LogBox.ignoreAllLogs();
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <ActivityIndicator />; // A screen or component to show while loading
    }

    return (
        <Stack.Navigator
            initialRouteName={user ? (user.role_id === 2 ? "ParticipantsStack" : "OrganizerStack") : "LandingScreen"}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="AccountRecoveryScreen" component={AccountRecoveryScreen} />
            <Stack.Screen name="ParticipantsStack" component={ParticipantsStack} />
            <Stack.Screen name="OrganizerStack" component={OrganizerStack} />
        </Stack.Navigator>
    );
};


//Organizer Priviledges
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


//Events - Participants
function EventsTab() {
    return (
      <Stack.Navigator
        initialRouteName="EventsStack"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="EventsStack" component={EventsScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="JoinedEvents" component={JoinedEventsScreen} />
  
        {/* 6 event types */}
        <Stack.Screen name="Birthday" component={BirthdayScreen} />
        <Stack.Screen name="Summit" component={SummitScreen} />
        <Stack.Screen name="Reunion" component={ReunionScreen} />
        <Stack.Screen name="Concert" component={ConcertScreen} />
        <Stack.Screen name="Festival" component={FestivalScreen} />
        <Stack.Screen name="Wedding" component={WeddingScreen} />
  
        {/* selected event screen */}
        <Stack.Screen name="SelectedEvent" component={SelectedEventScreen} />
        <Stack.Screen name="BookEvent" component={BookEventScreen} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="CopyLink" component={CopyLinkScreen} />
  
        {/* Feedback screen */}
        <Stack.Screen name="Feedback" component={FeedbackParticipant} />
      </Stack.Navigator>
    );
  }


//Participants Priviledges
function ParticipantsStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                backgroundColor: "black", // Replace 'yourColor' with your desired color
                },
                headerTintColor: "#fff", // This changes the color of the back button and title
                headerTitleStyle: {
                fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
                {() => (
                <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = "home";
                    } else if (route.name === "Event") {
                        iconName = "calendar";
                    } else if (route.name === "About") {
                        iconName = "information";
                    } else if (route.name === "Services") {
                        iconName = "briefcase";
                    }

                    return (
                        <View style={{ width: "100%", alignItems: "center" }}>
                        {focused && (
                            <View
                            style={{
                                marginTop: 5,
                                height: 3,
                                width: "50%",
                                backgroundColor: "black",
                                borderRadius: 30,
                            }}
                            />
                        )}
                        <MaterialCommunityIcons
                            name={iconName}
                            size={size}
                            color={color}
                            style={{ paddingTop: 5 }}
                        />
                        </View>
                    );
                    },
                    tabBarActiveTintColor: "black",
                    tabBarInactiveTintColor: "black",
                    tabBarStyle: {
                    backgroundColor: "#FFC42B",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: "absolute",
                    bottom: 0,
                    padding: 10,
                    height: 60,
                    zIndex: 8,
                    },
                    headerShown: false,
                    tabBarLabel: "",
                })}
                >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Event" component={EventsTab} />
                <Tab.Screen name="About" component={AboutScreen} />
                <Tab.Screen name="Services" component={ServicesScreen} />
                </Tab.Navigator>
            )}
            </Stack.Screen>

            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Notification" component={NotificationsScreen} />
            <Stack.Screen name="Event Details" component={EventDetails} />
            <Stack.Screen name="Budget" component={BudgetParticipant} />
            <Stack.Screen name="Event Portfolio" component={EventPortfolioScreen}/>
            <Stack.Screen 
                name="SelectContactView"
                component={SelectedContactViewScreen}
            />
            <Stack.Screen 
                name="ConversationView"
                component={ConversationViewScreen}
            />
        </Stack.Navigator>
    )
}

export default function Navigator() {
    return <AuthenticationStack />
}

