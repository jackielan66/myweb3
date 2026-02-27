 // lib/secret.ts
 import 'server-only'
 
 export async function getSecret() {
   return process.env.SECRET_VALUE || 'server-only demo string'
 }