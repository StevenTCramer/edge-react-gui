# Edge Wallet
## A multicurrency mobile wallet for Bitcoin, Ethereum, Litecoin, and Bitcoin Cash 
![Edge Wallet Screenshots](https://cdn-images-1.medium.com/max/1600/1*xMZMuK0_jGNZNzduvggsdw.png)

Edge Wallet is:
- simple
- secure
- private
- decentralized
- multi-currency
- cross-platform
- mobile first
- open source

---------------------------------------------------

## Getting Started

### Install nodejs (v 8.4+) and npm (v 5.3+)

    https://nodejs.org/en/download/

### Install React Native CLI

    npm install -g react-native-cli

### Install node_modules

    cd edge-react-gui
    npm i

### Android NDK Setup

(MacOS) If the NDK is already installed from Android Studio, it should be in `/Users/[user]/Library/Android/sdk/ndk-bundle`.
If not, download and unzip the NDK from https://developer.android.com/ndk/index.html

Set `ANDROID_NDK_HOME` environment variable to the path of the NDK. ie

    export ANDROID_NDK_HOME=/Users/bob/Library/Android/sdk/ndk-bundle
 
### Additional step to make build pass 
1. Go to file node_modules/react-native/react.gradle 
2. go to the method  "def currentBundleTask"
3. After the doFirst method, add the following snippet : 

`doLast {
    def moveFunc = { resSuffix ->
        File originalDir = file("${resourcesDir}/drawable-${resSuffix}")
        if (originalDir.exists()) {
            File destDir = file("${resourcesDir}/drawable-${resSuffix}-v4")
            ant.move(file: originalDir, tofile: destDir)
        }
    }
    moveFunc.curry("ldpi").call()
    moveFunc.curry("mdpi").call()
    moveFunc.curry("hdpi").call()
    moveFunc.curry("xhdpi").call()
    moveFunc.curry("xxhdpi").call()
    moveFunc.curry("xxxhdpi").call()
}`
### Run the app in debug mode

  `react-native run-ios` or `react-native run-android`

---------------------------------------------------

## Deploying

#### Android

    npm run android:release-install

---------------------------------------------------

## Debugging

For debugging, we recommend using React Native Debugger

### MacOS

`brew update && brew cask install react-native-debugger`
##### iOS Simulator
    ⌘ + d (command + d)
    Select "Debug JS Remotely"

### Windows / Linux

https://github.com/jhen0409/react-native-debugger/releases

###### GenyMotion Android Emulator
    ⌘ + m (command + m)
    Select "Debug JS Remotely"

## Contributing

Please follow the coding conventions defined in [Edge Conventions](https://github.com/Airbitz/edge-conventions
)

remove this line
