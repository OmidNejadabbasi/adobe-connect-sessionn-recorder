const openInBrowserXPath = '//*[@id="launchMeetingOptionsPage"]/div[8]/a';
const playButtonXPath = '//*[@id="play-recording-shim-button"]';
const timeProgressXPath = '//*[@id="playBar"]/div/div/div/div[5]'

document.addEventListener("DOMContentLoaded", () => {
    console.log("proloader works!");
    // clicking the open in browser button
    getElementByXpath(openInBrowserXPath).click();

    // click the play button
    setTimeout(() => {
        getElementByXpath(playButtonXPath).click();
    }, 23000);

    const progressTextElem = getElementByXpath(timeProgressXPath);
    setTimeout(() => {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === "characterData")
                    console.log(mutation.target.textContent); // <- It always detects changes
            });
        });

        var config = { characterData: true, subtree: true };
        observer.observe(progressTextElem, config);
    }, 23000);
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
