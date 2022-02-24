import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { response } from 'express';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employees: any;
  currentEmployee = null;
  currentIndex = -1;
  title = '';
  displayedColumns: string[] = ['Name', 'Adress', 'Salary', 'Job_title', 'Email', 'Hire_date', 'Project_id', 'Actions'];

  closeResult = '';

  // Edit Modal
  inputEditValue = {};
  projects : any;
  buffer: any;

  constructor(private employeesService: EmployeesService, private modalService: NgbModal) { }
  ngOnInit(): void {
    setTimeout(()=>{this.retrieveEmployees();}, 200)
    //this.retrieveEmployees();
    this.getProjects();
  }
  isToken(){
    return (localStorage.getItem('access_token'));
  }
  retrieveEmployees(): void {
    console.log("RETRIEVE");
    this.employeesService.getAll()
      .subscribe(
        data => {
          this.employees = data;
        },
        error => {
          console.log(error.status);
        });
  }
  getEmployees(): void {
    this.employeesService.getAll()
      .subscribe(
        data => {
          return JSON.parse(JSON.stringify(data));
        },
        error => {
          console.log(error);
          return null;
        });
  }
  getProjects(): any{
    this.employeesService.getAllProjects()
      .subscribe(
        data => {
          this.projects = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
  refreshList(): void{
    this.retrieveEmployees();
    this.currentEmployee = null;
    this.currentIndex = -1;
    console.log(this.employees);
  }
  setActiveEmployee(employee, index): void{
    this.currentEmployee = employee;
    this.currentIndex = index;
  }
  removeAllEmployees(): void {
    this.employeesService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveEmployees();
        },
        error => {
          console.log(error);
        });
  }
  removeCurrentEmployee(id): void{
    this.deleteEmployee(id);
  }
  deleteEmployee(id): void {
    this.employeesService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          this.employees = this.employees.filter((element) => {
            return element._id != id;
          });
        },
        error => {
          console.log("EROARE");
          console.log(error);
        });
  }
  updateEmployee(): any{
    console.log("EditValue Function Beginning:");
    console.log(this.inputEditValue);
    this.employeesService.update(this.currentEmployee._id, this.inputEditValue)
      .subscribe(
        response => {
          console.log("EditValue In Subscribe:");
          console.log(this.inputEditValue);
          if(response.message !== 'Unauthorized'){
            console.log("Modified");
          let index = 0;
          console.log("Current Employee");
          console.log(this.currentEmployee);
          for(let i = 0; i < this.employees.length; i++){
            if(this.employees[i]._id == this.currentEmployee._id){
              console.log("Employee Vector");
              console.log(this.employees[i]);
              console.log("Employee Selected");
              console.log(this.currentEmployee);
              index = i;
              break;
            }
          }
          console.log("INDEX: "+index);
          console.log("IV: ");
          console.log(this.inputEditValue);
          for(var [key, value] of Object.entries(this.inputEditValue)){
            this.employees[index][key] = value;
            console.log(this.employees[index]);
      }

          console.log(response);
          this.inputEditValue = {};
          this.currentEmployee={};
          return true;
        }},
        error => {
          console.log('The Update couldnt be made!')
          console.log(error);
          return false;
        });
        console.log("Dupa");
    return true;
  }
  openEdit(content, currentEmployee) {
    this.currentEmployee = currentEmployee;
    this.currentEmployee.Hire_date = this.currentEmployee.Hire_date.slice(0, 10);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAdd(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // Trebuie sa sterg variabile inputValue atunci cand modala se inchide
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    console.log("getDismissReason Function Called");
    setTimeout(()=>{
      this.inputEditValue = {};
      this.currentEmployee={};
    },1000);
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  inputEditModal(type, event): void{
    if(type === 'select'){
      this.inputEditValue["Project_id"] = event.value;
      console.log(this.inputEditValue);
    }
    else{
      this.inputEditValue[type] = event.target.value;
      console.log(this.inputEditValue);
    }
  }

  submitEditEmployee(): void{
    if(this.updateEmployee()){
      console.log("UE");
      /*let index = 0;
      for(let i = 0; i < this.employees.length; i++){
        if(this.employees[i]._id == this.currentEmployee._id){
          index = i;
          break;
        }
      }
      for(var [key, value] of Object.entries(this.inputEditValue)){
        this.employees[index][key] = value;
      }*/
      
      console.log("Before erase");
      console.log(this.inputEditValue);
      this.modalService.dismissAll();
      console.log(this.employees);
    }
    else{
      console.log("Nu s-a putut face modificarea!");
    }
  }

  // ADD MODAL
  addEmployee(data): void{
    console.log("Add Employee Function");
    this.employeesService.add(data)
      .subscribe(
        data => {
          console.log(data);
          this.buffer = JSON.parse(JSON.stringify(data));
          this.employees.push(this.buffer);
          this.inputEditValue = {};
          console.log(this.employees);
        },
        error => {
          console.log(error);
        }
      );
  }

  inputAddModal(type, event): void{
    if(type === 'select'){
      this.inputEditValue["Project_id"] = event.value;
      console.log(this.inputEditValue);
    }
    else{
      this.inputEditValue[type] = event.target.value;
      console.log(this.inputEditValue);
    }
  }

  submitAddEmployee(): void{
    if(typeof this.inputEditValue["Name"] === "undefined" || typeof this.inputEditValue["Adress"] === "undefined" || typeof this.inputEditValue["Email"] === "undefined"
    || typeof this.inputEditValue["Hire_date"] === "undefined" || typeof this.inputEditValue["Salary"] === "undefined" || typeof this.inputEditValue["Job_title"] === "undefined"
    || typeof this.inputEditValue["Project_id"] === "undefined")return;
    else{
      console.log("Tried to be added");
      this.addEmployee(this.inputEditValue);
      this.modalService.dismissAll();
      
    }

  }
}
