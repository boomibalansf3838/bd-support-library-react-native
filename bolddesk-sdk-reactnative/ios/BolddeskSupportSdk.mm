#import <React/RCTBridgeModule.h>

// Export BolddeskModule (your Swift class)
@interface RCT_EXTERN_MODULE(BolddeskModule, NSObject)

RCT_EXTERN_METHOD(showHomeDashboard)
RCT_EXTERN_METHOD(showCreateTicket)
RCT_EXTERN_METHOD(showKB)
RCT_EXTERN_METHOD(initialize:(NSString *)appId brandURL:(NSString *)brandURL onSuccess:(RCTResponseSenderBlock)onSuccess
                  onError:(RCTResponseSenderBlock)onError)
RCT_EXTERN_METHOD(loginWithJWTToken:(NSString *)jwtToken onSuccess:(RCTResponseSenderBlock)onSuccess
                  onError:(RCTResponseSenderBlock)onError)
RCT_EXTERN_METHOD(logout)
RCT_EXTERN_METHOD(enableLogging)
RCT_EXTERN_METHOD(setSystemFontSize: (BOOL)enable)
RCT_EXTERN_METHOD(setFCMRegistrationToken:(NSString *)token)
RCT_EXTERN_METHOD(setPreferredTheme:(NSString *)theme)
RCT_EXTERN_METHOD(applyTheme:(NSString *)accentColor primaryColor:(NSString *)primaryColor)
RCT_EXTERN_METHOD(applyCustomFontFamilyIniOS:(NSString *)fontFamily)
RCT_EXTERN_METHOD(setHeaderLogo:(NSString *)logoURL)
RCT_EXTERN_METHOD(setHomeDashboardContent:
                  (NSString *)headerName
                  headerDescription:(NSString *)headerDescription
                  kbTitle:(NSString *)kbTitle
                  kbDescription:(NSString *)kbDescription
                  ticketTitle:(NSString *)ticketTitle
                  ticketDescription:(NSString *)ticketDescription
                  submitButtonText:(NSString *)submitButtonText)
@end

// Keep the original BolddeskSupportSdk interface if you need it
@interface BolddeskSupportSdk : NSObject <RCTBridgeModule>
@end

@implementation BolddeskSupportSdk

RCT_EXPORT_MODULE(BolddeskSupportSdk);  // This exposes it as "BdLibrary" to JS

// You can either remove this class or add implementations here

@end