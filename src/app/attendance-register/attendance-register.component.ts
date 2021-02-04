import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import Swal from 'sweetalert2'
declare var $: any;
import { NgxSpinnerService } from "ngx-spinner";
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';

@Component({
  selector: 'app-attendance-register',
  templateUrl: './attendance-register.component.html',
  styleUrls: ['./attendance-register.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AttendanceRegisterComponent implements OnInit {
  @ViewChild('slotSearchForm', { static: false }) slotSearchForm: NgForm;
  public employeeData = { startDate: "", endDate: "", empName: "" }
  fromDate: any;
  toDate: any;
  finalTodate: any;
  test: any
  employeeNamesArray: any = [];
  today: Date;
  public searchData: any = {}
  appointmentsArray: any = [];
  slotDaten: any;
  appointmentsCount: any;
  availableCount: any;
  bookedCount: any;
  noSlotsMsg: string;
  constructor(private _snackBar: MatSnackBar, private common_service: CommonService, private route: Router, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.today = new Date();
    this.searchDefault()
  }

  searchDefault() {
    this.spinner.show();
    const date = new Date(this.today);
    this.searchData.slotDate = date.toLocaleString().split(',')[0];
    this.common_service.searchSlot(this.searchData).subscribe(data => {
      if (data.statusCode == 200) {
        if(data.data.length ==0){
          this.spinner.hide();
          this.slotDaten = this.searchData.slotDate.slice(0, 10);
          this.availableCount = '0'
          this.bookedCount = '0'
          this.appointmentsArray = []
          this.noSlotsMsg = "No Appointments available here!!!!!!"

        }else{
          this.spinner.hide();
          this.noSlotsMsg = ""
          this.appointmentsArray = data.data
          this.slotDaten = data.data[0].slotDate.slice(0, 10);
         this.availableCount = this.appointmentsArray.filter(x => x.appointment == 'Available').length;
         this.bookedCount = this.appointmentsArray.filter(y => y.appointment == 'Booked').length;
        }
      } else {
        this.spinner.hide();
        this._snackBar.open(data.msg, '', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar'],
        });
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: data.msg,
        // })
      }
      err => {
        console.log(err)
      }
    });
  }

  searchAppointments() {
    if (this.slotSearchForm.invalid) {
      // this._snackBar.open('Please Choose Valid Date!', '', {
      //   duration: 4000,
      //   verticalPosition: 'top'
      // });
      this._snackBar.open('Please choose appoinment date!', '', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: ['red-snackbar'],
      });
    } else {
      this.spinner.show();
      const date1 = new Date(this.searchData.slotDate);
      this.searchData.slotDate = date1.toLocaleString().split(',')[0];
      this.common_service.searchSlot(this.searchData).subscribe(data => {
        if (data.statusCode == 200) {
          if(data.data.length ==0){
            this.spinner.hide();
            this.slotDaten = this.searchData.slotDate.slice(0, 10);
            this.availableCount = '0'
            this.bookedCount = '0'
            this.appointmentsArray = []
            this.noSlotsMsg = "No Appointments available here!!!!!"

          }else{
            this.spinner.hide();
            this.noSlotsMsg = ""
            this.appointmentsArray = data.data
            this.slotDaten = data.data[0].slotDate.slice(0, 10);
           this.availableCount = this.appointmentsArray.filter(x => x.appointment == 'Available').length;
           this.bookedCount = this.appointmentsArray.filter(y => y.appointment == 'Booked').length;
          }
         
        } else {
          this.spinner.hide();
          this._snackBar.open(data.msg, '', {
            duration: 4000,
            verticalPosition: 'top',
            panelClass: ['red-snackbar'],
          });

          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: data.msg,
          // })
        }
        err => {
          console.log(err)
        }
      });
    }
  }
}