const detailsButton = document.getElementsByClassName("btn-info");
const myUrl = "https://striveschool-api.herokuapp.com/api/product/";
const searchBar = new URLSearchParams(location.search);
const cardId = searchBar.get("cardId");
const row = document.getElementById("row-card");
console.log(cardId);
const trashButton = document.getElementById("delete");

console.log(trashButton);

const detailsFunction = function () {
  fetch(myUrl + cardId, {
    headers: {
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
    .then((data) => {
      console.log(data);
      const newCol = document.createElement("div");
      newCol.classList.add("col-6");
      newCol.innerHTML = `<div class="card">
      <img src="${data.imageUrl}" class="card-img-top" alt="fotoCopertina" />
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">${data.description}</p>
        <a href="#" class="btn btn-success"><i class="bi bi-bag-plus me-2"></i>${data.price} euro</a>
        <a href="./backoffice.html?cardId=${data._id}" class="btn btn-warning"><i class="bi bi-bag-plus me-2"></i>Edit</a>
      
      </div>
    </div>`;
      row.appendChild(newCol);
    })
    .catch((err) => {
      console.log("errore", err);
    });

  trashButton.addEventListener("click", function () {
    fetch(myUrl + cardId, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzVjOTE4N2U1YzAwMTgxNGM1ZmMiLCJpYXQiOjE3MDU2NTM3MDUsImV4cCI6MTcwNjg2MzMwNX0.dEzCZKlHjUQPP7Aw2VP5XAaGg8mOtjmcmn1GS-WvdiQ",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("cancellato!");
          location.assign("./index.html");
        } else {
          alert("problema nella cancellazione :(");
          throw new Error("errore nella cancellazione");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
detailsFunction();
