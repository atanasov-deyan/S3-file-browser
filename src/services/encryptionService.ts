import crypto from 'crypto';
import { config } from 'dotenv';

config();

const algorithm: AesKeyAlgorithm = {
  name: 'AES-GCM',
  length: 256,
};

const importKey = async (): Promise<CryptoKey> => {
  const encryptionKey = process.env.ENCRYPTION_KEY || '';

  const rawKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(encryptionKey),
    algorithm,
    false,
    ['encrypt', 'decrypt'],
  );

  return rawKey;
};

const encrypt = async (data: string): Promise<Uint8Array> => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedData = new TextEncoder().encode(data);
  const key = await importKey();

  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encodedData,
  );

  const combinedData = new Uint8Array(iv.length + encryptedData.byteLength);
  combinedData.set(iv);
  combinedData.set(new Uint8Array(encryptedData), iv.length);

  return combinedData;
};

const decrypt = async (encryptedData: Uint8Array): Promise<string> => {
  const iv = encryptedData.slice(0, 12);
  const ciphertext = encryptedData.slice(12);
  const key = await importKey();

  const decryptedData = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext,
  );

  return new TextDecoder().decode(decryptedData);
};

export const EncryptionService = {
  encrypt,
  decrypt,
};
