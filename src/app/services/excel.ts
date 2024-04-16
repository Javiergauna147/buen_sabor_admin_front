import { Injectable } from "@angular/core";
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class ExcelService {

    generarExcel<T>(lista:T[], mapeo:{key:string,fvalor:(value:T)=>any}[], nombre:string){
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');
        worksheet.addRow(mapeo.map((val)=>val.key));
        lista.forEach((item) => {
             const row:any = [];
             mapeo.forEach((header) => {
               row.push(header.fvalor(item));
             });
             worksheet.addRow(row);
        });
        workbook.xlsx.writeBuffer().then((buffer: any) => {
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, `${nombre}.xlsx`);
        });
    }
}