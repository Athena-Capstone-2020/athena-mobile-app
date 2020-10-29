import Sentry from 'sentry-expo';
import {SENTRY_DSN} from '@env'

var sentryConfig = {
    dsn: SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
}

function initSentry(){
    Sentry.init(sentryConfig)
}

export {initSentry, sentryConfig}