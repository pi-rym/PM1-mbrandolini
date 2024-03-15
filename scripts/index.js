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
  const { id, title, description, imgUrl } = activity;

  const card = document.createElement("div");
  const titleElement = document.createElement("h3");
  const descriptionElement = document.createElement("p");
  const imageElement = document.createElement("img");
  const deleteButton = document.createElement("button");

  titleElement.innerHTML = title;
  descriptionElement.innerHTML = description;
  imageElement.src = imgUrl;
  deleteButton.innerHTML = "Eliminar";

  card.classList.add("activity-card");
  titleElement.classList.add("activity-title");
  descriptionElement.classList.add("activity-description");
  imageElement.classList.add("activity-image");
  deleteButton.classList.add("delete-button");

  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();

    const activityId = id;

    repository.deleteActivity(activityId);

    renderActivities("#actividades-container");
  });

  card.appendChild(titleElement);
  card.appendChild(descriptionElement);
  card.appendChild(imageElement);
  card.appendChild(deleteButton);

  return card;
}

function renderActivities(container) {
  const containerElement = document.querySelector(container);

  containerElement.innerHTML = "";

  const activities = repository.getAllActivities();

  const activityElements = activities.map((activity) => {
    const card = createActivityCard(activity);

    card.addEventListener("click", function () {
      const activityId = activity.id;

      repository.deleteActivity(activityId);

      renderActivities(container);
    });
    return card;
  });

  activityElements.forEach((element) => {
    containerElement.appendChild(element);
  });
}

function addButtonHandler(event) {
  event.preventDefault();

  const titleInput = document.getElementById("titulo");
  const descriptionInput = document.getElementById("descripcion");
  const imgUrlInput = document.getElementById("url-imagen");

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const imgUrl = imgUrlInput.value.trim();

  if (!title || !description || !imgUrl) {
    alert("Por favor completa todos los campos");
    return;
  }

  repository.createActivity(title, description, imgUrl);

  titleInput.value = "";
  descriptionInput.value = "";
  imgUrlInput.value = "";

  renderActivities("#actividades-container");
}

const activityForm = document.getElementById("actividad-form");

activityForm.addEventListener("submit", addButtonHandler);

renderActivities("#actividades-container");
