$(document).ready(() => {
  var choice = "hotels";

  showList(choice);
});

$("nav button").on("click", e => {
  $("nav button").toggleClass("active");
  choice = e.target.id.replace("btn-", "");
  $("#list").fadeOut("fast", $("#list").hide(), showList(choice));
});

$("#list").on("click", "header div", e => {
  let articleNum = e.target.id.slice(0, 1);
  $("section.wrap-" + articleNum).css("display") === "none"
    ? $("section.wrap-" + articleNum).fadeIn("slow")
    : $("section.wrap-" + articleNum).fadeOut("slow");
});

const showList = choice => {
  $.ajax({
    url: "./data/" + choice + ".json",

    success: (result, statut) => {
      $("#list ul").remove();
      if (choice === "hotels") {
        showHotels(result);
      } else if (choice === "cars") {
        showHcars(result);
      }
    },

    error: (resultat, statut, erreur) => {
      $("#list").append("<div><p>Erreur =>" + erreur + "</p></div>");
    },

    complete: (resultat, statut) => {
      $("#list");
    }
  });
};

const showHotels = result => {
  $("#list").append(
    "<ul>" +
      result.map(
        (hotel, index) =>
          `<li>
      <article>
        <header>
          <h2>${hotel.name}
         <div> <span id='${index}-${hotel.name}'>^</span></div></h2>
        </header>
        <section class='wrap-${index}'>
          <div>
            <figcaption>
              <img src=${hotel.imgPath} />
            </figcaption>
            <div>
              <p>
                Réservé ${hotel.nbReservationLast24hours} fois dans les
                dernières 24 heures.<br />
                <br />
                ${hotel.description}
                <br />
                <br />
                Arrivée le: ${hotel.dates.arrivalDate}
                <br />
                Départ le: ${hotel.dates.departureDate}
                <br />
              </p>
            </div>
          </div>
        </section>
      </article>
    </li>`
      ) +
      "</ul>"
  );
  $("#list")
    .fadeIn("slow")
    .show();
};

const showHcars = result => {
  $("#list").append(
    "<ul>" +
      result.map(
        (car, index) => `<li>
                  <article>
                    <header>
                      <h2>${car.brand}
                        <div> 
                          <span id='${index}-${car.brand}'>^</span>
                        </div>
                     </h2>
                    </header>
                    <section class='wrap-${index}'>
                      <div>
                        <figcaption>
                          <img src=${car.imgPath} />
                        </figcaption>
                        <ul>
                          <li>Puissance : ${car.power} cv</li>
                          <li>Energie : ${car.energy}</li>
                          <li>Année : ${car.year}</li>
                          <li>prix : ${car.price}€</li>
                        </ul>
                      </div>
                      <footer>
                        <p>Publié le ${car.datePublication}</p>
                      </footer>
                    </section>
                  </article>
                </li>`
      ) +
      "</ul>"
  );

  $("#list")
    .fadeIn("slow")
    .show();
};
