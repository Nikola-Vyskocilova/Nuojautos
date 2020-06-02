window.addEventListener('DOMContentLoaded', getData);

function getData() {

    const urlParams = new URLSearchParams(window.location.search);
    const shirt_id = urlParams.get("shirt_id");


    fetch("http://multidani.eu/shop/wp-json/wp/v2/t-shirt/" + shirt_id)
        .then(res => res.json())
        .then(showShirt)
}

function showShirt(shirt) {
    console.log(shirt)
    document.querySelector(".t-shirt_img").src = shirt.pictures[0].guid;
    document.querySelector(".shirt_name_top").innerHTML = shirt.label;
    document.querySelector(".shirt_quote").innerHTML = shirt.quote;
    document.querySelector(".shirt_description").innerHTML = shirt.description;
    document.querySelector(".shirt_price").innerHTML = shirt.price;
    document.querySelector(".shirt_name_bot").innerHTML = shirt.label;

    console.log(shirt.pictures.length);
    if (shirt.pictures.length > 1) {
        document.querySelector(".zoomed_img").src = shirt.pictures[2].guid;
    }

}
