import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  Projects: any;
  currentProject = null;
  currentIndex = -1;
  title = '';

  closeResult = '';

  // Edit Modal
  inputEditValue = {};
  projects : any;
  deleteOk = true;

  constructor(private projectsService: ProjectsService, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.retrieveProjects();
  }
  retrieveProjects(): void {
    this.projectsService.getAll()
      .subscribe(
        data => {
          this.projects = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  refreshList(): void{
    this.retrieveProjects();
    this.currentProject = null;
    this.currentIndex = -1;
    console.log(this.projects);
  }
  setActiveProject(Project, index): void{
    this.currentProject = Project;
    this.currentIndex = index;
  }
  removeAllProjects(): void {
    this.projectsService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveProjects();
        },
        error => {
          console.log(error);
        });
  }
  removeCurrentProject(id): void{
    if(this.deleteProject(id)){
      this.projects = this.projects.filter((element) => {
        return element._id != id;
      });
    }
  }
  deleteProject(id): any {
    this.projectsService.delete(id)
      .subscribe(
        response => {
          this.deleteOk = true;
          console.log(response.status);
          return true;
        },
        error => {
          this.deleteOk = false;
          console.log(error);
          return false;
        });
  }
  checkDeleteOk(): any{
    return (this.deleteOk === true);
  }
  closeAlert(): void{
    this.deleteOk = true;
  }
  updateProject(): any{
    this.projectsService.update(this.currentProject._id, this.inputEditValue)
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
  openEdit(content, currentProject) {
    this.currentProject = currentProject;
    this.currentProject.Start_date = this.currentProject.Start_date.slice(0, 10);
    this.currentProject.Planned_end_date = this.currentProject.Planned_end_date.slice(0, 10);

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
    this.currentProject = {};
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

  submitEditProject(): void{
    if(this.updateProject()){
      let index = 0;
      for(let i = 0; i < this.projects.length; i++){
        if(this.projects[i]._id == this.currentProject._id){
          index = i;
          break;
        }
      }
      for(var [key, value] of Object.entries(this.inputEditValue)){
        this.projects[index][key] = value;
      }
      this.currentProject = {};
      this.inputEditValue = {};
      this.modalService.dismissAll();
      console.log(this.projects);
    }
    else{
      console.log("Nu s-a putut face modificarea!");
    }
  }

  // ADD MODAL
  addProject(data): any{
    console.log("Add Project Function");
    this.projectsService.add(data)
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

  submitAddProject(): void{
    if(typeof this.inputEditValue["Project_name"] === "undefined" || typeof this.inputEditValue["Start_date"] === "undefined" || typeof this.inputEditValue["Planned_end_date"] === "undefined"
    || typeof this.inputEditValue["Description"] === "undefined" || typeof this.inputEditValue["Project_code"] === "undefined")return;
    else{
      console.log("Tried to be added");
      this.addProject(this.inputEditValue);
      this.projects.push(this.inputEditValue);
      console.log(this.projects);
    }

  }
}
