import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly JOB_DATA_KEY = 'jobData';

  constructor() { }

  setJobData(data: any) {
    // Store data in local storage
    localStorage.setItem(this.JOB_DATA_KEY, JSON.stringify(data));
  }

  getJobData() {
    // Retrieve data from local storage
    const data = localStorage.getItem(this.JOB_DATA_KEY);
    return data ? JSON.parse(data) : null;
  }
}
