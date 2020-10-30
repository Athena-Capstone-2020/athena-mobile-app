import 'dotenv/config'

export default {
    "expo": {
      "name": "athena",
      "slug": "athena",
      "version": "1.0.0",
      "orientation": "portrait",
      "icon": "./assets/icon.png",
      "extra": {
        "BARCODE_LOOKUP_API_KEY": process.env.BARCODE_LOOKUP_API_KEY,
      },
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
              "authToken": process.env.SENTRY_AUTH_TOKEN
            }
          }
        ]
      }
    }
  }
  