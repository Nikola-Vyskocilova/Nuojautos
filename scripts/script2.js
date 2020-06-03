function getCollections() {
    fetch("https://multidani.eu/shop/wp-json/wp/v2/collection")
        .then(res => res.json())
        .then(handleCollections)
}

function handleCollections(collections) {
    collections.forEach(createCollectionSections)
}

function createCollectionSections(collection) {
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);

    copy.querySelector(".year_text").innerHTML = collection.year;
    copy.querySelector(".name_text").innerHTML = collection.name + ".";
    copy.querySelector(".upsidown_text").innerHTML = collection.name + ".";
    copy.querySelector(".collection-img").src = collection.collection_hover_image.guid;
    const a = document.createElement("a");
    a.href = collection.slug + ".html";
    copy.querySelector(".collection-box").appendChild(a);
    document.querySelector(".collections_container").appendChild(copy);

}

/*-------GO TO TOP BTN------------------------------*/

//enable/disable scroll button based on scroller position
function scrollFunction() {
//    var topBtn = document.getElementById("topBtn");
    var topBtn = document.getElementById("topBtn");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

window.onscroll = function () {
    scrollFunction()
};

/*---GO TO TOP BTN-------------------------------------*/

// When the user clicks on the button, scroll to the top of the document
function topFunction() { // eslint-disable-line no-unused-vars
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

