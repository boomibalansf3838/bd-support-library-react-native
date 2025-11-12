package com.bolddesksupportsdk

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReactContext
import com.facebook.react.turbomodule.core.interfaces.TurboModule
import com.facebook.react.module.annotations.ReactModule
import com.syncfusion.bolddeskmobileSDK.BoldDeskSupportSDK
import com.syncfusion.bolddeskmobileSDK.BoldDeskSDKHome
import com.syncfusion.bolddeskmobileSDK.R

@ReactModule(name = BolddeskSupportSdkModule.NAME)
class BolddeskSupportSdkModule(reactContext: ReactApplicationContext) :
  NativeBolddeskSupportSdkSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  override fun initialize(appId: String, brandUrl: String, onSuccessCallback: Callback?, onErrorCallback: Callback?) {
    runOnUiThread {
      val activity = getReactApplicationContext().getCurrentActivity()
      if (activity != null) {
            try {
                // Call the SDK's login method
                BoldDeskSupportSDK.initialize(activity, appId, brandUrl,
                   onSuccessCallback = { message -> onSuccessCallback?.invoke(message) },
                   onErrorCallback = { error -> onErrorCallback?.invoke(error) }
                )
            } catch (e: Exception) {
                onErrorCallback?.invoke(e.message ?: "Init failed due to an exception")
            }
        } else {
            onErrorCallback?.invoke("Activity not available")
        }
    }
  }

  override fun loginWithJWTToken(jwtToken: String, onSuccessCallback: Callback?, onErrorCallback: Callback?) {
    runOnUiThread {
      val activity = getReactApplicationContext().getCurrentActivity()
      if (activity != null) {
            try {
                // Call the SDK's login method
                BoldDeskSupportSDK.loginWithJWTToken(activity, jwtToken, 
                    onSuccessCallback = { message -> onSuccessCallback?.invoke(message) },
                    onErrorCallback = { error -> onErrorCallback?.invoke(error) }
                )
            } catch (e: Exception) {
                onErrorCallback?.invoke(e.message ?: "Login failed due to an exception")
            }
        } else {
            onErrorCallback?.invoke("Activity not available")
        }
    }
  }

  override fun showHome() {
    runOnUiThread {
      val activity = getReactApplicationContext().getCurrentActivity()
      if (activity != null) {
        // Adjust if your SDK needs only context or different params
        BoldDeskSupportSDK.showHomeDashboard(activity)
      }
    }
  }

  override fun showSubmitTicket() {
    runOnUiThread {
      val activity = getReactApplicationContext().getCurrentActivity()
      if (activity != null) {
        BoldDeskSupportSDK.showCreateTicket(activity)
      }
    }
  }

  override fun showKB() {
    runOnUiThread {
      val activity = getReactApplicationContext().getCurrentActivity()
      if (activity != null) {
        BoldDeskSupportSDK.showKB(activity)
      }
    }
  }

  override fun logout() {
     runOnUiThread {
      val activity = getReactApplicationContext().getCurrentActivity()
      if (activity != null) {
        BoldDeskSupportSDK.logout(activity)
      }
    }
  }

  override fun setFCMRegistrationToken(token: String) {
     runOnUiThread {
      val activity = getReactApplicationContext().getCurrentActivity()
      if (activity != null) {
        BoldDeskSupportSDK.setFCMRegistrationToken(activity, token)
      }
    }
  }

  override fun setLoggingEnabled(enable: Boolean) {
      BoldDeskSupportSDK.setLoggingEnabled(enable)
  }

  override fun setSystemFontSize(enable: Boolean) {
      BoldDeskSupportSDK.setSystemFontSize(enable)
  }

  override fun setPreferredTheme(theme: String) {
      BoldDeskSupportSDK.setPreferredTheme(theme)
  }

  override fun applyTheme(accentColor: String, primaryColor: String) {
      BoldDeskSupportSDK.applyTheme(primaryColor,accentColor)
  }

  override fun applyCustomFontFamilyInAndroid(
    regularFontName: String,
    mediumFontName: String,
    semiBoldFontName: String,
    boldFontName: String
) {
    runOnUiThread {
      val context = getReactApplicationContext()
      val regularResId = resolveFontResId(context, regularFontName)
      val mediumResId = resolveFontResId(context, mediumFontName)
      val semiBoldResId = resolveFontResId(context, semiBoldFontName)
      val boldResId = resolveFontResId(context, boldFontName)
      
      if (regularResId != 0 && mediumResId != 0 && semiBoldResId != 0 && boldResId != 0) {
        BoldDeskSupportSDK.applyCustomFontFamily(regularResId, mediumResId, semiBoldResId, boldResId)
      } else {
        // Log error if any font not found
        android.util.Log.e("BoldDeskSDK", "One or more fonts not found: regular=$regularResId, medium=$mediumResId, semiBold=$semiBoldResId, bold=$boldResId")
      }
    }
}

  override fun setHeaderLogo(logoURL: String) {
    runOnUiThread {
      val activity = getReactApplicationContext().getCurrentActivity()
      if (activity != null) {
        BoldDeskSDKHome.setHeaderLogo(logoURL)
      }
    }
  }

  override fun setHomeDashboardContent(
    headerName: String?,
    headerDescription: String?,
    kbTitle: String?,
    kbDescription: String?,
    ticketTitle: String? ,
    ticketDescription: String?,
    submitButtonText: String?
  ) {
    runOnUiThread {
      val activity = getReactApplicationContext().getCurrentActivity()
      if (activity != null) {
        BoldDeskSDKHome.setHomeDashboardContent(
            headerName ?: "",
            headerDescription ?: "",
            kbTitle ?: "",
            kbDescription ?: "",
            ticketTitle ?: "",
            ticketDescription ?: "",
            submitButtonText ?: ""
        )
      }
    }
  }

  override fun showNotification(icon: String,data: ReadableMap?) {
    runOnUiThread {
      val reactContext = getReactApplicationContext()
      val activity = getReactApplicationContext().getCurrentActivity()
        val stringDataMap: Map<String, String> = data
          ?.toHashMap()
          ?.filterValues { it is String }
          ?.mapValues { (_, value) -> value as String }
          ?: emptyMap()
        val resIcon = resolveIcon(reactContext,icon)
        BoldDeskSupportSDK.handlePushNotifications(reactContext,stringDataMap,resIcon)
    }
  }

  

  private fun runOnUiThread(action: () -> Unit) {
    if (UiThreadUtil.isOnUiThread()) {
      action()
    } else {
      UiThreadUtil.runOnUiThread(action)
    }
  }

  private fun resolveFontResId(context: Context, fontName: String): Int {
    // Try to resolve as raw resource (fonts in res/raw/)
    var resId = context.resources.getIdentifier(fontName, "raw", context.packageName)
    if (resId != 0) return resId
    
    // Try to resolve as font resource (fonts in res/font/)
    resId = context.resources.getIdentifier(fontName, "font", context.packageName)
    if (resId != 0) return resId
    
    // Return 0 if not found
    return 0
}

  private fun resolveIcon(context: Context, iconName: String): Int {
        // Try to resolve from drawable resources
        val resId = context.resources.getIdentifier(
            iconName,
            "drawable",
            context.packageName
        )
        
        // Return resolved ID or default launcher icon
        return if (resId != 0) resId else android.R.drawable.ic_dialog_info
    }

  companion object {
    const val NAME = "BolddeskSupportSdk"
  }

}
