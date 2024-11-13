import { Component, effect, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Employee } from 'src/app/common/interfaces/employee';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { CommonService } from 'src/app/common/services/common.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnDestroy {
  employeeList: Employee[] = [];
  previousEmployeeList: Employee[] = [];
  ngUnSubscribe = new Subject();

  constructor(private matDialog: MatDialog, private dbService: NgxIndexedDBService, private commonService: CommonService) {
    this.detectEmployeeData();
    this.detectEmpInfo();
  }

  detectEmpInfo() {
    this.commonService.refreshEmployeeList$.pipe(takeUntil(this.ngUnSubscribe)).subscribe(res => {
      if(res) {
        this.detectEmployeeData();
      }
    })
  }

  onCreateEmployee() {
    this.matDialog.open(CreateEmployeeComponent, {
      width: '400px',
      maxHeight: '90vh',
      autoFocus: false
    })
  }

  onEditEmployee(employee: Employee) {
    this.matDialog.open(CreateEmployeeComponent, {
      width: '400px',
      maxHeight: '90vh',
      autoFocus: false,
      data: employee,
    })
  }

  onDeleteEmployee(employee: Employee) {
    const id: any = employee.id;
    this.dbService.delete('employees', id).subscribe((allPeople) => {
      this.detectEmployeeData();
    });
  }

  detectEmployeeData() {
    this.employeeList = [];
    this.previousEmployeeList = [];
    this.dbService.getAll('employees').subscribe((res: any) => {
      if(res) {
        res.forEach((x: any) => {
          if(!x.endDate) {
            this.employeeList.push({
              ...x,
              startDate: x.startDate ? new Date(x.startDate) : '',
            });
          }
          else {
            this.previousEmployeeList.push({
              ...x,
              startDate: x.startDate ? new Date(x.startDate) : '',
              endDate: x.endDate ? new Date(x.endDate) : '',
            });
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.ngUnSubscribe.complete();
    this.ngUnSubscribe.unsubscribe();
  }
}
