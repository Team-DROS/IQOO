import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DictationScreen from './src/screens/DictationScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import TimelineScreen from './src/screens/TimelineScreen';
import SummaryScreen from './src/screens/SummaryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dictation">
        <Stack.Screen name="Dictation" component={DictationScreen} options={{ title: 'New Prescription' }} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{ title: 'Confirm Prescription' }} />
        <Stack.Screen name="Timeline" component={TimelineScreen} options={{ title: 'Patient History' }} />
        <Stack.Screen name="Summary" component={SummaryScreen} options={{ title: 'Health Summary' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
