import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cell, CellContent, ColumnModel, TableModel, TableRow} from '../../core/models/Table.model';
import {cloneDeep, orderBy, sortBy} from 'lodash';
import {Sort, SortDirection} from '@angular/material/sort';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {
  @Output() actionOutput = new EventEmitter<any>();
  @Input() inputData: any;
  @Input() inputTable: TableRow[];
  data = [];
  originalData: any[] = [];
  tableModel: TableModel;
  columns: ColumnModel[];
  displayedColumns: string[];
  constructor() { }
  ngOnInit(): void {
    if (this.inputTable && this.inputTable.length > 0) {
      this.data = cloneDeep(this.inputTable);
      this.parseFormat();
      this.buildColumns();
      if (!this.originalData.length) {
        this.originalData = cloneDeep(this.data);
      }
    }
  }

  parseFormat(): void{
    const cols: any[] = [];
    this.inputTable[0].cells.map((col: Cell) => {
      cols.push(col.cellHeader);
    });
    this.tableModel = {columns: cols};
  }
  sortData(params: Sort): void {
    const direction: SortDirection = params.direction;
    console.log(direction, 'direction');
    this.data = direction
      ? orderBy(this.data, [params.active], [direction])
      : this.originalData;
  }

  private buildColumns(): void {
    this.columns = this.tableModel.columns;
    this.sortColumns();
    this.displayedColumns = this.columns.map(col => col.key);
  }

  private sortColumns(): void {
    this.columns = sortBy(this.columns, ['order']);
  }

  onclickevent(event): void {
    this.actionOutput.emit(event);
  }
  isChip(contents: CellContent[]): boolean{
    return contents[0]?.contentType === 'chipContent';
  }
}
