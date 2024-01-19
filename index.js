const row = document.getElementById("row-cards");

const cardFunction = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzVjOTE4N2U1YzAwMTgxNGM1ZmMiLCJpYXQiOjE3MDU2NTM3MDUsImV4cCI6MTcwNjg2MzMwNX0.dEzCZKlHjUQPP7Aw2VP5XAaGg8mOtjmcmn1GS-WvdiQ",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("errore nella chiamata");
        throw new Error();
      }
    })
    .then((data) => {
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("col-12", "col-md-4", "col-lg-3");
        newDiv.innerHTML = `
        <div class="card">
          <img src="${data[i].imageUrl}" class="card-img-top" alt="fotoCopertina" />
          <div class="card-body">
            <h5 class="card-title">${data[i].name}</h5>
            <p class="card-text">${data[i].description}</p>
            <a href="#" class="btn btn-success"><i class="bi bi-bag-plus me-2"></i>${data[i].price} euro</a>
            <a href="./details.html?cardId=${data[i]._id}" class="btn btn-info mt-2"><i class="bi bi-eyeglasses me-2 "></i>Dettagli</a>
          </div>
        </div>`;
        row.appendChild(newDiv);
      }
      const cartArray = [];
      const buyButton = document.getElementsByClassName("btn-success");
      for (let i = 0; i < buyButton.length; i++) {
        buyButton[i].addEventListener("click", function () {
          const dropDown = document.getElementsByClassName("dropdown-menu")[0];
          const newLi = document.createElement("li");
          newLi.classList.add("p-3");
          newLi.innerText = data[i].name;
          dropDown.appendChild(newLi);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
cardFunction();
