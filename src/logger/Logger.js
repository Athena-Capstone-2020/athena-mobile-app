import * as Sentry from '@sentry/react-native'
/**
 * Logs the error to be thrown in Sentry
 * NOTE: DOES NOT THROW THE ERROR
 * @param {Error} err error that is being logged 
 */
function logError(err){
    Sentry.captureException(err)
}

/**
 * Logs a message in Sentry
 * @param {string} message the message to log
 */
function log(message){
    Sentry.captureMessage(message)
}

export {logError, log}

