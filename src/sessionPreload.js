document.addEventListener("DOMContentLoaded", () => {
    console.log("proloader works!");
    // clicking the open in browser button
    getElementByXpath('//*[@id="launchMeetingOptionsPage"]/div[8]/a').click();

    // click the play button
    setTimeout(() => {
        getElementByXpath('//*[@id="play-recording-shim-button"]').click();
    }, 1000);
});

function getElementByXpath(path) {
    return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}
