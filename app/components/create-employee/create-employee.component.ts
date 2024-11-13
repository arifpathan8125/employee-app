import { Component, computed, effect, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { roles } from 'src/app/common/interfaces/employee';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {
  employeeForm!: FormGroup;
  roles = roles;
  empDetails: any = {};
  startDate = this.commonService.selectedStartDate;
  endDate = this.commonService.selectedEndDate;
  
  constructor(@Inject(MAT_DIALOG_DATA) employeeInfo: any, private dbService: NgxIndexedDBService, private commonService: CommonService) {
    this.employeeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });
    if(employeeInfo) {
      console.log(employeeInfo)
      this.employeeForm.patchValue({
        name: employeeInfo.name,
        role: employeeInfo.role
      });
      this.commonService.setSelectedStartDate(employeeInfo.startDate);
      this.commonService.setSelectedEndDate(employeeInfo.endDate);
      this.empDetails = employeeInfo;
    }
    else {
      this.commonService.setSelectedStartDate('');
      this.commonService.setSelectedEndDate('');
    }
  }

  ngOnInit() {}

  onSubmit() {
    if (this.employeeForm.valid) {
      if(!this.empDetails?.id) {
        this.dbService
        .add('employees', {
          name: this.employeeForm.value.name,
          role: this.employeeForm.value.role,
          startDate: this.startDate(),
          endDate: this.endDate() ? this.endDate() : '',  
        })
        .subscribe((res) => {
          this.commonService.refreshEmpList('added');
        });
      }
      else {
        const empDtls = {
          ...this.empDetails,
          name: this.employeeForm.value.name,
          role: this.employeeForm.value.role,
          startDate: this.startDate(),
          endDate: this.endDate() ? this.endDate() : ''
        }
        this.dbService
        .update('employees', empDtls)
        .subscribe((res) => {
          this.commonService.refreshEmpList('updated');
        });
      }
    }
  }
}
