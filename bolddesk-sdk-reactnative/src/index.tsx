import { Platform, NativeModules } from 'react-native';
import AndroidModule from './NativeBolddeskSupportSdk';


// Get NativeModule for iOS
const { BolddeskModule } = NativeModules;

// Define the common interface
interface BolddeskSupportSdkLibraryType {
  initialize(appId: string, brandUrl: string, onSuccessCallback?: (message: string) => void,
    onErrorCallback?: (error: string) => void): void;
  loginWithJWTToken(
    jwtToken: string,
    onSuccessCallback?: (message: string) => void,
    onErrorCallback?: (error: string) => void
  ): void;
  logout(): void;
  showHome(): void;
  showSubmitTicket(): void;
  showKB(): void;
  setFCMRegistrationToken(token: string): void;
  showNotification(icon: string, data?: { [key: string]: string | object }): void;
  setLoggingEnabled(enable: boolean): void;
  setSystemFontSize(enable: boolean): void;
  setPreferredTheme(theme: string): void;
  applyTheme(accentColor: string, primaryColor: string): void;
  applyCustomFontFamilyInAndroid(
    regularFontName: string,
    mediumFontName: string,
    semiBoldFontName: string,
    boldFontName: string
  ): void;
  applyCustomFontFamilyIniOS(fontFamily: String): void;
}
interface BoldDeskSDKHomeLibraryType {
  setHeaderLogo(url: string): void;
  setHomeDashboardContent(params?: Partial<{
    headerName: string;
    headerDescription: string;
    kbTitle: string;
    kbDescription: string;
    ticketTitle: string;
    ticketDescription: string;
    submitButtonText: string;
  }>): void;
}

const BoldDeskSDKHome: BoldDeskSDKHomeLibraryType = {
  // Platform-based implementation
  setHeaderLogo: (url) => {
    if (Platform.OS === 'ios') {
      BolddeskModule?.setHeaderLogo?.(url);
    } else {
      AndroidModule?.setHeaderLogo?.(url);
    }
  },
  setHomeDashboardContent: ({
    headerName = "",
    headerDescription = "",
    kbTitle = "",
    kbDescription = "",
    ticketTitle = "",
    ticketDescription = "",
    submitButtonText = ""
  }: Partial<{
    headerName: string;
    headerDescription: string;
    kbTitle: string;
    kbDescription: string;
    ticketTitle: string;
    ticketDescription: string;
    submitButtonText: string;
  }>) => {
    if (Platform.OS === "ios") {
      BolddeskModule?.setHomeDashboardContent?.(
        headerName,
        headerDescription,
        kbTitle,
        kbDescription,
        ticketTitle,
        ticketDescription,
        submitButtonText
      );
    } else {
      AndroidModule?.setHomeDashboardContent?.(
        headerName,
        headerDescription,
        kbTitle,
        kbDescription,
        ticketTitle,
        ticketDescription,
        submitButtonText
      );
    }
  }
}


// Platform-based implementation
const BoldDeskSupportSDK: BolddeskSupportSdkLibraryType = {
  initialize: (appId, brandUrl, onSuccessCallback: (message: string) => void, onErrorCallback: (error: string) => void) => {
    if (Platform.OS === 'ios') {
      BolddeskModule?.initialize?.(appId, brandUrl, onSuccessCallback, onErrorCallback);
    } else {
      AndroidModule?.initialize?.(appId, brandUrl, onSuccessCallback, onErrorCallback);
    }
  },

  loginWithJWTToken: (jwtToken: string, onSuccessCallback: (message: string) => void, onErrorCallback: (error: string) => void) => {
    if (Platform.OS === 'ios') {
      BolddeskModule?.loginWithJWTToken?.(jwtToken, onSuccessCallback, onErrorCallback);
    } else {
      AndroidModule?.loginWithJWTToken(jwtToken, onSuccessCallback, onErrorCallback);
    }
  },
  logout: () => {
    if (Platform.OS === 'ios') {
      BolddeskModule?.logout?.();
    } else {
      AndroidModule?.logout?.();
    }
  },
  showHome: () => {
    if (Platform.OS === 'ios') {
      BolddeskModule?.showHomeDashboard?.();
    } else {
      AndroidModule?.showHome?.();
    }
  },
  showSubmitTicket: () => {
    if (Platform.OS === 'ios') {
      BolddeskModule?.showCreateTicket?.();
    } else {
      AndroidModule?.showSubmitTicket?.();
    }
  },
  showKB: () => {
    if (Platform.OS === 'ios') {
      BolddeskModule?.showKB?.();
    } else {
      AndroidModule?.showKB?.();
    }
  },
  setLoggingEnabled: (enable) => {
    if (Platform.OS === 'ios') {
      BolddeskModule?.enableLogging?.();
    }
    else {
      AndroidModule?.setLoggingEnabled?.(enable);
    }
  },
  setSystemFontSize: (enable) => {
    if (Platform.OS === 'ios') {
      BolddeskModule?.setSystemFontSize?.(enable);
    }
    else {
      AndroidModule?.setSystemFontSize?.(enable);
    }
  },
  setFCMRegistrationToken: (token) => {
    if (Platform.OS === 'ios') {
      BolddeskModule?.setFCMRegistrationToken?.(token);
    } else {
      AndroidModule?.setFCMRegistrationToken?.(token);
    }
  },
  showNotification: (icon, data) => {
    if (Platform.OS === 'ios') {
      BolddeskModule?.showNotification?.(icon, data);
    } else {
      AndroidModule?.showNotification?.(icon, data);
    }
  },
  setPreferredTheme: (theme) => {
    if (Platform.OS === 'ios') {
      BolddeskModule?.setPreferredTheme?.(theme);
    } else {
      AndroidModule?.setPreferredTheme?.(theme);
    }
  },
  applyTheme: (accentColor, primaryColor) => {
    if (Platform.OS === 'ios') {
      BolddeskModule?.applyTheme?.(accentColor, primaryColor);
    } else {
      AndroidModule?.applyTheme?.(accentColor, primaryColor);
    }
  },
  applyCustomFontFamilyInAndroid: (regularFontName, mediumFontName, semiBoldFontName, boldFontName) => {
    AndroidModule?.applyCustomFontFamilyInAndroid?.(regularFontName, mediumFontName, semiBoldFontName, boldFontName);
  },
  applyCustomFontFamilyIniOS: (fontFamily) => {
    BolddeskModule?.applyCustomFontFamilyIniOS?.(fontFamily);
  }
};

export { BoldDeskSupportSDK, BoldDeskSDKHome };
export default BoldDeskSupportSDK;
