import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private endpoint = 'documents';

  constructor(private apiService: ApiService) {}

  /**
   * Get all documents
   * @returns Observable of Document array
   */
  getAllDocuments(): Observable<Document[]> {
    return this.apiService.get<Document[]>(this.endpoint)
      .pipe(
        map(documents => this.convertDateFields(documents))
      );
  }

  /**
   * Get document by ID
   * @param id Document ID
   * @returns Observable of Document
   */
  getDocumentById(id: number): Observable<Document> {
    return this.apiService.get<Document>(`${this.endpoint}/${id}`)
      .pipe(
        map(document => this.convertDateFields([document])[0])
      );
  }

  /**
   * Create new document
   * @param document Document data
   * @returns Observable of created Document
   */
  createDocument(document: Document): Observable<Document> {
    return this.apiService.post<Document>(this.endpoint, document)
      .pipe(
        map(document => this.convertDateFields([document])[0])
      );
  }

  /**
   * Update existing document
   * @param id Document ID
   * @param document Updated document data
   * @returns Observable of updated Document
   */
  updateDocument(id: number, document: Document): Observable<Document> {
    return this.apiService.put<Document>(`${this.endpoint}/${id}`, document)
      .pipe(
        map(document => this.convertDateFields([document])[0])
      );
  }

  /**
   * Delete document
   * @param id Document ID
   * @returns Observable of operation result
   */
  deleteDocument(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Get documents by project
   * @param projetId Project ID
   * @returns Observable of Document array
   */
  getDocumentsByProjet(projetId: number): Observable<Document[]> {
    return this.apiService.get<Document[]>(`${this.endpoint}/projet/${projetId}`)
      .pipe(
        map(documents => this.convertDateFields(documents))
      );
  }

  /**
   * Upload document file
   * @param file File to upload
   * @param documentMetadata Document metadata
   * @returns Observable of created Document
   */
  uploadDocument(file: File, documentMetadata: any): Observable<Document> {
    return this.apiService.uploadFile<Document>(`${this.endpoint}/upload`, file, documentMetadata)
      .pipe(
        map(document => this.convertDateFields([document])[0])
      );
  }

  /**
   * Download document file
   * @param id Document ID
   * @returns Observable of Blob
   */
  downloadDocument(id: number): Observable<Blob> {
    return this.apiService.downloadFile(`${this.endpoint}/${id}/download`);
  }

  /**
   * Helper method to convert string dates to Date objects
   */
  private convertDateFields(documents: Document[]): Document[] {
    return documents.map(document => ({
      ...document,
      dateCreation: document.dateCreation ? new Date(document.dateCreation) : document.dateCreation,
      dateDerniereModification: document.dateDerniereModification ? 
        new Date(document.dateDerniereModification) : document.dateDerniereModification
    }));
  }
}