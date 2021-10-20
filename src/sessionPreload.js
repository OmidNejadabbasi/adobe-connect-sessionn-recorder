document.addEventListener("DOMContentLoaded", () => {
    console.log("proloader works!");
    setTimeout(() => {
        getElementByXpath('//*[@id="coral-id-0"]').checked = true;
    }, 3000);
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
