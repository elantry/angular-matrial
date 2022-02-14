import { ApiService } from './../../services/api.service';
import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editDate: any
  ) {}
  freshnesslist = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm!: FormGroup;
  actionbtn: string = 'save';
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
    if (this.editDate) {
      this.actionbtn = 'update';
      this.productForm.controls['productName'].setValue(
        this.editDate.productName
      );
      this.productForm.controls['category'].setValue(this.editDate.category);
      this.productForm.controls['freshness'].setValue(this.editDate.freshness);
      this.productForm.controls['price'].setValue(this.editDate.price);
      this.productForm.controls['comment'].setValue(this.editDate.comment);
      this.productForm.controls['date'].setValue(this.editDate.date);
    }
  }
  addProduct() {
    if (!this.editDate) {
      if (this.productForm.valid) {
        this.service.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('product added successfully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('error while adding the product');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }
  updateProduct() {
    this.service
      .putproduct(this.productForm.value, this.editDate.id)
      .subscribe({
        next: (res) => {
          this.productForm.reset();
          this.dialogRef.close('update');
          alert('update is successfully');
        },
        error: () => {
          alert('error while updateing');
        },
      });
  }
}
