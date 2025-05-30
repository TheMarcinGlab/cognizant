import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatSelectModule }    from '@angular/material/select';
import { MatButtonModule }    from '@angular/material/button';
import { MatCheckboxModule }  from '@angular/material/checkbox';
import { MatIconModule }      from '@angular/material/icon';
import { MatSnackBarModule }  from '@angular/material/snack-bar';
import { MatOptionModule }    from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
