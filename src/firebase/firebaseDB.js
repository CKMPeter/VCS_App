import { ref, push, get, update, remove } from "firebase/database";
import { db } from "./firebase";

// Helper: convert File to small Base64 thumbnail
export function fileToBase64(file, maxWidth = 200, maxHeight = 200) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// -------------------- USERS CRUD --------------------

// GET ALL USERS
export async function getUsers() {
  try {
    const usersRef = ref(db, "users");
    const snapshot = await get(usersRef);
    const data = snapshot.val() || {};
    return Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  } catch (e) {
    console.error("Error getting users:", e);
    throw e;
  }
}

// GET SINGLE USER
export async function getUser(id) {
  try {
    const userRef = ref(db, `users/${id}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return { id, ...snapshot.val() };
    } else {
      console.log("No user found with ID:", id);
      return null;
    }
  } catch (e) {
    console.error("Error getting user:", e);
    throw e;
  }
}

// ADD USER (with checkinDates as an array)
export async function addUserWithImage(user) {
  try {
    let profile_picture = "";

    if (user.file) {
      profile_picture = await fileToBase64(user.file, 100, 100);
    } else {
      const placeholderUrl = "/placeholder.png";
      const response = await fetch(placeholderUrl);
      const blob = await response.blob();
      profile_picture = await fileToBase64(blob, 100, 100);
    }

    const usersRef = ref(db, "users");
    const newUser = {
      username: user.username,
      email: user.email,
      profile_picture,
      schedule: user.selectedDays || [],
      present: user.present || 0,
      checkinDates: user.checkinDates || [] // <-- store array of dates
    };

    const newUserRef = await push(usersRef, newUser);
    console.log("User added with ID:", newUserRef.key);
    return newUserRef.key;
  } catch (e) {
    console.error("Error adding user:", e);
    throw e;
  }
}
// UPDATE USER
export async function updateUser(id, data) {
  try {
    const userRef = ref(db, `users/${id}`);
    const updatedData = { ...data };

    // If a file is provided, convert it to Base64
    if (data.file) {
      updatedData.profile_picture = await fileToBase64(data.file, 100, 100);
      delete updatedData.file; // Remove raw file so we don't store it
    }

    await update(userRef, updatedData);
    console.log("User updated with ID:", id);
  } catch (e) {
    console.error("Error updating user:", e);
    throw e;
  }
}


// DELETE USER
export async function deleteUser(id) {
  try {
    const userRef = ref(db, `users/${id}`);
    await remove(userRef);
    console.log("User deleted with ID:", id);
  } catch (e) {
    console.error("Error deleting user:", e);
  }
}

// GET USERS BY SCHEDULE (day: string)
export async function getUsersBySchedule(day) {
  try {
    const usersRef = ref(db, "users");
    const snapshot = await get(usersRef);
    const data = snapshot.val() || {};

    // Filter users who have the day in their schedule
    return Object.keys(data)
      .map((key) => ({ id: key, ...data[key] }))
      .filter((user) => Array.isArray(user.schedule) && user.schedule.includes(day));
  } catch (e) {
    console.error("Error getting users by schedule:", e);
    throw e;
  }
}

// -------------------- ATTENDANCE --------------------
export async function incrementPresent(id) {
  try {
    const userRef = ref(db, `users/${id}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      console.log("No user found with ID:", id);
      return;
    }

    const data = snapshot.val();
    const currentPresent = data.present || 0;
    let checkinDates = Array.isArray(data.checkinDates) ? data.checkinDates : [];

    // Today in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // If today is the 1st of the month, reset checkinDates and present
    const dayOfMonth = new Date().getDate();
    if (dayOfMonth === 1) {
      checkinDates = [];
      await update(userRef, { present: 0, checkinDates: [] });
    }

    // Check if already checked in today
    if (checkinDates.includes(today)) {
      console.log(`User ${id} already checked in today.`);
      return;
    }

    // Update present + add today's date
    await update(userRef, {
      present: currentPresent + 1,
      checkinDates: [...checkinDates, today],
    });

    console.log(
      `User ${id} present incremented to ${currentPresent + 1}, checkinDates = [${[...checkinDates, today]}]`
    );
  } catch (e) {
    console.error("Error incrementing present:", e);
  }
}
