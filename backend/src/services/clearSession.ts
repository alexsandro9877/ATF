import fs from 'fs';
import path from 'path';

const sessionFolderPath = path.resolve(__dirname, '..project/backend/.wwebjs_auth/session');

export function clearSession() {
  if (fs.existsSync(sessionFolderPath)) {
    fs.rmSync(sessionFolderPath, { recursive: true, force: true });
    console.log('Session cleared');
  } else {
    console.log('No session folder found');
  }
}
