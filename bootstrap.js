// @ts-check

function loadScriptSync(src) {
    var s = document.createElement("script");
    s.src = src;
    s.type = "text/javascript";
    s.async = false;
    var node = document.getElementsByTagName("script")[0];
    node.parentNode.insertBefore(s, node.nextSibling);
}

loadScriptSync("http://localhost:8080/dist/main.bundle.js");
