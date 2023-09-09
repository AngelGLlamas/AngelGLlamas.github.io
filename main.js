/*DOM*/

//accedemos a las imagenes de cabecera
const imgs = document.getElementById("imgs");
const img = document.querySelectorAll("#imgs img");

//accedemos al menu
const nav = document.querySelector(".nav");
window.addEventListener("scroll", fixNav);

//accedemos a elementos del menu
const navitems = document.querySelectorAll("nav ul li a");

//accedemos a los elementos de ultimos trabajos
const works = document.querySelectorAll(".work");

//acceso a elementos del portfolio
const portfolioimgs = document.querySelectorAll(".work-description i");

//accedemos a los label del formulario
const labels = document.querySelectorAll(".form-container label");
const textarea = document.querySelector(".form-container textarea");

//accedemos a los elementos del formulario
const formu = document.querySelector("#form");
const buttonmailto = document.querySelector("#envioform");

//Modal Window
let close = document.querySelectorAll(".close")[0];
let open = document.querySelectorAll(".work-description i");
let modal = document.querySelectorAll(".modal")[0];
let modalContainer = document.querySelectorAll(".modal-container")[0];
const modalImgTemplate = document.querySelector('.modal-img');
const modalImgs = document.querySelectorAll('.modal-img img');
let cont = 0

//buttons Modal Window
const arrowNext = document.querySelector(".modal-button .right");
const arrowBefore = document.querySelector(".modal-button .left");

/*DOM END*/

//***************Carrusel de imagenes ****************************

//movimiento de cabecera con intervalo
let idx = 0;
let interval = setInterval(run, 4000);

function run() {
  idx++;
  changeImage();
}

function changeImage() {
  if (idx > img.length - 1) {
    idx = 0;
  } else if (idx < 0) {
    idx = img.length - 1;
  }
  if (imgs) {
    imgs.style.transform = `translateX(${-idx * 100}vw)`;
  }
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(run, 4000);
}

//*****efecto de menu cuando hacemos scroll*****//
function fixNav() {
  if (window.scrollY > nav.offsetHeight + 150) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
}

//*****Last Works images*****//
if(works) {
  works.forEach(work => {
    work.addEventListener("click", () => {
      removeActiveClasses();
      work.classList.add("active");
    });
  });
}

const removeActiveClasses = () => {
  works.forEach((work) => {
    work.classList.remove("active");
  });
};

//***** delete content label form *****//
labels.forEach((label) => {
  label.innerHTML = label.innerHTML
    .split("")
    .map(
      (letter, idx) =>
        `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
    )
    .join("");
});

//*********lógica para controlar el envío del formulario a través del cliente de correo*******************//
if (formu) {
  formu.addEventListener("submit", mailTo);
}

function mailTo(event) {
  event.preventDefault();
  const form = new FormData(this);
  buttonmailto.setAttribute(
    "href",
    `mailto:estmatilla@hotmail.com?subject=Contacto Formulario Web&body=${form.get(
      "message"
    )}`
  );
  buttonmailto.click();
}

//****************lógica para controlar la funcionalidad de las imágenes en el modal***************//
if (portfolioimgs) {
  portfolioimgs.forEach(img => {
    img.addEventListener("click", () => {
      templateModal(img);
    });
  });
}

const templateModal = (img) => {
  modalImgTemplate.innerHTML = `
  <img src="img/${img.id}.jpg" alt="">
  <img src="img/${img.id}_img01.jpg" alt="">
  <img src="img/${img.id}_img02.jpg" alt="">
  <img src="img/${img.id}_img03.jpg" alt="">
  <img src="img/${img.id}_img04.jpg" alt="">
  `
};

//función para controlar la apertura de la ventana modal de imágenes
if(open) {
  open.forEach(work => {
    work.addEventListener("click", (event) => {
      event.preventDefault();
      modalContainer.style.opacity = "1";
      modalContainer.style.visibility = "visible";
      modal.classList.toggle("modal-close");
    });
  })
}

//desplazamos imágenes y las vamos alternando al principio y al final del carrusell
const Next = (event) => {
  event.preventDefault();
  let imgFirst = document.querySelectorAll(".modal-img img")[0];
  modalImgTemplate.style.opacity = "0";
  modalImgTemplate.style.transition = "all .5s";
  setTimeout(function () {
    modalImgTemplate.style.transition = "none";
    modalImgTemplate.insertAdjacentElement("beforeend", imgFirst);
    modalImgTemplate.style.marginLeft = "0";
    modalImgTemplate.style.opacity = "1";
    modalImgTemplate.style.transition = "all .5s";
  }, 500);  
}

const Prev = (event) => {
  event.preventDefault();
  let imgs = document.querySelectorAll(".modal-img img");
  let imgsLast = imgs[imgs.length - 1];
  modalImgTemplate.style.opacity = "0";
  modalImgTemplate.style.transition = "all .5s";
  setTimeout(function () {
    modalImgTemplate.style.transition = "none";
    modalImgTemplate.insertAdjacentElement("afterbegin", imgsLast);
    modalImgTemplate.style.marginLeft = "0";
    modalImgTemplate.style.opacity = "1";
    modalImgTemplate.style.transition = "all .5s";
  }, 500);
}

//controlar botones flecha de ventana modal
if(arrowNext || arrowBefore) {
  arrowNext.addEventListener("click", (event) => {
    Next(event);
  });
  
  arrowBefore.addEventListener("click", (event) => {
    Prev(event);
  });
}

//functions to control open modal window
if(close) {
  close.addEventListener("click", () => {
    modal.classList.toggle("modal-close");
  
    setTimeout(function () {
      modalContainer.style.opacity = "0";
      modalContainer.style.visibility = "hidden";
    }, 600);
  });
}

//function to control click outside modal window
window.addEventListener("click", (event) => {
  if (event.target == modalContainer) {
    modal.classList.toggle("modal-close");

    setTimeout(function () {
      modalContainer.style.opacity = "0";
      modalContainer.style.visibility = "hidden";
    }, 600);
  }
});
