import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IDeactivateGuard } from '../guard/deactivate.guard.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-updatecarsdetails',
  templateUrl: './updatecarsdetails.component.html',
  styleUrls: ['./updatecarsdetails.component.css']
})



export class UpdatecarsdetailsComponent implements OnInit ,IDeactivateGuard{
  productlist:any;
  updateProduct!:FormGroup;
  selectedFile!:File;
  addproductmessage: any;
  productdetails: any;
  constructor(private _formbuilder:FormBuilder,private http:HttpClient,private service:ProductService,private logger:LoggerService,private route:ActivatedRoute){}
  canExit(){
    if(confirm('Are you sure you want to exit'))
    {
      return true;
    }
    return false;
  }
  ngOnInit(): void {

    this.updateProduct = this._formbuilder.group({
      brandName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      modelName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      pricePerDay: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      kilometersDriven: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      transmissionType: ['', [Validators.required]],
      engineType: ['', [Validators.required]],
      type: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      category: ['', [Validators.required]],
      image: ['', [Validators.required]],
      refundAmount: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      color: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      location: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      carAddress: ['', [Validators.required, Validators.maxLength(200)]],
    });


    let productid = this.route.snapshot.paramMap.get('productid');
    console.log(productid);
    if(productid){
      this.service.getcarbyid(productid).subscribe((result)=>{
        if(result){
          this.productdetails = result;
          console.log(result);
          this.updateProduct.patchValue({
            brandName: result.brandName,
            modelName: result.modelName,
            pricePerDay: result.pricePerDay,
            kilometersDriven: result.kilometersDriven,
            transmissionType: result.transmissionType,
            engineType: result.engineType,
            type: result.type,
            description: result.description,
            category: result.category,
            image: result.image,
            refundAmount: result.refundAmount,
            color: result.color,
            location: result.location,
            carAddress: result.carAddress,

          });
        }
      })}

  }
  onSubmit()
  {
    const formData: FormData = new FormData();
    formData.append('brandName', this.updateProduct.value.brandName);
    formData.append('modelName', this.updateProduct.value.modelName);
    formData.append('pricePerDay', this.updateProduct.value.pricePerDay);
    formData.append('kilometersDriven', this.updateProduct.value.kilometersDriven);
    formData.append('transmissionType', this.updateProduct.value.transmissionType);
    formData.append('engineType', this.updateProduct.value.engineType);
    formData.append('type', this.updateProduct.value.type);
    formData.append('description', this.updateProduct.value.description);
    formData.append('category', this.updateProduct.value.category);
    formData.append('refundAmount', this.updateProduct.value.refundAmount);
    formData.append('color', this.updateProduct.value.color);
    formData.append('location', this.updateProduct.value.location);
    formData.append('carAddress', this.updateProduct.value.carAddress);
    formData.append('IsAvailable','True');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.service.updatecars(this.productdetails.productId,formData).subscribe(
      response => {
        alert("Product Updated Successfully")
        this.updateProduct.reset();
      },
      error => {
        this.logger.error('Error while adding car:');

      }
    )
  }



    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }
  }


