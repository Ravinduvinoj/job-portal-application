import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private storageKey = 'myData';

  // Setter: Save data to local storage
  set data(value: string) {
    localStorage.setItem(this.storageKey, value);
  }

  // Getter: Retrieve data from local storage
  get data(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  // Clear data from local storage
  clearData() {
    localStorage.removeItem(this.storageKey);
  }
}
