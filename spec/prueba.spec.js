const { Activity, Repository } = require("../scripts/index");
//const { createActivityCard, renderActivities, addButtonHandler } = require("../scripts/domUtils");

describe("Clase Activity", function () {
  it("debería ser una clase", function () {
    expect(typeof Activity).toEqual("function");
  });

  it("debería tener una propiedad 'id'", function () {
    const actividad = new Activity(1, "Título", "Descripción", "imgUrl");
    expect(actividad.id).toBeDefined();
  });

  it("debería tener una propiedad 'title'", function () {
    const actividad = new Activity(1, "Título", "Descripción", "imgUrl");
    expect(actividad.title).toBeDefined();
  });

  it("debería tener una propiedad 'description'", function () {
    const actividad = new Activity(1, "Título", "Descripción", "imgUrl");
    expect(actividad.description).toBeDefined();
  });

  it("debería tener una propiedad 'imgUrl'", function () {
    const actividad = new Activity(1, "Título", "Descripción", "imgUrl");
    expect(actividad.imgUrl).toBeDefined();
  });
});

describe("Clase Repository", function () {
  it("debería ser una clase", function () {
    expect(typeof Repository).toEqual("function");
  });

  it("debería tener una propiedad 'activities'", function () {
    const repositorio = new Repository();
    expect(repositorio.activities).toBeDefined();
  });

  it("debería tener una propiedad 'id'", function () {
    const repositorio = new Repository();
    expect(repositorio.id).toBeDefined();
  });

  it("debería tener un método 'getAllActivities'", function () {
    const repositorio = new Repository();
    expect(typeof repositorio.getAllActivities).toEqual("function");
  });

  it("debería tener un método 'createActivity'", function () {
    const repositorio = new Repository();
    expect(typeof repositorio.createActivity).toEqual("function");
  });

  it("debería tener un método 'deleteActivity'", function () {
    const repositorio = new Repository();
    expect(typeof repositorio.deleteActivity).toEqual("function");
  });
});
