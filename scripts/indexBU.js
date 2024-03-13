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
    const id = ++this.id;
    const newActivity = new Activity(id, title, description, imgUrl);
    this.activities.push(newActivity);
  }

  deleteActivity(id) {
    this.activities = this.activities.filter((activity) => activity.id !== id);
  }
}

const repository = new Repository();

/*// Agregar actividades favoritas
repository.createActivity("Hacer ejercicio", "Ir al gimnasio todos los días", "gimnasio.jpg");
repository.createActivity("Leer un libro", "Leer al menos 30 minutos al día", "libro.jpg");
repository.createActivity("Aprender a programar", "Practicar codificación en JavaScript", "coding.jpg");

// Obtener todas las actividades y mostrarlas en la consola
const actividades = repository.getAllActivities();
console.log("Todas las actividades:");
console.log(actividades);*/

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

function addButtonHandler() {
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

  // Invocar la función para refrescar el contenedor de actividades
  renderActivities("#actividades-container");
}

// Seleccionar el botón de agregar actividad
const addButton = document.getElementById("add-button");

// Agregar un Event Listener al botón para ejecutar la función addButtonHandler al hacer clic
addButton.addEventListener("click", addButtonHandler);

// Obtener el contenedor de actividades
const actividadesContainer = document.querySelector("#actividades-container");

// Agregar un Event Listener al contenedor de actividades para delegar eventos
actividadesContainer.addEventListener("click", function (event) {
  // Verificar si el clic ocurrió en un botón de eliminar actividad
  if (event.target.classList.contains("delete-button")) {
    // Obtener el ID de la actividad a eliminar
    const activityId = parseInt(event.target.dataset.activityId);

    // Llamar al método deleteActivity de la instancia de Repository para eliminar la actividad
    repository.deleteActivity(activityId);

    // Refrescar el contenedor de actividades
    renderActivities("#actividades-container");
  }
});
