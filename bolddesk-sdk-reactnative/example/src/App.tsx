import { SafeAreaView, Button, View } from 'react-native';
import { BoldDeskSupportSDK, BoldDeskSDKHome } from 'bolddesk-support-sdk';
import { useEffect, useCallback } from 'react';
import { initializeNotifications } from './NotificationsService';
import { sign } from 'react-native-pure-jwt';


export default function App() {
  useEffect(() => {
    initializeNotifications()
  }, []);


  const handleInit = (appId: string, brandUrl: string) => {
    BoldDeskSupportSDK.initialize(
      appId, brandUrl,
      (message) => {
        console.log("Init Success:", message);
        // Handle successful login (e.g., navigate to another screen)
      },
      (error) => {
        console.error("Init Error:", error);
        // Handle login error (e.g., show an alert)
      }
    );
  };

  const handleLogin = (jwtToken: string) => {
    BoldDeskSupportSDK.loginWithJWTToken(
      jwtToken,
      (message) => {
        console.log("Login Success:", message);
        // Handle successful login (e.g., navigate to another screen)
      },
      (error) => {
        console.error("Login Error:", error);
        // Handle login error (e.g., show an alert)
      }
    );
  };
  const SECRET_KEY = 'Y1vqexADsfLEBViCxBqVES05Sv5nwZU5SykawU9LzIGKjQ2IDPDYP40I/GqPHGeHxFO3mQ/+YDI/ZYC+nwAAVg=='; // avoid keeping secrets in client apps

  async function buildJwt(): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    const leeway = 30; // allow for clock skew
    const iatAsString = String(now - leeway); // C# used issuedAt.ToString()

    return sign(
      {
        email: 'test@gmail.com',
        name: 'test',
        iat: iatAsString, // string, not number
      },
      SECRET_KEY,
      { alg: 'HS256' }
    );
  }


  const onPress = useCallback(async () => {
    try {
      const token = await buildJwt();
      console.log('Generated JWT Token:', token);
      handleLogin(token);

    } catch (e: any) {
      console.error('Login false:', e.message);
    }
  }, []);

  const isLoggedin = useCallback(async () => {
    const result = await BoldDeskSupportSDK.isLoggedIn()
    console.log('Is Logged in:', result);
  }, []);

  const isFromSDK = useCallback(async () => {
    const userInfo: Record<string, any> = {
      data: {
        brandDomain: 'bolddesk.com',
        userId: "12345",
        userName: "John Doe",
        email: "john.doe@example.com",
      },
      notificationType: "ticket_update",
      timestamp: Date.now(),
    };

    const result = await BoldDeskSupportSDK.isFromMobileSDK(userInfo)
    console.log('Is Logged in:', result);
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ marginVertical: 10 }}>
        <Button title="Initialize" onPress={() => handleInit(
          "VcVGW+Om90d2ZW4ivuuendHtDS/qqdhZkBk6nzKStotppzqgu7ZMjgnk71+MjgUgQ3698FQybWCzNyey3DLbmw==",
          "stagingboldsign.bolddesk.com"
        )} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="Login" onPress={onPress} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="Logout" onPress={() => BoldDeskSupportSDK.logout()} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="Show Home" onPress={() => BoldDeskSupportSDK.showHome()} />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Button title="Submit Ticket" onPress={() => BoldDeskSupportSDK.showSubmitTicket()} />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Button title="Show KB" onPress={() => BoldDeskSupportSDK.showKB()} />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Button title="Set FCM Token" onPress={() => BoldDeskSupportSDK.setFCMRegistrationToken(
          "fXI54TkpTruS38JPQ4zGLf:APA91bGHzj-yfZEiJJKPpWYDb0NI4jV7QfwT9qZ8_FRInznrXS9_Pb6NWGjY6KV4Cjec2HjYmmHbepfuZhMuxqEWqjaLGPRCWM9bcdapSij9euFA5v_YM_0"
        )} />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Button title="Apply Theme" onPress={() => BoldDeskSupportSDK.applyTheme(
          "#FF5733", "#33C1FF"
        )} />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Button title="Set App Theme" onPress={() => BoldDeskSupportSDK.setPreferredTheme(
          "dark"
        )} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="Set Logging Enabled" onPress={() => BoldDeskSupportSDK.setLoggingEnabled(
          true
        )} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="Set Logo" onPress={() => BoldDeskSDKHome.setHeaderLogo("https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png")} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="Set Font family" onPress={() => BoldDeskSupportSDK.applyCustomFontFamilyIniOS("Times New Roman")} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="IS Logged in" onPress={() => isLoggedin()} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="IS from SDK" onPress={() => isFromSDK()} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="Set content" onPress={() => BoldDeskSDKHome.setHomeDashboardContent({
          headerName: "Welcome to BoldDesk",
          headerDescription: "Manage your tickets and knowledge base efficiently",
          kbTitle: "test Base",
          kbDescription: "Search articles and FAQs",
          ticketTitle: "Submit a Ticket",
          ticketDescription: "Report your issue or request support",
          submitButtonText: "Submit Now"
        })
        } />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="Set Custom Font Android" onPress={() => BoldDeskSupportSDK.applyCustomFontFamilyInAndroid(
          "dancingscript_regular", "dancingscript_medium", "dancingscript_semibold", "dancingscript_bold"
        )} />
      </View>
    </SafeAreaView>
  );
}

