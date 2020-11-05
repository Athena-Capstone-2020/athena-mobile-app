import 'dotenv/config'

export default {
    "expo": {
      "name": "athena",
      "slug": "athena",
      "version": "1.0.0",
      "orientation": "portrait",
      "icon": "./assets/icon.png",
      "extra": {
        "SENTRY_DSN": process.env.SENTRY_DSN,
        "FIREBASE_API_KEY": process.env.FIREBASE_API_KEY,
        "FIREBASE_AUTH_DOMAIN": process.env.FIREBASE_AUTH_DOMAIN,
        "FIREBASE_DATABASE_URL": process.env.FIREBASE_DATABASE_URL,
        "FIREBASE_PROJECT_ID": process.env.FIREBASE_PROJECT_ID,
        "FIREBASE_STORAGE_BUCKET": process.env.FIREBASE_STORAGE_BUCKET,
        "FIREBASE_MESSAGING_SENDER_ID": process.env.FIREBASE_MESSAGING_SENDER_ID,
        "FIREBASE_APP_ID": process.env.FIREBASE_APP_ID,
        "FIREBASE_MEASUREMENT_ID": process.env.FIREBASE_MEASUREMENT_ID,
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
  