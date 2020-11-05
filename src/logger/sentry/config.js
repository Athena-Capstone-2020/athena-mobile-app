import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants'

var sentryConfig = {
    dsn: Constants.manifest.extra.SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
}

function initSentry(){
    Sentry.init(sentryConfig)
}

export {initSentry, sentryConfig}