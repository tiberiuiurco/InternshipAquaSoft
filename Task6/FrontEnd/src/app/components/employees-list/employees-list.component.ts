import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private employeesService: EmployeesService, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.retrieveEmployees();
    this.getProjects();
  }
  retrieveEmployees(): void {
    this.employeesService.getAll()
      .subscribe(
        data => {
          this.employees = data;
          console.log(data);
        },
        error => {
          console.log(error);
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
    this.employees = this.employees.filter((element) => {
      return element._id != id;
    });
  }
  deleteEmployee(id): void {
    this.employeesService.delete(id)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
  updateEmployee(): any{
    this.employeesService.update(this.currentEmployee._id, this.inputEditValue)
      .subscribe(
        response => {
          console.log(response);
          this.inputEditValue = {};
          return true;
        },
        error => {
          console.log('The Update couldnt be made!')
          console.log(error);
          return false;
        });
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
    this.currentEmployee = {};
    this.inputEditValue = {};
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
      let index = 0;
      for(let i = 0; i < this.employees.length; i++){
        if(this.employees[i]._id == this.currentEmployee._id){
          index = i;
          break;
        }
      }
      for(var [key, value] of Object.entries(this.inputEditValue)){
        this.employees[index][key] = value;
      }
      this.currentEmployee = {};
      this.inputEditValue = {};
      this.modalService.dismissAll();
      console.log(this.employees);
    }
    else{
      console.log("Nu s-a putut face modificarea!");
    }
  }

  // ADD MODAL
  addEmployee(data): any{
    console.log("Add Employee Function");
    this.employeesService.add(data)
      .subscribe(
        data => {
          console.log(data);
          this.inputEditValue = {};
          this.modalService.dismissAll();
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
      this.employees.push(this.inputEditValue);
      console.log(this.employees);
    }

  }
}
