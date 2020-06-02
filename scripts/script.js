window.addEventListener('DOMContentLoaded', init);


function init() {
    getCollections();
    getData();
}

function getCollections() {
    fetch("http://multidani.eu/shop/wp-json/wp/v2/collection")
        .then(res => res.json())
        .then(handleCollections)
}

function handleCollections(collections) {
    collections.forEach(createCollectionSections)
}

function createCollectionSections(collection) {
    console.log(collection);
    const div = document.createElement("DIV");
    div.classList.add("grid-wrapper");
    div.classList.add(collection.slug);

    const collectionImageDiv = document.createElement("DIV");
    collectionImageDiv.classList.add("collectionImage");
    collectionImageDiv.setAttribute("id", collection.slug);

    const centeredText = document.createElement("DIV");
    centeredText.classList.add("centeredText");

    const centeredQuote = document.createElement("p");
    centeredQuote.classList.add("centeredQuote");
    centeredQuote.innerHTML = "<br> <br>" + collection.quote.toLowerCase();
    centeredText.innerHTML = collection.name.toUpperCase();

    const collectionImage = document.createElement("IMG");
    collectionImage.src = collection.collection_image.guid;

    collectionImageDiv.appendChild(collectionImage);
    collectionImageDiv.appendChild(centeredText);
    collectionImageDiv.appendChild(centeredQuote);
    document.querySelector("main").appendChild(collectionImageDiv);
    document.querySelector("main").appendChild(div);

    if (collection.slug === "pure_love") {
        centeredText.style.color = '#5B7876';
        centeredQuote.style.color = '#5B7876';

    }
}

function getData() {
    fetch("http://multidani.eu/shop/wp-json/wp/v2/t-shirt/?per_page=100")
        .then(res => res.json())
        .then(handleData)
}

function handleData(shirts) {
    shirts.forEach(showShirt);
}

function showShirt(shirt) {
    console.log(shirt)
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".t-shirt_name").innerHTML = shirt.label;
    copy.querySelector(".t-shirt_image").src = shirt.pictures[0].guid;
    copy.querySelector(".t-shirt_quote").innerHTML = shirt.quote;
    copy.querySelector(".t-shirt_price").innerHTML = shirt.price + "€";
    const a = document.createElement("a");
    a.href = "singlepage.html?shirt_id=" + shirt.id;
    copy.querySelector(".grid-number").appendChild(a);

    if(shirt.collection_label === "aliens") {
        copy.querySelector(".grid-number").classList.add("avoid-clicks");
    }

    document.querySelector("." + shirt.collection_label).appendChild(copy);
}
