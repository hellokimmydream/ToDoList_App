import { mount } from "@vue/test-utils";
import CreateToDo from "../components/CreateToDo.vue";
import { describe } from "vitest";

describe("CreateToDo.vue", () => {
  it("devrait émettre l'événement 'addTodo' avec le texte saisi lorsque le formulaire est soumis", async () => {
    // préparation test

    // monte composant comme si affiché dans navigateur
    const component = mount(CreateToDo);
    // cherche input dans composant
    const todoInput = component.find("input[type='text']");
    const todoForm = component.find("form");
    const todoFormulaire = component.find("form");
    const userText = "Tester nouvelle tache";

    // action user
    // simule texte entré
    await todoInput.setValue(userText); // sur l'input
    await todoForm.trigger("submit"); // sur form
    // simle clique ajouté
    await todoFormulaire.trigger("submit");

    // vérification, récupération des evenement que le composant a émi
    const emitEvent = component.emitted();

    // vérification evenement existant
    // [0] parce que chaque emit est stocké dans un tableau
    expect(emitEvent).toHaveProperty("addTodo");
    expect(emitEvent.addTodo[0][0]).toBe(userText);
  });
});

// lancer npm run test
// mode interactif : npx vitest --ui
