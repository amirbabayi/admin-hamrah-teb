import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BlogService } from '../../blogs.service';
import { Duty } from 'src/app/apps/duties/duty.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Duty,
    public blogService: BlogService,
    private snackBar: MatSnackBar
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.blogService.deleteBlog(this.data.Id).subscribe({
      next: (data) => {
        if (data.status == 0) {
          this.snackBar.open(data.message, '', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-success',
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.message, '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'snackbar-danger',
        });
      },
    });
  }
}
