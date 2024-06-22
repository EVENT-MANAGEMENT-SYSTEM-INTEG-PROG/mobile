import React from 'react';  // Add this import
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/screens/features/sidebar';
import MyEventScreen from '../components/screens/features/myevent';
import EditScreen from '../components/screens/features/edit';
import Profile from '../components/screens/features/profile';
import Notifications from '../components/screens/features/notification';
import Settings from '../components/screens/features/settings';
import Feedback from '../components/screens/features/feedback';
import Budget from '../components/screens/features/budget';
import Inventory from '../components/screens/features/inventory';
import Attendees from '../components/screens/features/attendee';
import Dashboard from '../components/screens/features/dashboard';
import Event from '../components/screens/features/event';
import Services from '../components/screens/features/services';
import Schedule from '../components/screens/features/schedule';
import About from '../components/screens/features/about';
import Contact from '../components/screens/features/contact';
import FindEvent from '../components/screens/features/findevent';
import Create from '../components/screens/features/create';
import ViewSched from '../components/screens/features/viewsched';

const Drawer = createDrawerNavigator();


function FeatureStack() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Drawer.Screen name="MyEventScreen" component={MyEventScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="EditScreen" component={EditScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Drawer.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
        <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Drawer.Screen name="Feedback" component={Feedback} options={{ headerShown: false }} />
        <Drawer.Screen name="Budget" component={Budget} options={{ headerShown: false }} />
        <Drawer.Screen name="Inventory" component={Inventory} options={{ headerShown: false }} />
        <Drawer.Screen name="Attendees" component={Attendees} options={{ headerShown: false }} />
        <Drawer.Screen name="Event" component={Event} options={{ headerShown: false }} />
        <Drawer.Screen name="Services" component={Services} options={{ headerShown: false }} />
        <Drawer.Screen name="Schedule" component={Schedule} options={{ headerShown: false }} />
        <Drawer.Screen name="About" component={About} options={{ headerShown: false }} />
        <Drawer.Screen name="Contact" component={Contact} options={{ headerShown: false }} /> 
        <Drawer.Screen name="FindEvent" component={FindEvent} options={{ headerShown: false }} />
        <Drawer.Screen name="Create" component={Create} options={{ headerShown: false }} />
        <Drawer.Screen name="ViewSched" component={ViewSched} options={{ headerShown: false }} />
      </Drawer.Navigator>
    );
}

export default function Navigator() {
    return <FeatureStack />;
}

