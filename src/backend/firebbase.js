import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase 配置
const firebaseConfig = {
  apiKey: 'AIzaSyACsl1MMVATDWWdmx7JSF7VyD23Y0KZz_U',
  authDomain: 'charming-sharer.firebaseapp.com',
  projectId: 'charming-sharer',
  storageBucket: 'charming-sharer.firebasestorage.app',
  messagingSenderId: '939215361739',
  appId: '1:939215361739:web:1094ab3a13a03a421b2d4e',
}

const app = initializeApp(firebaseConfig)
console.log('app', app)
export const setupFirebase = initializeApp(firebaseConfig)
const db = getFirestore(setupFirebase)

export { db }
// export { db, addDoc, collection, getDocs, doc, getDoc }
