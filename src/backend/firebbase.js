import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyACsl1MMVATDWWdmx7JSF7VyD23Y0KZz_U',
  authDomain: 'charming-sharer.firebaseapp.com',
  projectId: 'charming-sharer',
  storageBucket: 'charming-sharer.firebasestorage.app',
  messagingSenderId: '939215361739',
  appId: '1:939215361739:web:1094ab3a13a03a421b2d4e',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
