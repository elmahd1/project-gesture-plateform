import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private endpoint = 'documents';

  constructor(private apiService: ApiService) { }

  /**
   * Get all documents
   * @returns Observable of Document array
   */
  getAllDocuments(): Observable<Document[]> {
    return this.apiService.get<Document[]>(this.endpoint);
  }

  /**
   * Get document by ID
   * @param id Document ID
   * @returns Observable of Document
   */
  getDocumentById(id: number): Observable<Document> {
    return this.apiService.get<Document>(`${this.endpoint}/${id}`);
  }

  /**
   * Create new document
   * @param document Document data
   * @returns Observable of created Document
   */
  createDocument(document: Document): Observable<Document> {
    return this.apiService.post<Document>(this.endpoint, document);
  }

  /**
   * Update existing document
   * @param id Document ID
   * @param document Updated document data
   * @returns Observable of updated Document
   */
  updateDocument(id: number, document: Document): Observable<Document> {
    return this.apiService.put<Document>(`${this.endpoint}/${id}`, document);
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
    return this.apiService.get<Document[]>(`${this.endpoint}/projet/${projetId}`);
  }

  /**
   * Upload document file
   * @param file File to upload
   * @param documentMetadata Document metadata
   * @returns Observable of created Document
   */
  uploadDocument(file: File, documentMetadata: any): Observable<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(documentMetadata));
    
    return this.apiService.post<Document>(`${this.endpoint}/upload`, formData);
  }

  /**
   * Download document file
   * @param id Document ID
   * @returns Observable of Blob
   */
  downloadDocument(id: number): Observable<Blob> {
    return this.apiService.get<Blob>(`${this.endpoint}/${id}/download`, {
      responseType: 'blob' as 'json'
    });
  }
}