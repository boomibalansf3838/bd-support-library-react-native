require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "BolddeskSupportSdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://github.com/SomaPrasanna4037/bolddesk-support-sdk.git", :tag => "#{s.version}" }

  s.source_files = "ios/BolddeskSupportSdk-Bridging-Header.h", "ios/**/*.{h,m,mm,cpp,swift}"
  s.private_header_files = "ios/**/*.h"
  s.dependency 'bd-support-library', '~> 1.0.9'
  s.dependency "React-Core"

  install_modules_dependencies(s)
end
