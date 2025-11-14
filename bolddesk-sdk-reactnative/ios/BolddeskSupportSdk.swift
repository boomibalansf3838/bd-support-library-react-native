import Foundation
import BoldDeskSupportSDK
import React

@objc(BolddeskModule)
class BolddeskModule: NSObject {

  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc func showHomeDashboard() {
    DispatchQueue.main.async {
      BDSupportSDK.showHomeDashboard()  // Call your framework method
    }
  }
  
  @objc func showCreateTicket() {
     DispatchQueue.main.async {
       BDSupportSDK.showCreateTicket()
     }
   }

   @objc func showKB() {
     DispatchQueue.main.async {
       BDSupportSDK.showKB()
     }
   }

   @objc func initialize(
    _ appId: String,
    brandURL: String,
    onSuccess: @escaping RCTResponseSenderBlock,
    onError: @escaping RCTResponseSenderBlock
  ) {
      BDSupportSDK.initialize(appId: appId, brandURl: brandURL, 
        { successMessage in
            // success callback - return string to JS
            onSuccess([successMessage ?? "Initialization successful"])
        },
        { errorMessage in
            // error callback - return string to JS
            onError([errorMessage ?? "Initialization failed"])
        })
  }

  @objc func loginWithJWTToken(_ jwtToken: String, 
  onSuccess: @escaping RCTResponseSenderBlock,
    onError: @escaping RCTResponseSenderBlock) {
      BDSupportSDK.loginWithJWTToken(jwtToken: jwtToken,
      { successMessage in
            // success callback - return string to JS
            onSuccess([successMessage ?? "Login successful"])
        },
        { errorMessage in
            // error callback - return string to JS
            onError([errorMessage ?? "Login failed"])
        })
  }

   @objc func logout() {
     DispatchQueue.main.async {
       BDSupportSDK.logout()
     }
   }

   @objc func enableLogging() {
     DispatchQueue.main.async {
       BDSupportSDK.enableLogging()
     }
   }

   @objc func setSystemFontSize(_ enable: Bool) {
     DispatchQueue.main.async {
       BDSupportSDK.applySystemFontSize = enable
     }
   }

   @objc func setFCMRegistrationToken(_ token: String) {
     DispatchQueue.main.async {
       BDSupportSDK.enablePushNotification(fcmToken: token)
     }
   }

   @objc func setPreferredTheme(_ theme: String) {
    DispatchQueue.main.async {
        // Map string from JS to SDKTheme enum
        switch theme.lowercased() {
        case "light":
            BDSupportSDK.setPreferredTheme(.light)
        case "dark":
            BDSupportSDK.setPreferredTheme(.dark)
        case "system":
            BDSupportSDK.setPreferredTheme(.system)
        default:
            BDSupportSDK.setPreferredTheme(.system)
        }
    }
  }

  @objc func applyTheme(
    _ accentColor: String,
    primaryColor: String
  ) {
      BDSupportSDK.applyTheme(
            accentColor: accentColor,
            primaryColor: primaryColor
        )
  }

  @objc func applyCustomFontFamilyIniOS(_ fontFamily: String) {
     DispatchQueue.main.async {
       BDPortalConfiguration.customFontName = fontFamily
     }
   }

   @objc func setHeaderLogo(_ logoURL: String) {
     DispatchQueue.main.async {
       BDSDKHome.setHeaderLogo(logoURL: logoURL)
     }
   }

   @objc func setHomeDashboardContent(
    _ headerName: String,
    headerDescription: String,
    kbTitle: String,
    kbDescription: String,
    ticketTitle: String,
    ticketDescription: String,
    submitButtonText: String
    ) {
        DispatchQueue.main.async {
            BDSDKHome.setHomeDashboardContent(
                headerName: headerName,
                headerDescription: headerDescription,
                kbTitle: kbTitle,
                kbDescription: kbDescription,
                ticketTitle: ticketTitle,
                ticketDescription: ticketDescription,
                submitButtonText: submitButtonText
            )
        }
    }

    @objc func isFromMobileSDK(_ userInfo: NSDictionary,
                               resolver: RCTPromiseResolveBlock,
                               rejecter: RCTPromiseRejectBlock) {
        // Convert NSDictionary to [AnyHashable: Any]
        let info = userInfo as? [AnyHashable: Any] ?? [:]

        // Directly call your framework method
        let result = BDSupportSDK.isFromMobileSDK(userInfo: info)

        resolver(result)
    }

    @objc func clearallLocalData() {
     DispatchQueue.main.async {
       BDSupportSDK.clearallLocalData()
     }
   }

   @objc func isLoggedIn(_ resolver: @escaping RCTPromiseResolveBlock,
                      rejecter: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
        let result = BDSupportSDK.isLoggedIn()
        resolver(result) 
    }
}

    @objc func handleNotification(_ userInfo: NSDictionary) {
      DispatchQueue.main.async {
        let swiftUserInfo = userInfo as? [AnyHashable: Any] ?? [:]
        _ = BDSupportSDK.processRemoteNotification(userInfo: swiftUserInfo)
      }
    }
}
