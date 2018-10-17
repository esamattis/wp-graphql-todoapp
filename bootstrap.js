// @ts-check

function loadScriptSync(src) {
    var s = document.createElement("script");
    s.src = src;
    s.type = "text/javascript";
    s.async = false;
    var node = document.getElementsByTagName("script")[0];
    node.parentNode.insertBefore(s, node.nextSibling);
}

var productionBundle = document.querySelector("[data-production-bundle]").dataset.productionBundle;

if (window.localStorage.devBundle) {
    loadScriptSync(window.localStorage.devBundle);
} else {
    loadScriptSync(productionBundle);
}
