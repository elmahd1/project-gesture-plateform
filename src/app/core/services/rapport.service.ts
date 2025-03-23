import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  generatePDF(title: string, headers: string[], data: any[]): void {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    // Generate table
    (doc as any).autoTable({
      startY: 30,
      head: [headers],
      body: data.map(item => Object.values(item)),
      theme: 'striped'
    });

    // Save the PDF
    doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}_report.pdf`);
  }
}