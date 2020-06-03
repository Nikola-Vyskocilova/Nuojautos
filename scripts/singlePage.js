window.addEventListener('DOMContentLoaded', getData);

var black = true;
var currentShirt;

function getData() {

    const urlParams = new URLSearchParams(window.location.search);
    const shirt_id = urlParams.get("shirt_id");


    fetch("http://multidani.eu/shop/wp-json/wp/v2/t-shirt/" + shirt_id)
        .then(res => res.json())
        .then(showShirt)

}

function showShirt(shirt) {
    console.log(shirt)
    currentShirt = shirt;
    document.querySelector(".t-shirt_img").src = shirt.pictures[0].guid;
    document.querySelector(".shirt_name_top").innerHTML = shirt.label;
    document.querySelector(".shirt_quote").innerHTML = shirt.quote;
    document.querySelector(".shirt_description").innerHTML += shirt.description.replace(/\./g, '. <br> <br>');
    document.querySelector(".shirt_price").innerHTML = shirt.price + " EUR";
    document.querySelector(".shirt_name_bot").innerHTML = shirt.label;

    console.log(shirt.pictures.length);
    if (shirt.pictures.length > 1) {
        document.querySelector(".zoomed_img").src = shirt.pictures[2].guid;
    }
    if (shirt.collection_label === "pure_love") {
        document.querySelector(".shirt_name_top").style.color = '#707070';
        document.querySelector(".btns").style.display = 'none';
    }

    document.querySelector(".description").style.backgroundImage = "url('images/" + shirt.collection_label + ".jpg')";
}

function changeShirtColor() {
    if (black) {
        document.querySelector(".t-shirt_img").src = currentShirt.pictures[1].guid;
        black = false;
    } else {
        document.querySelector(".t-shirt_img").src = currentShirt.pictures[0].guid;
        black = true;
    }
}
