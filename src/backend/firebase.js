import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'

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
// export const firebaseAuth = firebaseAuth.auth()
export const db = getFirestore(app)

export const searchProduct = async (keyword) => {
  try {
    const q = query(
      collection(db, 'posts'),
      where('product', '>=', keyword),
      where('product', '<=', keyword + '\uf8ff'),
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('搜尋發生錯誤', error)
    return []
  }
}

// export { db, addDoc, collection, getDocs, doc, getDoc }
