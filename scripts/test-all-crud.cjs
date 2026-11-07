const { initializeApp } = require('../node_modules/firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('../node_modules/firebase/auth');
const {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  addDoc,
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

async function testEntityCRUD(entityName, collectionName, sampleData, updateFields) {
  console.log(`\n--- Testing ${entityName} CRUD (${collectionName}) ---`);
  const testId = `test-${Date.now()}`;
  
  // 1. CREATE
  try {
    await setDoc(doc(db, collectionName, testId), {
      ...sampleData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log(`  [PASS] CREATE: Created ${entityName} with ID: ${testId}`);
  } catch (err) {
    console.error(`  [FAIL] CREATE ${entityName}:`, err.code || err.message);
    return false;
  }

  // 2. READ
  try {
    const snap = await getDoc(doc(db, collectionName, testId));
    if (snap.exists()) {
      console.log(`  [PASS] READ: Retrieved ${entityName} from Firestore.`);
    } else {
      console.error(`  [FAIL] READ: Document not found.`);
      return false;
    }
  } catch (err) {
    console.error(`  [FAIL] READ ${entityName}:`, err.code || err.message);
    return false;
  }

  // 3. UPDATE
  try {
    await setDoc(doc(db, collectionName, testId), {
      ...updateFields,
      updatedAt: serverTimestamp()
    }, { merge: true });
    const snap = await getDoc(doc(db, collectionName, testId));
    let match = true;
    for (const key of Object.keys(updateFields)) {
      if (snap.data()[key] !== updateFields[key]) match = false;
    }
    if (match) {
      console.log(`  [PASS] UPDATE: Successfully modified ${entityName}.`);
    } else {
      console.error(`  [FAIL] UPDATE: Fields did not match.`);
      return false;
    }
  } catch (err) {
    console.error(`  [FAIL] UPDATE ${entityName}:`, err.code || err.message);
    return false;
  }

  // 4. DELETE
  try {
    await deleteDoc(doc(db, collectionName, testId));
    const snap = await getDoc(doc(db, collectionName, testId));
    if (!snap.exists()) {
      console.log(`  [PASS] DELETE: Successfully removed ${entityName} from Firestore.`);
    } else {
      console.error(`  [FAIL] DELETE: Document still exists.`);
      return false;
    }
  } catch (err) {
    console.error(`  [FAIL] DELETE ${entityName}:`, err.code || err.message);
    return false;
  }

  return true;
}

async function runAll() {
  console.log("==================================================");
  console.log("FULL ADMIN CRUD TEST ON LIVE FIRESTORE");
  console.log("Project:", firebaseConfig.projectId);
  console.log("==================================================");

  console.log("Authenticating as admin (mitali@gmail.com)...");
  const cred = await signInWithEmailAndPassword(auth, "mitali@gmail.com", "mitali@123");
  console.log(`Authenticated UID: ${cred.user.uid}`);

  // Test Projects
  await testEntityCRUD(
    'Project',
    'projects',
    { title: "Test Project", slug: "test-project", category: "Test", isPublished: true, sortOrder: 99 },
    { title: "Updated Test Project", isPublished: false }
  );

  // Test Team Members
  await testEntityCRUD(
    'Team Member',
    'teamMembers',
    { name: "Test Engineer", designation: "QA Architect", isActive: true, sortOrder: 99 },
    { name: "Updated Test Engineer", designation: "Lead QA Architect", isActive: false }
  );

  // Test Client Reviews
  await testEntityCRUD(
    'Client Review',
    'clientReviews',
    { clientName: "Test Client", companyName: "Test Corp", rating: 5, isPublished: true, sortOrder: 99 },
    { clientName: "Updated Client", rating: 4, isPublished: false }
  );

  // Test Pricing Plans
  await testEntityCRUD(
    'Pricing Plan',
    'pricing',
    { name: "Test Plan", monthlyPrice: 1999, isActive: true, sortOrder: 99 },
    { name: "Updated Plan", monthlyPrice: 2499, isActive: false }
  );

  // Test Contact Messages
  console.log(`\n--- Testing Contact Messages (contactMessages) ---`);
  try {
    const msgRef = await addDoc(collection(db, 'contactMessages'), {
      name: "CRUD Test User",
      email: "crud-test@example.com",
      subject: "Testing message operations",
      message: "Diagnostics verify",
      status: "NEW",
      createdAt: serverTimestamp()
    });
    console.log(`  [PASS] CREATE: Created contact message ${msgRef.id}`);

    // Update status
    await setDoc(doc(db, 'contactMessages', msgRef.id), { status: "REPLIED" }, { merge: true });
    const snap = await getDoc(doc(db, 'contactMessages', msgRef.id));
    if (snap.data().status === "REPLIED") {
      console.log(`  [PASS] UPDATE: Updated message status to REPLIED.`);
    }

    // Delete
    await deleteDoc(doc(db, 'contactMessages', msgRef.id));
    const checkSnap = await getDoc(doc(db, 'contactMessages', msgRef.id));
    if (!checkSnap.exists()) {
      console.log(`  [PASS] DELETE: Deleted contact message.`);
    }
  } catch (err) {
    console.error(`  [FAIL] Contact Message CRUD:`, err.code || err.message);
  }

  console.log("\n==================================================");
  console.log(">>> ALL 5 ENTITIES TESTED ON LIVE DATABASE <<<");
  console.log("==================================================");
}

runAll().then(() => process.exit(0)).catch(e => {
  console.error("Fatal:", e);
  process.exit(1);
});
