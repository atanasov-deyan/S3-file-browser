const algorithm = {
  name: 'AES-GCM',
  length: 256,
};
  console.log(import.meta.env.VITE_API_KEY);
async function importKey(): Promise<CryptoKey> {
  const encryptionKey = import.meta.env.VITE_API_KEY as string;
  const encodedKey = new TextEncoder().encode(encryptionKey);
  const buffer = await crypto.subtle.digest('SHA-256', encodedKey);
  return await crypto.subtle.importKey(
    'raw',
    buffer,
    algorithm,
    false,
    ['encrypt', 'decrypt'],
  );
}

export async function encryptString(data: string): Promise<string> {
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
  return Array.from(combinedData)
    .map((byte) => String.fromCharCode(byte))
    .join('');
}

export async function decryptString(encryptedData: string | null): Promise<string> {
  if (!encryptedData) {
    throw new Error('Please provide a string to decrypt');
  }
  const combinedData = new Uint8Array(
    encryptedData.split('').map((char) => char.charCodeAt(0)),
  );
  const iv = combinedData.slice(0, 12);
  const ciphertext = combinedData.slice(12);
  const key = await importKey();
  const decryptedData = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext,
  );
  return new TextDecoder().decode(decryptedData);
}
