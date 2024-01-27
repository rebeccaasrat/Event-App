import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ProfileUser from './screens/ProfileUser';
import EventCreation from "./screens/EventCreation";
import EventDetails from "./screens/EventDetails";
import TabsPage from "./screens/TabsPage";
import HomeScreen from './screens/HomeScreen';
import EventRegistration from "./screens/EventRegistration";
import ContactScreen from "./screens/ContactScreen";
import SettingsScreen from "./screens/SettingScreen";
import NotificationsScreen from "./screens/Notification";
import LocationScreen from "./screens/LocationScreen";
import AttendanceTracking from "./screens/AttendanceTracking";
import AdminEventDetail from"./screens/AdminEventDetail";
import { AuthProvider } from "./screens/AuthProvider";
import indexcreation from "./screens/indexcreation"
import EventAttendance from "./screens/EventAttendance";
import ChangePassword from "./screens/changePassword";
import AboutUsScreen from "./screens/AboutUs";
import * as Notifications from 'expo-notifications';
import EditProfile from "./screens/EditProfile";

const Stack = createStackNavigator();

export default function App() {

    Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  return (
  <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
       
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
            <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="ProfileUser"
          component={ProfileUser}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="EventCreation"
          component={EventCreation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{ headerShown: false }}
        />
            <Stack.Screen
          name="TabsPage"
          component={TabsPage}
          options={{ headerShown: false }}
        />
                    <Stack.Screen
          name="EventAttendance"
          component={EventAttendance}
          options={{ headerShown: false }}
        />
       
         <Stack.Screen
          name="AboutUsScreen"
          component={AboutUsScreen}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="ContactScreen"
          component={ContactScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
             <Stack.Screen
          name="EventRegistration"
          component={EventRegistration}
          options={{ headerShown: false }}
        />
      
         <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name="LocationScreen"
          component={LocationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AttendanceTracking"
          component={AttendanceTracking}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AdminEventDetail"
          component={AdminEventDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="indexcreation"
          component={indexcreation}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="changePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}
