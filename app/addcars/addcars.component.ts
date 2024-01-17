import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { LoggerService } from '../logger.service';
// import { LoggerserviceService } from 'projects/mylogger/src/lib/loggerservice.service';
import { LoggerserviceService } from 'mylogger';

@Component({
  selector: 'app-addcars',
  templateUrl: './addcars.component.html',
  styleUrls: ['./addcars.component.css']
})
export class AddcarsComponent implements OnInit {
  productlist:any;
  productData!:FormGroup;
  selectedFile!:File;
  addproductmessage: any;
  constructor(private loggerservice:LoggerserviceService,private formbuilder:FormBuilder,private http:HttpClient,private service:ProductService,private logger: LoggerService){}


  ngOnInit(): void {
    this.productData = this.formbuilder.group({
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
  }

  isFormValid() {
    return this.productData.valid;
  }
  onSubmit()
  {
    const formData: FormData = new FormData();
    formData.append('brandName', this.productData.value.brandName);
    formData.append('modelName', this.productData.value.modelName);
    formData.append('pricePerDay', this.productData.value.pricePerDay);
    formData.append('kilometersDriven', this.productData.value.kilometersDriven);
    formData.append('transmissionType', this.productData.value.transmissionType);
    formData.append('engineType', this.productData.value.engineType);
    formData.append('type', this.productData.value.type);
    formData.append('description', this.productData.value.description);
    formData.append('category', this.productData.value.category);
    formData.append('refundAmount', this.productData.value.refundAmount);
    formData.append('color', this.productData.value.color);
    formData.append('location', this.productData.value.location);
    formData.append('carAddress', this.productData.value.carAddress);
    formData.append('IsAvailable','True');


    if (this.selectedFile) {
      formData.append('Image', this.selectedFile, this.selectedFile.name);
    }
    formData.forEach((value, key) => {
      console.log(key, value);
  });

  // if(this.isFormValid())
  // {
    this.service.AddCars(formData).subscribe(
      response => {
        alert("Product Added Successfully")
        this.loggerservice.log("Product Added Successfully");

        this.productData.reset();
      },
      error => {
        this.loggerservice.error('Error while adding car:');
      }
    )
  // }
  //   else
  //   {
  //     alert('Please Added.');
  //   }

  }
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }
  }

