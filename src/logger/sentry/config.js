import * as Sentry from 'sentry-expo';

function initSentry(sentryConfig){
    Sentry.init(sentryConfig)
}

export {initSentry}