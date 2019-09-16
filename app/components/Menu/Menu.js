import { action, computed, observable, decorate } from "mobx";

/**
 * MobX сервис для открытия и закрытия менюшки из других частей приложения
 */
class Menu {
  /**
   * Состояние менюшки
   */
  toggle;

  constructor() {
    this.toggle = true;
    console.log(this);
  }

  /**
   * Этим методом меняется состояние менюшки и она открывается/закрыватся
   */
  Toggle() {
    this.toggle = !this.toggle;
  }

  /**
   * Получение состояния
   */
  get getToggle() {
    return this.toggle;
  }
}

/**
 * Прихоти MobX-а
 */
decorate(Menu, {
  toggle: observable,
  getToggle: computed,
  Toggle: action
})

export default new Menu()