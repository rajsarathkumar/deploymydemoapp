import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  @ViewChild('slotaddForm', { static: false }) slotaddForm: NgForm;
  @ViewChild('slotavailableForm', { static: false }) slotavailableForm: NgForm;
  @ViewChild('bookingSlotForm', { static: false }) bookingSlotForm: NgForm;

  public slotData: any = {}
  public searchData: any = {}
  User: any;
  today: Date;
  doctor: Boolean = false;
  patient: Boolean = false;
  morningFlag: boolean;
  evgFlag: boolean;
  appointmentsArray: any = [];
  slotDaten: any;
  appointmentsCount: any;
  availableCount: any;
  bookedCount: any;
  noSlotsMsg: string;
  bookingData: any;
  bookDate: any;
  patientData: any = {}
  pmonly: boolean;
  constructor(private spinner: NgxSpinnerService
    , private _snackBar: MatSnackBar, private common_service: CommonService, private route: Router) { }

  ngOnInit() {
    this.User = localStorage.getItem('role');
    if (this.User == 'Doctor') {
      this.doctor = true;
    } else {
      this.patient = true;
      this.searchDefaultAvailability();
    }
    this.today = new Date()


  }


  searchDefaultAvailability() {
    var a = new Date();
    const date2 = new Date(a);
    this.searchData.slotDate = date2.toLocaleString().split(',')[0];
    this.common_service.searchSlot(this.searchData).subscribe(data => {
      if (data.statusCode == 200) {
        if (data.data.length == 0) {
          this.spinner.hide();
          this.slotDaten = this.searchData.slotDate.slice(0, 10);
          this.availableCount = '0'
          this.bookedCount = '0'
          this.appointmentsArray = []
          this.noSlotsMsg = "There is no appointments available!"
        } else {
          this.spinner.hide();
          this.appointmentsArray = data.data
          this.noSlotsMsg = ""
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
          horizontalPosition: 'right',//'start' | 'center' | 'end' | 'left' | 'right'
        });        
      }
      err => {
        console.log(err)
      }
    });
  }

  saveSlot() {
    if (this.slotaddForm.invalid) {
      this._snackBar.open('Please fill all the fields!', '', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: ['red-snackbar'],
        horizontalPosition: 'right',//'start' | 'center' | 'end' | 'left' | 'right'
      });
    } else {
      this.spinner.show();
      const date = new Date(this.slotData.slotDate);
      this.slotData.slotDate = date.toLocaleString().split(',')[0];
      this.slotData.appointment = 'Available';
      this.slotData.pateientName = '';
      this.slotData.pateientNumber = '';
      this.common_service.saveSlot(this.slotData).subscribe(data => {
        if (data.statusCode == 200) {
          //alert('ok')
          this.spinner.hide();  
          this._snackBar.open(data.msg, '', {
            duration: 5000,
            panelClass: ['green-snackbar'],
            verticalPosition: 'top', // 'top' | 'bottom'
              horizontalPosition: 'right',//'start' | 'center' | 'end' | 'left' | 'right'
          });          
          this.route.navigateByUrl('/login', { skipLocationChange: true });
          setTimeout(() => this.route.navigate(['/dashboard']), 100);
        } else {
          this.spinner.hide();
        }
        err => {
          console.log(err)
        }
      });
    }
  }

  getSession() {
    if (this.slotData.slotSession == '1') {
      this.morningFlag = true;
      this.evgFlag = false;
    } else {
      this.evgFlag = true;
      this.morningFlag = false;
    }
  }

  searchAvailability() {
    if (this.slotavailableForm.invalid) {
      this._snackBar.open('Please Choose Date!', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['red-snackbar'],
        horizontalPosition: 'right',//'start' | 'center' | 'end' | 'left' | 'right'
      });
    } else {
      this.spinner.show();
      const date1 = new Date(this.searchData.slotDate);
      this.searchData.slotDate = date1.toLocaleString().split(',')[0];
      this.common_service.searchSlot(this.searchData).subscribe(data => {
        if (data.statusCode == 200) {
          if (data.data.length == 0) {
            this.spinner.hide();
            this.slotDaten = this.searchData.slotDate.slice(0, 10);
            this.availableCount = '0'
            this.bookedCount = '0'
            this.appointmentsArray = []
            this.noSlotsMsg = "There is no appointments available!"
          } else {
            this.spinner.hide();
            this.appointmentsArray = data.data
            this.noSlotsMsg = ""
            this.slotDaten = data.data[0].slotDate.slice(0, 10);
            this.availableCount = this.appointmentsArray.filter(x => x.appointment == 'Available').length;
            this.bookedCount = this.appointmentsArray.filter(y => y.appointment == 'Booked').length;
          }

        } else {
          this.spinner.hide();
          this._snackBar.open(data.msg, '', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',//'start' | 'center' | 'end' | 'left' | 'right'
          });        
        }
        err => {
          console.log(err)
        }
      });
    }
  }

  bookSlot(data) {
    console.log(data);
    this.bookingData = data;
    this.bookDate = this.bookingData.slotDate.slice(0, 10)
  }

  bookAppointment(id) {
    if (this.bookingSlotForm.invalid) {
      this._snackBar.open('Please fill all the fields!', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['red-snackbar'],
        horizontalPosition: 'right',//'start' | 'center' | 'end' | 'left' | 'right'
      });
    } else {
      this.patientData._id = id;
      this.patientData.appointment = 'Booked';
      this.common_service.bookAppointment(this.patientData).subscribe(data => {
        if (data.statusCode == 200) {
         
          this._snackBar.open(data.msg, '', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['green-snackbar'],
            horizontalPosition: 'right',//'start' | 'center' | 'end' | 'left' | 'right'
          });          
          document.getElementById('closeBtn').click();
          this.route.navigateByUrl('/login', { skipLocationChange: true });
          setTimeout(() => this.route.navigate(['/dashboard']), 100);
        } else {
          this.spinner.hide();          
          this._snackBar.open(data.msg, '', {
            duration: 4000,
            verticalPosition: 'top',
            panelClass: ['red-snackbar'],
            horizontalPosition: 'right',//'start' | 'center' | 'end' | 'left' | 'right'
          });
        }
        err => {
          console.log(err)
        }
      });
    }
  }
}
