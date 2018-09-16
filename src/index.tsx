class Ding {
    dong = () => {
        return "dingdong";
    };
}

document.getElementById("root")!.innerHTML = new Ding().dong();
