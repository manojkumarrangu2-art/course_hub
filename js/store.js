/**
 * CourseHub State Store
 * Persistent reactive store backed by localStorage with support for
 * learning paths and student reviews.
 */

const STORAGE_KEYS = {
  CURRENT_USER: "coursehub_current_user",
  REGISTERED_USERS: "coursehub_users_list",
  STUDENT_PROFILE: "coursehub_student_profile",
  REGISTERED_COURSES: "coursehub_registered_courses",
  SELECTED_CART: "coursehub_selected_cart",
  TRANSACTIONS: "coursehub_transactions",
  NOTIFICATIONS: "coursehub_notifications",
  THEME: "coursehub_theme",
  COURSES_DATA: "coursehub_courses_catalog_v2",
  ENROLLED_PATHS: "coursehub_enrolled_paths_v2",
  APP_INITIALIZED: "coursehub_initialized_v3",
  MOCK_TESTS: "coursehub_mock_tests_v1",
  TEST_ATTEMPTS: "coursehub_test_attempts_v1",
  COMPLETED_COURSES: "coursehub_completed_courses_v1",
  CERTIFICATES: "coursehub_certificates_v1"
};

class Store {
  constructor() {
    this.init();
  }

  init() {
    const isInit = localStorage.getItem(STORAGE_KEYS.APP_INITIALIZED);
    if (!isInit) {
      // Seed initial data
      localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILE, JSON.stringify(INITIAL_STUDENT));
      localStorage.setItem(STORAGE_KEYS.REGISTERED_COURSES, JSON.stringify(INITIAL_REGISTERED_IDS));
      localStorage.setItem(STORAGE_KEYS.SELECTED_CART, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
      localStorage.setItem(STORAGE_KEYS.COURSES_DATA, JSON.stringify(INITIAL_COURSES));
      localStorage.setItem(STORAGE_KEYS.ENROLLED_PATHS, JSON.stringify(["path-ai-ml"]));
      localStorage.setItem(STORAGE_KEYS.MOCK_TESTS, JSON.stringify(INITIAL_MOCK_TESTS));
      localStorage.setItem(STORAGE_KEYS.COMPLETED_COURSES, JSON.stringify(INITIAL_COMPLETED_COURSES));
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(INITIAL_CERTIFICATES));
      localStorage.setItem(STORAGE_KEYS.TEST_ATTEMPTS, JSON.stringify([]));

      // Seed default user for demo login
      const defaultUsers = [
        {
          id: INITIAL_STUDENT.id,
          rollNo: INITIAL_STUDENT.rollNo,
          name: INITIAL_STUDENT.name,
          email: INITIAL_STUDENT.email,
          phone: INITIAL_STUDENT.phone,
          password: "password123",
          department: INITIAL_STUDENT.department,
          year: INITIAL_STUDENT.year,
          semester: INITIAL_STUDENT.semester
        }
      ];
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(defaultUsers));
      localStorage.setItem(STORAGE_KEYS.APP_INITIALIZED, "true");
    } else {
      // Ensure new feature storage keys exist even if app was initialized prior
      if (!localStorage.getItem(STORAGE_KEYS.MOCK_TESTS)) {
        localStorage.setItem(STORAGE_KEYS.MOCK_TESTS, JSON.stringify(INITIAL_MOCK_TESTS));
      }
      if (!localStorage.getItem(STORAGE_KEYS.COMPLETED_COURSES)) {
        localStorage.setItem(STORAGE_KEYS.COMPLETED_COURSES, JSON.stringify(INITIAL_COMPLETED_COURSES));
      }
      if (!localStorage.getItem(STORAGE_KEYS.CERTIFICATES)) {
        localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(INITIAL_CERTIFICATES));
      }
      if (!localStorage.getItem(STORAGE_KEYS.TEST_ATTEMPTS)) {
        localStorage.setItem(STORAGE_KEYS.TEST_ATTEMPTS, JSON.stringify([]));
      }
    }
  }

  // --- Auth & Session ---
  getCurrentUser() {
    const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userStr ? JSON.parse(userStr) : null;
  }

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  getRegisteredUsers() {
    const users = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    return users ? JSON.parse(users) : [];
  }

  registerUser(userData) {
    const users = this.getRegisteredUsers();
    const exists = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase() || u.rollNo.toUpperCase() === userData.rollNo.toUpperCase());
    if (exists) {
      throw new Error("A student with this Email or Student ID already exists.");
    }
    users.push(userData);
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));

    // Also update student profile with registered details
    const currentProfile = this.getStudentProfile();
    const updatedProfile = {
      ...currentProfile,
      id: userData.rollNo ? `STU-${userData.rollNo}` : currentProfile.id,
      rollNo: userData.rollNo,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      department: userData.department || currentProfile.department,
      year: userData.year || currentProfile.year,
      semester: userData.semester || currentProfile.semester
    };
    this.updateStudentProfile(updatedProfile);
    return userData;
  }

  login(identifier, password) {
    const users = this.getRegisteredUsers();
    const cleanId = identifier.trim().toLowerCase();
    const user = users.find(u => 
      (u.email.toLowerCase() === cleanId || u.rollNo.toLowerCase() === cleanId) &&
      u.password === password
    );
    if (!user) {
      throw new Error("Invalid Student ID/Email or Password. Please try again.");
    }
    this.setCurrentUser(user);
    return user;
  }

  logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  // --- Student Profile ---
  getStudentProfile() {
    const profile = localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILE);
    return profile ? JSON.parse(profile) : INITIAL_STUDENT;
  }

  updateStudentProfile(updates) {
    const current = this.getStudentProfile();
    const merged = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILE, JSON.stringify(merged));
    return merged;
  }

  // --- Courses Catalog & Reviews ---
  getAllCourses() {
    const stored = localStorage.getItem(STORAGE_KEYS.COURSES_DATA);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return INITIAL_COURSES;
      }
    }
    return INITIAL_COURSES;
  }

  saveCourses(courses) {
    localStorage.setItem(STORAGE_KEYS.COURSES_DATA, JSON.stringify(courses));
  }

  getCourseById(courseId) {
    const courses = this.getAllCourses();
    return courses.find(c => c.id === courseId || c.code === courseId);
  }

  addCourseReview(courseId, reviewInput) {
    const courses = this.getAllCourses();
    const courseIndex = courses.findIndex(c => c.id === courseId || c.code === courseId);
    if (courseIndex === -1) throw new Error("Course not found");

    const course = courses[courseIndex];
    if (!course.reviews) course.reviews = [];

    const student = this.getStudentProfile();
    const newReview = {
      id: `rev-${Date.now()}`,
      studentName: reviewInput.isAnonymous ? "Verified Student" : student.name,
      rollNo: reviewInput.isAnonymous ? "Anonymous" : student.rollNo,
      batch: `Class of ${new Date().getFullYear() + 2}`,
      avatar: reviewInput.isAnonymous 
        ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" 
        : student.avatarUrl,
      rating: Number(reviewInput.rating),
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      verified: true,
      helpfulCount: 1,
      difficulty: reviewInput.difficulty || "Moderate",
      instructorRating: Number(reviewInput.instructorRating || reviewInput.rating),
      comment: reviewInput.comment
    };

    course.reviews.unshift(newReview);
    course.reviewCount = (course.reviewCount || 0) + 1;

    // Recalculate average rating
    const totalScore = course.reviews.reduce((sum, r) => sum + r.rating, 0);
    course.rating = Number((totalScore / course.reviews.length).toFixed(2));

    courses[courseIndex] = course;
    this.saveCourses(courses);

    this.addNotification({
      title: `Review Published for ${course.code}`,
      message: `Your rating (${newReview.rating}★) has been posted. Thank you for contributing to the student community!`,
      category: "review",
      icon: "star",
      actionLink: "browse"
    });

    return { course, newReview };
  }

  likeReview(courseId, reviewId) {
    const courses = this.getAllCourses();
    const course = courses.find(c => c.id === courseId || c.code === courseId);
    if (!course || !course.reviews) return false;

    const review = course.reviews.find(r => r.id === reviewId);
    if (review) {
      review.helpfulCount = (review.helpfulCount || 0) + 1;
      this.saveCourses(courses);
      return review.helpfulCount;
    }
    return false;
  }

  // --- Learning Paths ---
  getLearningPaths() {
    const enrolledPaths = this.getEnrolledPathIds();
    const registeredIds = this.getRegisteredCourseIds();

    return LEARNING_PATHS.map(path => {
      // Dynamically calculate milestones based on student's registered courses
      const updatedMilestones = path.milestones.map(m => {
        if (registeredIds.includes(m.code)) {
          return { ...m, status: "Enrolled", grade: "In Progress" };
        }
        return m;
      });

      const completedCount = updatedMilestones.filter(m => m.status === "Completed").length;
      const enrolledCount = updatedMilestones.filter(m => m.status === "Enrolled").length;
      const progress = Math.round(((completedCount + enrolledCount * 0.5) / updatedMilestones.length) * 100);

      return {
        ...path,
        milestones: updatedMilestones,
        progressPercentage: progress,
        isEnrolled: enrolledPaths.includes(path.id)
      };
    });
  }

  getLearningPathById(pathId) {
    const paths = this.getLearningPaths();
    return paths.find(p => p.id === pathId || p.slug === pathId);
  }

  getEnrolledPathIds() {
    const stored = localStorage.getItem(STORAGE_KEYS.ENROLLED_PATHS);
    return stored ? JSON.parse(stored) : ["path-ai-ml"];
  }

  enrollInLearningPath(pathId) {
    let enrolled = this.getEnrolledPathIds();
    if (!enrolled.includes(pathId)) {
      enrolled.push(pathId);
      localStorage.setItem(STORAGE_KEYS.ENROLLED_PATHS, JSON.stringify(enrolled));

      const path = LEARNING_PATHS.find(p => p.id === pathId);
      this.addNotification({
        title: `Enrolled in ${path ? path.title : 'Learning Path'}`,
        message: `Your degree progress will track requirements for this specialization track.`,
        category: "path",
        icon: "map",
        actionLink: "paths"
      });
    }
    return enrolled;
  }

  // --- Registration & Cart ---
  getRegisteredCourseIds() {
    const ids = localStorage.getItem(STORAGE_KEYS.REGISTERED_COURSES);
    return ids ? JSON.parse(ids) : [];
  }

  getRegisteredCourses() {
    const registeredIds = this.getRegisteredCourseIds();
    const courses = this.getAllCourses();
    return courses.filter(c => registeredIds.includes(c.id));
  }

  getSelectedCart() {
    const cart = localStorage.getItem(STORAGE_KEYS.SELECTED_CART);
    return cart ? JSON.parse(cart) : [];
  }

  toggleCartCourse(courseId) {
    let cart = this.getSelectedCart();
    if (cart.includes(courseId)) {
      cart = cart.filter(id => id !== courseId);
    } else {
      cart.push(courseId);
    }
    localStorage.setItem(STORAGE_KEYS.SELECTED_CART, JSON.stringify(cart));
    return cart;
  }

  clearCart() {
    localStorage.setItem(STORAGE_KEYS.SELECTED_CART, JSON.stringify([]));
  }

  confirmRegistration(courseIds) {
    const registered = new Set(this.getRegisteredCourseIds());
    courseIds.forEach(id => registered.add(id));
    const updated = Array.from(registered);
    localStorage.setItem(STORAGE_KEYS.REGISTERED_COURSES, JSON.stringify(updated));
    this.clearCart();

    this.addNotification({
      title: "Course Registration Confirmed",
      message: `You have successfully registered for ${courseIds.length} course(s). Check your timetable and learning path progress.`,
      category: "registration",
      icon: "check-circle",
      actionLink: "my-courses"
    });

    return updated;
  }

  dropCourse(courseId) {
    let registered = this.getRegisteredCourseIds();
    registered = registered.filter(id => id !== courseId);
    localStorage.setItem(STORAGE_KEYS.REGISTERED_COURSES, JSON.stringify(registered));

    const course = this.getCourseById(courseId);
    this.addNotification({
      title: "Course Dropped",
      message: `You dropped ${course ? course.title : courseId}. Credits have been adjusted.`,
      category: "registration",
      icon: "clock",
      actionLink: "my-courses"
    });

    return registered;
  }

  // --- Transactions & Fee Calculations ---
  getTransactions() {
    const txns = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return txns ? JSON.parse(txns) : INITIAL_TRANSACTIONS;
  }

  getPaymentStats() {
    const txns = this.getTransactions();
    let totalFees = 29500;
    let paid = 0;
    let pending = 0;

    txns.forEach(t => {
      if (t.status === "Paid") {
        paid += t.amount;
      } else if (t.status === "Pending") {
        pending += t.amount;
      }
    });

    totalFees = 20000 + pending;

    return {
      totalFees: totalFees,
      paid: paid > 0 ? 20000 : 0,
      pending: pending,
      status: pending > 0 ? "Pending" : "Cleared"
    };
  }

  processPayment({ amount, method, description, items }) {
    const txns = this.getTransactions();
    const newTxnId = `TXN-2024-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const formattedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    let resolvedPending = false;
    const updatedTxns = txns.map(t => {
      if (t.status === "Pending" && !resolvedPending) {
        resolvedPending = true;
        return {
          ...t,
          status: "Paid",
          paymentMethod: method,
          date: formattedDate,
          time: formattedTime,
          receiptNumber: `REC-2024-${Math.floor(5000 + Math.random() * 4999)}`
        };
      }
      return t;
    });

    let primaryTxn;
    if (resolvedPending) {
      primaryTxn = updatedTxns.find(t => t.receiptNumber && t.receiptNumber.startsWith("REC-2024-5"));
    } else {
      primaryTxn = {
        id: newTxnId,
        date: formattedDate,
        time: formattedTime,
        description: description || "Semester Course Registration Dues",
        amount: amount,
        paymentMethod: method,
        status: "Paid",
        receiptNumber: `REC-2024-${Math.floor(5000 + Math.random() * 4999)}`,
        payerName: this.getStudentProfile().name,
        academicYear: "2024-2025 (Odd Sem)",
        items: items || [
          { name: "Course Tuition & Registration Fee", amount: amount - 500 },
          { name: "Portal & Processing Charges", amount: 500 }
        ]
      };
      updatedTxns.unshift(primaryTxn);
    }

    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTxns));

    this.addNotification({
      title: "Payment Successful ✓",
      message: `Payment of ₹${amount.toLocaleString()} via ${method} cleared. Receipt generated.`,
      category: "payment",
      icon: "check-circle",
      actionLink: "history"
    });

    return primaryTxn;
  }

  // --- Notifications ---
  getNotifications() {
    const list = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return list ? JSON.parse(list) : INITIAL_NOTIFICATIONS;
  }

  addNotification(notif) {
    const list = this.getNotifications();
    const newNotif = {
      id: `notif-${Date.now()}`,
      time: "Just now",
      timestamp: Date.now(),
      unread: true,
      ...notif
    };
    list.unshift(newNotif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    return newNotif;
  }

  markNotificationRead(id) {
    const list = this.getNotifications();
    const updated = list.map(n => n.id === id ? { ...n, unread: false } : n);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  }

  markAllNotificationsRead() {
    const list = this.getNotifications();
    const updated = list.map(n => ({ ...n, unread: false }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  }

  // --- Theme ---
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || "light";
  }

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }

  // --- Academic Mock Tests ---
  getMockTests() {
    const testsStr = localStorage.getItem(STORAGE_KEYS.MOCK_TESTS);
    if (testsStr) {
      try { return JSON.parse(testsStr); } catch (e) { return INITIAL_MOCK_TESTS; }
    }
    return INITIAL_MOCK_TESTS;
  }

  getMockTestForCourse(courseId) {
    const tests = this.getMockTests();
    return tests[courseId] || null;
  }

  getTestAttempts(courseId = null) {
    const attemptsStr = localStorage.getItem(STORAGE_KEYS.TEST_ATTEMPTS);
    const attempts = attemptsStr ? JSON.parse(attemptsStr) : [];
    if (courseId) {
      return attempts.filter(a => a.courseId === courseId || a.courseCode === courseId);
    }
    return attempts;
  }

  getLatestAttempt(courseId) {
    const attempts = this.getTestAttempts(courseId);
    return attempts.length > 0 ? attempts[0] : null;
  }

  saveTestAttempt(courseId, { answers, score, percentage, passed, grade, timeSpent, totalQuestions }) {
    const course = this.getCourseById(courseId);
    const student = this.getStudentProfile();
    const attempts = this.getTestAttempts();
    const now = new Date();
    const dateFormatted = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const timeFormatted = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    const newAttempt = {
      id: `ATT-${Date.now()}`,
      courseId,
      courseCode: course ? course.code : courseId,
      courseTitle: course ? course.title : courseId,
      date: dateFormatted,
      time: timeFormatted,
      timestamp: Date.now(),
      answers,
      score,
      percentage,
      passed,
      grade,
      timeSpent,
      totalQuestions
    };

    attempts.unshift(newAttempt);
    localStorage.setItem(STORAGE_KEYS.TEST_ATTEMPTS, JSON.stringify(attempts));

    let certificate = null;

    if (passed) {
      // Mark course as completed in store
      this.markCourseCompleted({
        courseId,
        grade,
        score,
        date: dateFormatted
      });

      // Issue or update Certificate
      certificate = this.issueCertificate({
        courseId,
        studentName: student.name,
        rollNo: student.rollNo,
        grade,
        score,
        percentage
      });

      // Add celebratory notification
      this.addNotification({
        title: `Mock Test Passed: ${course ? course.code : courseId} (${percentage}%)`,
        message: `Congratulations! You scored ${percentage}% (Grade ${grade}) and completed the course evaluation. Your official Certificate of Completion has been issued!`,
        category: "exam",
        icon: "award",
        actionLink: "tests"
      });
    } else {
      this.addNotification({
        title: `Mock Test Result: ${course ? course.code : courseId}`,
        message: `You scored ${percentage}%. You can review the solutions and retake the test anytime to earn your certificate (passing threshold is 70%).`,
        category: "exam",
        icon: "file-text",
        actionLink: "tests"
      });
    }

    return { attempt: newAttempt, certificate };
  }

  // --- Completed Courses Management ---
  getCompletedCourses() {
    const stored = localStorage.getItem(STORAGE_KEYS.COMPLETED_COURSES);
    return stored ? JSON.parse(stored) : INITIAL_COMPLETED_COURSES;
  }

  isCourseCompleted(courseId) {
    const list = this.getCompletedCourses();
    return list.some(c => c.courseId === courseId || c.courseCode === courseId);
  }

  getCompletedCourse(courseId) {
    const list = this.getCompletedCourses();
    return list.find(c => c.courseId === courseId || c.courseCode === courseId) || null;
  }

  markCourseCompleted({ courseId, grade, score, date }) {
    const list = this.getCompletedCourses();
    const course = this.getCourseById(courseId);
    const existingIndex = list.findIndex(c => c.courseId === courseId || c.courseCode === courseId);

    const record = {
      courseId,
      courseCode: course ? course.code : courseId,
      title: course ? course.title : courseId,
      department: course ? course.department : "CSE",
      credits: course ? course.credits : 4,
      grade: grade || "A",
      score: score || 85,
      completedDate: date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      certificateId: `CHU-CERT-2024-${course ? course.code : courseId}-${Math.floor(1000 + Math.random() * 9000)}`,
      instructor: course ? course.instructor : "Dr. Arvind Subramanian",
      instructorRole: course ? course.instructorRole : "Professor"
    };

    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...record };
    } else {
      list.push(record);

      // Increase completed credits in student profile
      const profile = this.getStudentProfile();
      const creditsToAdd = course ? course.credits : 4;
      const updatedCredits = Math.min(profile.totalCreditsTarget, (profile.completedCredits || 72) + creditsToAdd);
      this.updateStudentProfile({ completedCredits: updatedCredits });
    }

    localStorage.setItem(STORAGE_KEYS.COMPLETED_COURSES, JSON.stringify(list));
    return record;
  }

  // --- Academic Certificates Management ---
  getCertificates() {
    const stored = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    return stored ? JSON.parse(stored) : INITIAL_CERTIFICATES;
  }

  getCertificateById(certId) {
    const certs = this.getCertificates();
    return certs.find(c => c.id === certId) || null;
  }

  getCertificateForCourse(courseId) {
    const certs = this.getCertificates();
    return certs.find(c => c.courseId === courseId || c.courseCode === courseId) || null;
  }

  issueCertificate({ courseId, studentName, rollNo, grade, score, percentage }) {
    const certs = this.getCertificates();
    const course = this.getCourseById(courseId);
    const student = this.getStudentProfile();
    const existingIndex = certs.findIndex(c => c.courseId === courseId || c.courseCode === courseId);

    const certId = existingIndex >= 0 
      ? certs[existingIndex].id 
      : `CHU-CERT-2024-${course ? course.code : courseId}-${Math.floor(1000 + Math.random() * 9000)}`;

    const issueDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    const certificate = {
      id: certId,
      courseId: courseId,
      courseCode: course ? course.code : courseId,
      courseTitle: course ? course.title : "Academic Course",
      department: course ? course.departmentName || course.department : student.department,
      credits: course ? course.credits : 4,
      studentName: studentName || student.name,
      rollNo: rollNo || student.rollNo,
      college: student.college || "Institute of Technology & Advanced Science",
      grade: grade || "A",
      score: score || 85,
      percentage: percentage || 85,
      issueDate: issueDate,
      instructor: course ? course.instructor : "Dr. Arvind Subramanian",
      instructorRole: course ? course.instructorRole : "Professor & Academic Dean",
      registrar: "Dr. Meenakshi Sundaram",
      registrarRole: "University Registrar",
      verificationUrl: `https://coursehub.university.edu/verify/${certId}`,
      academicYear: "2024-2025 (Odd Sem)"
    };

    if (existingIndex >= 0) {
      certs[existingIndex] = certificate;
    } else {
      certs.unshift(certificate);
    }

    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certs));
    return certificate;
  }
}

const store = new Store();

