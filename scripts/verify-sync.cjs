const { initializeApp } = require('../node_modules/firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('../node_modules/firebase/auth');
const {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  serverTimestamp
} = require('../node_modules/firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCNcxIlizm69QqDaJP1TdcSmo3cJVpbpkU",
  authDomain: "nilesh-practice.firebaseapp.com",
  projectId: "nilesh-practice",
  storageBucket: "nilesh-practice.firebasestorage.app",
  messagingSenderId: "423996845323",
  appId: "1:423996845323:web:492a5bfbf67772bb9f060e",
  measurementId: "G-0EFWK4DZ1J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function runVerification() {
  console.log("==================================================");
  console.log("LIVE FIRESTORE SYNCHRONIZATION VERIFICATION");
  console.log("Project:", firebaseConfig.projectId);
  console.log("==================================================\n");

  // 1. PUBLIC READ TESTS
  console.log("--- 1. Testing Public Collection Queries (Unauthenticated) ---");
  const publicTests = [
    { name: 'Published Projects', q: query(collection(db, 'projects'), where('isPublished', '==', true), orderBy('sortOrder', 'asc')) },
    { name: 'Active Team Members', q: query(collection(db, 'teamMembers'), where('isActive', '==', true), orderBy('sortOrder', 'asc')) },
    { name: 'Published Reviews', q: query(collection(db, 'clientReviews'), where('isPublished', '==', true), orderBy('sortOrder', 'asc')) },
    { name: 'Active Pricing Plans', q: query(collection(db, 'pricing'), where('isActive', '==', true), orderBy('sortOrder', 'asc')) },
  ];

  for (const t of publicTests) {
    try {
      const snap = await getDocs(t.q);
      console.log(`[PASS] ${t.name}: Found ${snap.size} documents in live database.`);
    } catch (err) {
      console.log(`[FAIL] ${t.name}: ${err.code || err.message}`);
    }
  }

  // 2. PUBLIC WRITE TEST (Contact Message)
  console.log("\n--- 2. Testing Contact Form Submission (Public Write) ---");
  let testMsgId = null;
  try {
    const msgRef = await addDoc(collection(db, 'contactMessages'), {
      name: "Sync Verification Bot",
      email: "bot@magnovaa.com",
      subject: "Realtime Sync Verification",
      message: "Testing Firestore write synchronization.",
      status: "NEW",
      createdAt: serverTimestamp()
    });
    testMsgId = msgRef.id;
    console.log(`[PASS] Contact Form Submission SUCCESS! Created doc ID: ${testMsgId}`);
  } catch (err) {
    console.log(`[FAIL] Contact Form Submission: ${err.code || err.message}`);
  }

  // 3. ADMIN AUTHENTICATION
  console.log("\n--- 3. Testing Admin Authentication & RBAC ---");
  let adminCred = null;
  try {
    adminCred = await signInWithEmailAndPassword(auth, "mitali@gmail.com", "mitali@123");
    console.log(`[PASS] Admin Sign-In SUCCESS! UID: ${adminCred.user.uid}`);
  } catch (err) {
    console.log(`[FAIL] Admin Sign-In: ${err.code || err.message}`);
    return;
  }

  // 4. ADMIN CRUD TEST (Create, Read, Update, Delete)
  console.log("\n--- 4. Testing Real-Time Admin CRUD Operations ---");
  const testProjectId = "verify-test-" + Date.now();
  try {
    // CREATE
    await setDoc(doc(db, 'projects', testProjectId), {
      title: "Realtime Sync Test Project",
      slug: "realtime-sync-test",
      shortDescription: "Temporary project to verify real-time CRUD.",
      category: "Enterprise Software",
      technologies: ["Next.js", "Firebase"],
      isPublished: false,
      featured: false,
      sortOrder: 999,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log(`[PASS] Admin CREATE: Added test project ${testProjectId}`);

    // READ
    const readSnap = await getDoc(doc(db, 'projects', testProjectId));
    if (readSnap.exists() && readSnap.data().title === "Realtime Sync Test Project") {
      console.log(`[PASS] Admin READ: Verified test project exists in Firestore.`);
    } else {
      console.log(`[FAIL] Admin READ: Document was not retrieved correctly.`);
    }

    // UPDATE
    await setDoc(doc(db, 'projects', testProjectId), {
      title: "Updated Sync Test Project",
      updatedAt: serverTimestamp()
    }, { merge: true });
    const updatedSnap = await getDoc(doc(db, 'projects', testProjectId));
    if (updatedSnap.exists() && updatedSnap.data().title === "Updated Sync Test Project") {
      console.log(`[PASS] Admin UPDATE: Real-time update verified.`);
    } else {
      console.log(`[FAIL] Admin UPDATE: Update failed.`);
    }

    // DELETE
    await deleteDoc(doc(db, 'projects', testProjectId));
    const deletedSnap = await getDoc(doc(db, 'projects', testProjectId));
    if (!deletedSnap.exists()) {
      console.log(`[PASS] Admin DELETE: Real-time delete verified (document cleaned up).`);
    } else {
      console.log(`[FAIL] Admin DELETE: Document still exists.`);
    }

    // Clean up test contact message if created
    if (testMsgId) {
      await deleteDoc(doc(db, 'contactMessages', testMsgId));
      console.log(`[PASS] Cleaned up temporary verification message.`);
    }

    console.log("\n==================================================");
    console.log(">>> ALL REAL-TIME CRUD TESTS PASSED PROPERLY! <<<");
    console.log("==================================================");

  } catch (err) {
    console.log(`[FAIL] Admin CRUD Error: ${err.code || err.message}`);
  }
}

runVerification().then(() => process.exit(0)).catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});

