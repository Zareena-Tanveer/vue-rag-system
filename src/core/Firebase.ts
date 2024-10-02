import { initializeApp } from 'firebase/app';
import { getFirestore,serverTimestamp,collection,query, orderBy, limit, onSnapshot,addDoc} from 'firebase/firestore';

// Initialize Firebase app
let app;
export const init = () => {
  const firebaseConfig = JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG);
  app = initializeApp(firebaseConfig);
};

export const listenChat = (onResult) => {
  const db = getFirestore(app);
  const chatQuery = query(
    collection(db, 'chat'),
    orderBy('created', 'desc'),
    limit(20)
  );

  onSnapshot(chatQuery, (snapshot) => {
    const result = snapshot.docs.map(d => ({
      ...d.data(),
      id: d.id
    }));

    onResult(result);
  });
};

export const sendMessage = async (message) => {
  const db = getFirestore(app);
  return addDoc(collection(db, 'chat'), { ...message, created: serverTimestamp() });
};
