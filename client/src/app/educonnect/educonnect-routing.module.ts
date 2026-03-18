import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseCreateComponent } from "./components/coursecreate/coursecreate.component";
import { CourseEditComponent } from "./components/courseedit/courseedit.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EnrollmentComponent } from "./components/enrollment/enrollment.component";
import { StudentCreateComponent } from "./components/studentcreate/studentcreate.component";
import { StudentEditComponent } from "./components/studentedit/studentedit.component";
import { TeacherCreateComponent } from "./components/teachercreate/teachercreate.component";
import { TeacherEditComponent } from "./components/teacheredit/teacheredit.component";
 
const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: 'student', component: StudentCreateComponent },
  { path: 'teacher', component: TeacherCreateComponent },
  { path: 'course', component: CourseCreateComponent },
  { path: 'student/edit/:id', component: StudentEditComponent },
  { path: 'teacher/edit/:id', component: TeacherEditComponent },
  { path: 'course/edit/:id', component: CourseEditComponent },
  { path: 'enrollment', component: EnrollmentComponent },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EduConnectRoutingModule { }