'use-strict'

import logger from './logger'

function closeSignInDialog() {
    let dialogQueryResult = document.querySelectorAll('[role="dialog"][prevent-autonav="true"]');
    dialogQueryResult.forEach(dialog => {
        try {
            dialog.querySelectorAll("#text").forEach(element => {
                if (!isHidden(element) && element.innerHTML.includes('No thanks')) {
                    window.setTimeout(element.click.bind(element), 300);
                    logger.log(`Closing Sign In dialog`)
                }
            });
        } catch (e) {
            logger.error(`Some error occured while [closeSignInDialog()]`, e)
        }
    })
}

function closeCookiesDialog() {
    if (window.location.host.includes("consent.")) {
        let introAgreeButton = document.getElementById('introAgreeButton')
        if (introAgreeButton) {
            logger.log(`Closing cookies Dialog`)
            introAgreeButton.click()
        }
    }
}

function closeVideoPausedDialog() {
    let dialogQueryResult = document.querySelectorAll('yt-confirm-dialog-renderer');
    dialogQueryResult.forEach(dialog => {
        try {
            dialog.querySelectorAll("yt-formatted-string").forEach(element => {
                if (!isHidden(element) && element.innerHTML.includes('Yes')) {
                    window.setTimeout(element.click.bind(element), 300);
                    logger.log(`Closing Video Paused Dialog`)
                }
            });
        } catch (e) {
            logger.error(`Some error occured while [closeVideoPausedDialog()]`, e)
        }
    })
}

function closeGetTheBestYouTubeExperiencePlayerError() {
    let notNowButton = document.querySelector('.yt-player-error-message-renderer > #dismiss-button > yt-button-renderer > a')
    if (notNowButton && notNowButton.innerHTML.includes("Not Now")) {
        logger.log(`Closing Get the best YouTube experience Player error`)
        notNowButton.click()
    }
}

function isHidden(el) {
    return (el.offsetParent === null)
}

function onReady() {
    for (let callback of arguments) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(callback, 1);
        } else {
            document.addEventListener("DOMContentLoaded", callback);
        }
    }
}

function onInterval() {
    for (let c of arguments) {
        setInterval(c, 200);
    }
}

onReady(
    closeCookiesDialog
)

onInterval(
    closeSignInDialog,
    closeVideoPausedDialog,
    closeGetTheBestYouTubeExperiencePlayerError
)
