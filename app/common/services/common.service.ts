import { computed, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private newStDate = signal('');
  selectedStartDate = computed(() => this.newStDate());

  private newEndDate = signal('');
  selectedEndDate = computed(() => this.newEndDate());

  private refreshListSubject = new Subject();
  refreshEmployeeList$ = this.refreshListSubject.asObservable();

  constructor() { }

  refreshEmpList(data: string) {
    this.refreshListSubject.next(data);
  }

  setSelectedStartDate(data: string) {
    this.newStDate.set(data);
  }

  setSelectedEndDate(data: string) {
    this.newEndDate.set(data);
  }
}
