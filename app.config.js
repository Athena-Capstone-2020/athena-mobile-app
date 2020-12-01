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
        "FIREBASE_CONFIG": {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        },
        "SENTRY_CONFIG": {
          dsn: process.env.SENTRY_DSN,
          enableInExpoDevelopment: true,
          debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
        },
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
  