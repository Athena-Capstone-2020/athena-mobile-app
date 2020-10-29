const SENTRY_AUTH_TOKEN = '32a5935894d04db7aeae5bb59539d1174ce30ebc38df47e89af2fe6064fee8aa'

export default {
    "expo": {
      "name": "athena",
      "slug": "athena",
      "version": "1.0.0",
      "orientation": "portrait",
      "icon": "./assets/icon.png",
      "splash": {
        "image": "./assets/splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
      },
      "updates": {
        "fallbackToCacheTimeout": 0
      },
      "assetBundlePatterns": [
        "**/*"
      ],
      "ios": {
        "supportsTablet": true
      },
      "web": {
        "favicon": "./assets/favicon.png"
      },
      "hooks": {
        "postPublish": [
          {
            "file": "sentry-expo/upload-sourcemaps",
            "config": {
              "organization": "athena-senior-cap-2020",
              "project": "athena-dev",
              "authToken": SENTRY_AUTH_TOKEN
            }
          }
        ]
      }
    }
  }
  