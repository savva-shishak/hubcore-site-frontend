import { action, computed, observable, decorate } from "mobx";

class Menu {
  toggle;

  constructor() {
    this.toggle = true;
    console.log(this);
  }

  Toggle() {
    this.toggle = !this.toggle;
  }

  get getToggle() {
    return this.toggle;
  }
}

decorate(Menu, {
  toggle: observable,
  getToggle: computed,
  Toggle: action
})

export default new Menu()