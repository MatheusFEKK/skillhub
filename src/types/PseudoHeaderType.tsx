import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type PseudoHeaderType = {
    Home : undefined; 
    Options : undefined
    Profile : undefined
    NA : undefined
}

export type PseudoHeaderNavigateProps = NativeStackNavigationProp<PseudoHeaderType>