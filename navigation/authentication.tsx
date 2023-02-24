import { createStackNavigator } from "@react-navigation/stack";
import { Register } from "../screens/authentication/register";
import { Login } from "../screens/authentication/login";
import { LoginWithOtp } from "../screens/authentication/login-with-otp";
import { VerifyOtp } from "../screens/authentication/verify-code";
import { ForgetPassword } from "../screens/authentication/forget-password";

const Navigator = createStackNavigator();

export function AuthenticateNavigator() {
  return (
    <Navigator.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}>
      <Navigator.Screen name="login" component={Login} />
      <Navigator.Screen name="register" component={Register} />
      <Navigator.Screen name="login-otp" component={LoginWithOtp} />
      <Navigator.Screen name="forget-password" component={ForgetPassword} />
      <Navigator.Screen name="verify-code" component={VerifyOtp} />
    </Navigator.Navigator>
  );
}
