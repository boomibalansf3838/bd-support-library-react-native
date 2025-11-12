import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  initialize(appId: string, brandUrl: string,
    onSuccessCallback: (message: string) => void,
    onErrorCallback: (error: string) => void): void;
  loginWithJWTToken(
    jwtToken: string,
    onSuccessCallback: (message: string) => void,
    onErrorCallback: (error: string) => void
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
  setHeaderLogo(url: string): void;
  setHomeDashboardContent(
    headerName?: string,
    headerDescription?: string,
    kbTitle?: string,
    kbDescription?: string,
    ticketTitle?: string,
    ticketDescription?: string,
    submitButtonText?: string
  ): void;
  applyCustomFontFamilyInAndroid(
    regularFontName: string,
    mediumFontName: string,
    semiBoldFontName: string,
    boldFontName: string
  ): void;
}

const AndroidModule = TurboModuleRegistry.getEnforcing<Spec>('BolddeskSupportSdk');

export default AndroidModule
