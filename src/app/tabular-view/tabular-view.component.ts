import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../services/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.css']
})
export class TabularViewComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['sn','slotDate', 'slotSession','startTime','endTime' ,'appointment','pateientName','pateientNumber'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private common_service: CommonService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.common_service.getAllSlots().subscribe(data => {
      if (data.statusCode == 200) {
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = data.data;
      } else {

      }
      err => {
        console.log(err)
      }
    });
  }

}
