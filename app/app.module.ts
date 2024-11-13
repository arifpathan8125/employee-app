import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIndexedDBModule, DBConfig } from "ngx-indexed-db";
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomEndDatePickerComponent, DatePickerHeaderEnd } from './components/custom-end-date-picker/custom-end-date-picker.component';
import { CustomStartDatePickerComponent, DatePickerHeader } from './components/custom-start-date-picker/custom-start-date-picker.component';

const dbConfig: DBConfig = {
  name: "EmpDb",
  version: 1,
  objectStoresMeta: [
    {
      store: "employees",
      storeConfig: { keyPath: "id", autoIncrement: true },      
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        // { name: "role", keypath: "role", options: { unique: false } },
        // { name: "startDate", keypath: "startDate", options: { unique: false } },
        // { name: "endDate", keypath: "endDate", options: { unique: false } }
      ]
    }
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    CustomStartDatePickerComponent,
    CustomEndDatePickerComponent,
    DatePickerHeader,
    DatePickerHeaderEnd,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  // entryComponents: [CustomDatePickerComponent, DatePickerHeader],
  // providers: [
  //   { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
