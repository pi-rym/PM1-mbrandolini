class Activity {
  constructor(id, title, description, imgUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

class Repository {
  constructor() {
    this.activities = [];
    this.id = 0;
  }

  getAllActivities() {
    return this.activities;
  }

  createActivity(title, description, imgUrl) {
    const id = this.id++;
    const newActivity = new Activity(id, title, description, imgUrl);
    this.activities.push(newActivity);
  }

  deleteActivity(id) {
    this.activities = this.activities.filter((activity) => activity.id !== id);
  }
}

const repository = new Repository();

function createActivityCard(activity) {
  // Extraer propiedades del objeto Activity usando destructuring
  const { title, description, imgUrl } = activity;

  // Crear elementos HTML para la tarjeta de actividad
  const card = document.createElement("div");
  const titleElement = document.createElement("h3");
  const descriptionElement = document.createElement("p");
  const imageElement = document.createElement("img");

  // Asignar valores a las propiedades correspondientes de los elementos
  titleElement.innerHTML = title;
  descriptionElement.innerHTML = description;
  imageElement.src = imgUrl;

  // Agregar clases CSS a los elementos
  card.classList.add("card");
  titleElement.classList.add("activity-title");
  descriptionElement.classList.add("activity-description");
  imageElement.classList.add("activity-image");

  // Agregar los elementos al div de la tarjeta
  card.appendChild(titleElement);
  card.appendChild(descriptionElement);
  card.appendChild(imageElement);

  // Asignar clase CSS al div de la tarjeta
  card.classList.add("activity-card");

  // Retornar el div finalizado con todos los elementos correspondientes dentro
  return card;
}

function renderActivities(container) {
  // Seleccionar el contenedor donde queremos agregar las actividades
  const containerElement = document.querySelector(container);

  // Vaciar el contenido actual del contenedor
  containerElement.innerHTML = "";

  // Obtener el listado completo de actividades
  const activities = repository.getAllActivities();

  // Mapear el listado de actividades para convertirlos en elementos HTML
  const activityElements = activities.map((activity) =>
    createActivityCard(activity)
  );

  // Appendear todos los elementos HTML dentro del contenedor seleccionado
  activityElements.forEach((element) => {
    containerElement.appendChild(element);
  });
}

function addButtonHandler(event) {
  event.preventDefault(); // Evitar que el formulario se envíe

  // Seleccionar los inputs de title, description e imgUrl
  const titleInput = document.getElementById("titulo");
  const descriptionInput = document.getElementById("descripcion");
  const imgUrlInput = document.getElementById("url-imagen");

  // Tomar los valores ingresados en los inputs y guardarlos en variables
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const imgUrl = imgUrlInput.value.trim();

  // Validar que los valores estén completos
  if (!title || !description || !imgUrl) {
    alert("Por favor completa todos los campos");
    return; // Cortar el proceso si hay datos incompletos
  }

  // Llamar al método correspondiente de la instancia de Repository para crear una nueva actividad
  repository.createActivity(title, description, imgUrl);

  // Limpiar los inputs del formulario
  titleInput.value = "";
  descriptionInput.value = "";
  imgUrlInput.value = "";

  // Invocar la función para refrescar el contenedor de actividades
  renderActivities("#actividades-container");
}

// Seleccionar el formulario de actividad
const activityForm = document.getElementById("actividad-form");

// Agregar un Event Listener al formulario para ejecutar la función addButtonHandler al hacer clic en el botón de submit
activityForm.addEventListener("submit", addButtonHandler);

// Llamar a renderActivities para mostrar las actividades inicialmente
renderActivities("#actividades-container");
