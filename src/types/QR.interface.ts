export interface ApiQR {
  id: number;            
  name: string;          
  description?: string;  
  createdAt: string;     
  updatedAt: string;
  scanCount?: number;     
  cont?: number;         
  qrCode?: string;       
  userEmail: string;    
  scans?: Scan[];
  hash?: string  ;     
}

export interface Scan {
  id: number;
  qrId: number;          
  scannedAt: string;     
  ip?: string;           
}
