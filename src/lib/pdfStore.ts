const DB_NAME = 'AbeoMenuDB';
const STORE_NAME = 'pdfStore';
const DB_VERSION = 1;

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

export async function savePdfBlob(blob: Blob): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(blob, 'custom_menu_pdf');
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function getPdfBlob(): Promise<Blob | null> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get('custom_menu_pdf');
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      resolve(request.result || null);
    };
  });
}

export async function clearPdfBlob(): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete('custom_menu_pdf');
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}
