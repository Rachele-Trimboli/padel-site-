const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const urlInput = document.getElementById("imageUrl");
const priceInput = document.getElementById("price");
const form = document.getElementsByTagName("form")[1];
const myUrl = "https://striveschool-api.herokuapp.com/api/product/";
const searchBar = new URLSearchParams(location.search);
const cardId = searchBar.get("cardId");

if (cardId) {
  document.getElementById("form-title").innerText = "Modifica il Prodotto";

  fetch(myUrl + cardId, {
    method: "PUT",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzVjOTE4N2U1YzAwMTgxNGM1ZmMiLCJpYXQiOjE3MDU2NTM3MDUsImV4cCI6MTcwNjg2MzMwNX0.dEzCZKlHjUQPP7Aw2VP5XAaGg8mOtjmcmn1GS-WvdiQ",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then((singleCard) => {
      console.log(singleCard);
      nameInput.value = singleCard.name;
      descriptionInput.value = singleCard.description;
      brandInput.value = singleCard.brand;
      urlInput.value = singleCard.imageUrl;
      priceInput.value = singleCard.price;
    })
    .catch((err) => {
      console.log(err);
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newProductInsert = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: urlInput.value,
    price: priceInput.value,
  };

  const createProduct = function (newProduct) {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzVjOTE4N2U1YzAwMTgxNGM1ZmMiLCJpYXQiOjE3MDU2NTM3MDUsImV4cCI6MTcwNjg2MzMwNX0.dEzCZKlHjUQPP7Aw2VP5XAaGg8mOtjmcmn1GS-WvdiQ",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella richiesta");
        }
      })
      .then((data) => {
        console.log(data);
        alert("Il tuo prodotto è stato aggiunto");
        location.assign("./index.html");
      })
      .catch((error) => {
        console.error("Errore nella chiamata:", error);
      });
  };

  createProduct(newProductInsert);
});
