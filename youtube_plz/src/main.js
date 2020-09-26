'use-strict'

import logger from './logger'

function closeSignInDialog() {
    let dialogQueryResult = document.querySelectorAll('[role="dialog"][prevent-autonav="true"]');
    dialogQueryResult.forEach(dialog => {
        try {
            dialog.querySelectorAll("#text").forEach(element => {
                if (!isHidden(element) && element.innerHTML.includes('No thanks')) {
                    window.setTimeout(element.click.bind(element), 300);
                    logger.log(`Closing Sign In dialog`, element)
                }
            });
        } catch (e) {
            logger.error(`Some error occured while [closeSignInDialog()]`, e)
        }
    })
}

function closeCookiesDialog() {
    logger.log(window.location.host, window.location.host.includes("consent."))
    if (window.location.host.includes("consent.")) {
        let introAgreeButton = document.getElementById('introAgreeButton')
        introAgreeButton.click()
    }
}


function closeVideoPausedDialog() {
    let dialogQueryResult = document.querySelectorAll('yt-confirm-dialog-renderer');
    dialogQueryResult.forEach(dialog => {
        try {
            dialog.querySelectorAll("yt-formatted-string").forEach(element => {
                if (!isHidden(element) && element.innerHTML.includes('Yes')) {
                    window.setTimeout(element.click.bind(element), 300);
                    logger.log(`Closing Video Paused Dialog`, element)
                }
            });
        } catch (e) {
            logger.error(`Some error occured while [closeVideoPausedDialog()]`, e)
        }
    })
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

function runPeriodicaly() {
    for (let c of arguments) {
        setInterval(c, 200);
    }
}

onReady(
    closeCookiesDialog
)

runPeriodicaly(
    closeSignInDialog,
    closeVideoPausedDialog
)
