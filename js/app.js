/**
 * CourseHub Application Controller
 * Handles view routing, form validation, dynamic course catalog,
 * interactive registration, payment gateway simulation, weekly timetable,
 * student profile, and reactive UI state.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AI Assistant
  window.aiAssistant = new CourseAssistAI();

  // Initialize App Controller
  window.app = new CourseHubApp();
  window.app.init();
});

class CourseHubApp {
  constructor() {
    this.currentView = "register"; // Default flow starts at registration
    this.currentDashboardTab = "home";
    this.selectedCart = store.getSelectedCart();
    this.activeDayFilter = "All";
    this.selectedPaymentMethod = "upi";
    this.activePaymentTxn = null;
    this.activeModalCourseId = null;
    this.activeModalTab = "overview";
    this.activeTestCourseId = null;
    this.activeTestState = null;
    this.activeCertificate = null;
    this.activeTestFilter = "all";
  }

  init() {
    this.bindAuthEvents();
    this.bindSidebarEvents();
    this.bindTopNavEvents();
    this.bindModalEvents();
    this.bindBrowseFilterEvents();
    this.bindRegistrationEvents();
    this.bindPaymentEvents();
    this.bindProfileEvents();
    this.bindSettingsEvents();
    this.bindReviewEvents();
    this.bindMockTestEvents();
    this.bindCertificateEvents();

    // Strict Application Flow: The first screen must always be the Student Registration Page
    // Flow: Registration -> Login -> Student Dashboard
    this.switchMainView("register");

    // Apply saved theme
    const savedTheme = store.getTheme();
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  // =========================================================================
  // VIEW ROUTER & NAVIGATION
  // =========================================================================
  switchMainView(viewName) {
    const registerView = document.getElementById("register-view");
    const loginView = document.getElementById("login-view");
    const dashboardView = document.getElementById("dashboard-view");

    registerView.classList.add("hidden");
    loginView.classList.add("hidden");
    dashboardView.classList.add("hidden");

    if (viewName === "register") {
      registerView.classList.remove("hidden");
      this.currentView = "register";
      window.scrollTo(0, 0);
    } else if (viewName === "login") {
      loginView.classList.remove("hidden");
      this.currentView = "login";
      window.scrollTo(0, 0);
    } else if (viewName === "dashboard") {
      dashboardView.classList.remove("hidden");
      this.currentView = "dashboard";
      this.switchDashboardTab("home");
      this.loadDashboardData();
      window.scrollTo(0, 0);
    }
  }

  switchDashboardTab(tabName) {
    this.currentDashboardTab = tabName;

    // Update active class on nav items
    document.querySelectorAll(".nav-item").forEach(item => {
      if (item.dataset.view === tabName) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Hide all view sections
    document.querySelectorAll(".content-area > .view-section").forEach(sec => {
      sec.classList.add("hidden");
    });

    // Show target section
    const targetSection = document.getElementById(`view-${tabName}`);
    if (targetSection) {
      targetSection.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Tab-specific initializers
    if (tabName === "home") {
      this.renderDashboardHome();
    } else if (tabName === "browse") {
      this.renderBrowseCourses();
    } else if (tabName === "paths") {
      this.renderLearningPaths();
    } else if (tabName === "registration") {
      this.renderRegistrationPage();
    } else if (tabName === "my-courses") {
      this.renderMyCourses();
    } else if (tabName === "tests") {
      this.renderMockTests();
    } else if (tabName === "timetable") {
      this.renderTimetable();
    } else if (tabName === "payments") {
      this.renderPayments();
    } else if (tabName === "history") {
      this.renderPaymentHistory();
    } else if (tabName === "notifications") {
      this.renderNotifications();
    } else if (tabName === "profile") {
      this.renderProfile();
    }


    // Close mobile sidebar if open
    document.getElementById("sidebar").classList.remove("mobile-open");
  }

  // =========================================================================
  // 1. AUTHENTICATION (Registration & Login)
  // =========================================================================
  bindAuthEvents() {
    const regForm = document.getElementById("registration-form");
    const loginForm = document.getElementById("login-form");
    const linkToLogin = document.getElementById("link-to-login");
    const linkToRegister = document.getElementById("link-to-register");
    const btnDemoReg = document.getElementById("btn-demo-fill-reg");
    const btnDemoLogin = document.getElementById("btn-demo-fill-login");

    // Toggle links between Register and Login
    linkToLogin.addEventListener("click", (e) => {
      e.preventDefault();
      this.switchMainView("login");
    });

    linkToRegister.addEventListener("click", (e) => {
      e.preventDefault();
      this.switchMainView("register");
    });

    // Demo Fill on Registration
    btnDemoReg.addEventListener("click", () => {
      document.getElementById("reg-fullname").value = "Venu Gopal";
      document.getElementById("reg-rollno").value = "CS24B1099";
      document.getElementById("reg-email").value = "venu.gopal@university.edu";
      document.getElementById("reg-phone").value = "+91 98480 22338";
      document.getElementById("reg-dept").value = "Computer Science & Engineering";
      document.getElementById("reg-year").value = "3rd Year";
      document.getElementById("reg-semester").value = "5th Semester";
      document.getElementById("reg-password").value = "Pass@1234";
      document.getElementById("reg-confirm-password").value = "Pass@1234";
      this.showToast("Demo student data loaded into registration form!", "info");
    });

    // Demo Fill on Login
    btnDemoLogin.addEventListener("click", () => {
      document.getElementById("login-identifier").value = "alex.vance@university.edu";
      document.getElementById("login-password").value = "password123";
      this.showToast("Demo credentials populated!", "info");
    });

    // Password visibility toggle buttons
    document.querySelectorAll(".password-toggle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        if (input) {
          const isPassword = input.type === "password";
          input.type = isPassword ? "text" : "password";
        }
      });
    });

    // Registration Form Submit
    regForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const alertBox = document.getElementById("reg-alert-box");
      alertBox.classList.add("hidden");

      const name = document.getElementById("reg-fullname").value.trim();
      const rollNo = document.getElementById("reg-rollno").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const phone = document.getElementById("reg-phone").value.trim();
      const dept = document.getElementById("reg-dept").value;
      const year = document.getElementById("reg-year").value;
      const semester = document.getElementById("reg-semester").value;
      const password = document.getElementById("reg-password").value;
      const confirmPass = document.getElementById("reg-confirm-password").value;

      // Validation
      if (!name || !rollNo || !email || !phone || !password) {
        this.showAuthAlert(alertBox, "Please fill in all required fields.", "error");
        return;
      }
      if (password !== confirmPass) {
        this.showAuthAlert(alertBox, "Passwords do not match.", "error");
        return;
      }
      if (password.length < 6) {
        this.showAuthAlert(alertBox, "Password must be at least 6 characters.", "error");
        return;
      }

      const submitBtn = document.getElementById("btn-submit-registration");
      submitBtn.classList.add("is-loading");

      setTimeout(() => {
        try {
          store.registerUser({
            name,
            rollNo,
            email,
            phone,
            department: dept,
            year,
            semester,
            password
          });

          submitBtn.classList.remove("is-loading");
          this.showToast("Account successfully registered! Please sign in.", "success");
          
          // Smooth transition to Login page
          this.switchMainView("login");
          document.getElementById("login-identifier").value = email;
          document.getElementById("login-password").value = password;
        } catch (err) {
          submitBtn.classList.remove("is-loading");
          this.showAuthAlert(alertBox, err.message, "error");
        }
      }, 700);
    });

    // Login Form Submit
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const alertBox = document.getElementById("login-alert-box");
      alertBox.classList.add("hidden");

      const identifier = document.getElementById("login-identifier").value.trim();
      const password = document.getElementById("login-password").value;

      if (!identifier || !password) {
        this.showAuthAlert(alertBox, "Please enter your Student ID/Email and Password.", "error");
        return;
      }

      const submitBtn = document.getElementById("btn-submit-login");
      submitBtn.classList.add("is-loading");

      setTimeout(() => {
        try {
          const user = store.login(identifier, password);
          submitBtn.classList.remove("is-loading");
          this.showToast(`Welcome back, ${user.name}!`, "success");
          this.switchMainView("dashboard");
        } catch (err) {
          submitBtn.classList.remove("is-loading");
          this.showAuthAlert(alertBox, err.message, "error");
        }
      }, 650);
    });

    // Logout
    document.getElementById("btn-sidebar-logout").addEventListener("click", () => {
      store.logout();
      this.showToast("You have been signed out safely.", "info");
      this.switchMainView("login");
    });
  }

  showAuthAlert(container, message, type) {
    container.className = `alert alert-${type}`;
    container.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${message}</span>
    `;
    container.classList.remove("hidden");
  }

  // =========================================================================
  // 2. DASHBOARD NAVIGATION & SHELL
  // =========================================================================
  bindSidebarEvents() {
    const sidebar = document.getElementById("sidebar");
    const mainWrapper = document.getElementById("main-wrapper");
    const toggleBtn = document.getElementById("sidebar-toggle-btn");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");

    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      mainWrapper.classList.toggle("expanded");
    });

    mobileMenuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open");
    });

    // Sidebar items click
    document.querySelectorAll(".nav-item").forEach(item => {
      item.addEventListener("click", () => {
        const view = item.dataset.view;
        if (view) {
          this.switchDashboardTab(view);
        }
      });
    });
  }

  bindTopNavEvents() {
    // Global search input
    const topSearch = document.getElementById("top-global-search");
    topSearch.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = topSearch.value.trim();
        if (query) {
          this.switchDashboardTab("browse");
          const browseSearch = document.getElementById("browse-search-input");
          if (browseSearch) {
            browseSearch.value = query;
            this.renderBrowseCourses();
          }
        }
      }
    });

    // Profile Capsule Click
    document.getElementById("top-profile-capsule").addEventListener("click", () => {
      this.switchDashboardTab("profile");
    });

    // Notifications Icon Click
    document.getElementById("top-notif-btn").addEventListener("click", () => {
      this.switchDashboardTab("notifications");
    });

    // Theme Toggle
    document.getElementById("btn-theme-toggle").addEventListener("click", () => {
      const current = store.getTheme();
      const newTheme = current === "dark" ? "light" : "dark";
      store.setTheme(newTheme);
      this.showToast(`Switched to ${newTheme} theme`, "info");
    });
  }

  loadDashboardData() {
    const profile = store.getStudentProfile();
    
    // Top nav updates
    document.getElementById("top-student-name").textContent = profile.name;
    document.getElementById("top-student-id").textContent = profile.rollNo || profile.id;
    document.getElementById("top-avatar-img").src = profile.avatarUrl;

    // Notification counter
    this.updateNotificationCounters();

    // Render Home Tab by default
    this.renderDashboardHome();
  }

  updateNotificationCounters() {
    const notifs = store.getNotifications();
    const unreadCount = notifs.filter(n => n.unread).length;
    const dot = document.getElementById("top-notif-dot");
    const badge = document.getElementById("sidebar-notif-count");

    if (dot) {
      dot.style.display = unreadCount > 0 ? "block" : "none";
    }
    if (badge) {
      badge.textContent = unreadCount;
      badge.style.display = unreadCount > 0 ? "inline-block" : "none";
    }
  }

  // =========================================================================
  // 3. DASHBOARD HOME VIEW
  // =========================================================================
  renderDashboardHome() {
    const student = store.getStudentProfile();
    const registered = store.getRegisteredCourses();
    const paymentStats = store.getPaymentStats();

    // Welcome title
    document.getElementById("dash-student-name").textContent = student.name;

    // 6 Stats Cards
    const totalCredits = registered.reduce((sum, c) => sum + c.credits, 0);
    document.getElementById("stat-registered-count").textContent = registered.length;
    document.getElementById("stat-total-credits").textContent = totalCredits;
    document.getElementById("stat-completed-credits").textContent = student.completedCredits;
    document.getElementById("stat-pending-fees").textContent = `₹${paymentStats.pending.toLocaleString()}`;
    document.getElementById("stat-attendance").textContent = student.attendance;

    const certs = store.getCertificates();
    const certCountEl = document.getElementById("stat-certificates-count");
    if (certCountEl) certCountEl.textContent = certs.length;

    // Fee badge indicator
    const feeBadge = document.getElementById("stat-fee-status-badge");
    if (paymentStats.pending === 0) {
      feeBadge.className = "stat-indicator good";
      feeBadge.textContent = "All Cleared ✓";
    } else {
      feeBadge.className = "stat-indicator warn";
      feeBadge.textContent = "Due Soon";
    }

    // Hero buttons
    document.getElementById("hero-btn-register").onclick = () => this.switchDashboardTab("registration");
    document.getElementById("hero-btn-pay").onclick = () => this.switchDashboardTab("payments");

    // Quick Actions
    document.getElementById("qa-browse-btn").onclick = () => this.switchDashboardTab("browse");
    const qaTestsBtn = document.getElementById("qa-tests-btn");
    if (qaTestsBtn) qaTestsBtn.onclick = () => this.switchDashboardTab("tests");
    document.getElementById("qa-receipt-btn").onclick = () => this.switchDashboardTab("history");
    document.getElementById("qa-profile-btn").onclick = () => this.switchDashboardTab("profile");
    document.getElementById("qa-advisor-btn").onclick = () => window.aiAssistant.toggle(true);

    // Link to timetable
    document.getElementById("link-view-full-timetable").onclick = (e) => {
      e.preventDefault();
      this.switchDashboardTab("timetable");
    };

    // Render Today's Classes
    this.renderTodaySchedule();
  }

  renderTodaySchedule() {
    const container = document.getElementById("today-classes-list");
    if (!container) return;

    // Check today's day (fallback to Monday if Sunday)
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = dayNames[new Date().getDay()];
    const timetableDay = TIMETABLE_DATA.find(d => d.day === today) || TIMETABLE_DATA[0];

    const activeSlots = timetableDay.slots.filter(s => s.course !== "FREE" && s.course !== "LUNCH");

    if (activeSlots.length === 0) {
      container.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted);">
          No scheduled lectures today. Perfect time for self-study and projects!
        </div>
      `;
      return;
    }

    container.innerHTML = activeSlots.map(slot => `
      <div class="class-strip-item" style="border-left-color: ${slot.color};">
        <div class="class-time-badge">${slot.time}</div>
        <div class="class-info-wrap">
          <div class="class-name">${slot.name} (${slot.course})</div>
          <div class="class-meta">
            <span>Faculty: <strong>${slot.faculty}</strong></span>
            <span class="class-room-tag">${slot.room}</span>
          </div>
        </div>
      </div>
    `).join("");
  }

  // =========================================================================
  // 4. BROWSE COURSES (3-Column Grid + Multi-Filter & Search)
  // =========================================================================
  bindBrowseFilterEvents() {
    const searchInput = document.getElementById("browse-search-input");
    const deptSelect = document.getElementById("filter-dept");
    const typeSelect = document.getElementById("filter-type");
    const creditsSelect = document.getElementById("filter-credits");
    const availSelect = document.getElementById("filter-availability");
    const sortSelect = document.getElementById("filter-sort");

    const triggerRender = () => this.renderBrowseCourses();

    if (searchInput) searchInput.addEventListener("input", triggerRender);
    if (deptSelect) deptSelect.addEventListener("change", triggerRender);
    if (typeSelect) typeSelect.addEventListener("change", triggerRender);
    if (creditsSelect) creditsSelect.addEventListener("change", triggerRender);
    if (availSelect) availSelect.addEventListener("change", triggerRender);
    if (sortSelect) sortSelect.addEventListener("change", triggerRender);
  }

  renderBrowseCourses() {
    const grid = document.getElementById("browse-courses-grid");
    if (!grid) return;

    const searchInput = document.getElementById("browse-search-input");
    const deptSelect = document.getElementById("filter-dept");
    const typeSelect = document.getElementById("filter-type");
    const creditsSelect = document.getElementById("filter-credits");
    const availSelect = document.getElementById("filter-availability");
    const sortSelect = document.getElementById("filter-sort");

    const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
    const dept = deptSelect ? deptSelect.value : "all";
    const type = typeSelect ? typeSelect.value : "all";
    const credits = creditsSelect ? creditsSelect.value : "all";
    const avail = availSelect ? availSelect.value : "all";
    const sort = sortSelect ? sortSelect.value : "popularity";

    let courses = [...store.getAllCourses()];
    const registeredIds = store.getRegisteredCourseIds();

    // Filters
    if (query) {
      courses = courses.filter(c => 
        c.title.toLowerCase().includes(query) ||
        c.code.toLowerCase().includes(query) ||
        c.instructor.toLowerCase().includes(query) ||
        c.departmentName.toLowerCase().includes(query) ||
        c.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    if (dept !== "all") {
      courses = courses.filter(c => c.department === dept);
    }

    if (type !== "all") {
      courses = courses.filter(c => c.type === type);
    }

    if (credits !== "all") {
      courses = courses.filter(c => c.credits.toString() === credits);
    }

    if (avail === "available") {
      courses = courses.filter(c => c.availableSeats >= 10);
    } else if (avail === "filling-fast") {
      courses = courses.filter(c => c.availableSeats < 15);
    }

    // Sorting
    if (sort === "name") {
      courses.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "credits") {
      courses.sort((a, b) => b.credits - a.credits);
    } else if (sort === "seats") {
      courses.sort((a, b) => b.availableSeats - a.availableSeats);
    } else {
      // Popularity by enrolledCount
      courses.sort((a, b) => b.enrolledCount - a.enrolledCount);
    }

    // Counter pill
    const countPill = document.getElementById("courses-count-pill");
    if (countPill) countPill.textContent = `Showing ${courses.length} course${courses.length !== 1 ? 's' : ''}`;

    if (courses.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3.5rem 1rem; text-align: center; background: var(--bg-surface); border-radius: var(--radius-xl); border: 1px dashed var(--border-subtle);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" stroke-width="1.5" style="margin-bottom: 1rem;">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3 style="font-size: 1.25rem; color: var(--text-main); margin-bottom: 0.5rem;">No courses match your filter criteria</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Try adjusting your department filter, keywords, or credits range.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = courses.map(course => {
      const isRegistered = registeredIds.includes(course.id);
      const isSelectedInCart = this.selectedCart.includes(course.id);
      const seatPercent = Math.round((course.enrolledCount / course.totalSeats) * 100);

      return `
        <div class="course-card" data-id="${course.id}">
          
          <!-- Banner Header -->
          <div class="course-banner" style="background: ${course.bannerGradient};">
            <span class="course-badge-pill">${course.type}</span>
            <span class="course-badge-pill" style="margin-left: auto; background: rgba(0,0,0,0.35); font-size: 0.7rem;">${course.pathName ? course.pathName.split(' ')[0] + ' Track' : 'Core'}</span>
            <span class="course-code-tag" style="margin-left: 0.5rem;">${course.code}</span>
            <div class="course-banner-icon">
              <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
              </svg>
            </div>
          </div>

          <!-- Card Body -->
          <div class="course-body">
            
            <div class="course-dept-name">${course.departmentName}</div>
            <h3 class="course-title">${course.title}</h3>
            
            <!-- Student Rating & Difficulty Tag -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <button type="button" class="btn btn-secondary btn-sm btn-quick-reviews" data-id="${course.id}" title="Read Student Reviews" style="padding: 0.2rem 0.6rem; font-size: 0.78rem; gap: 0.35rem;">
                <span style="color: #f59e0b;">★</span> <strong>${course.rating}</strong> <span style="color: var(--text-muted);">(${course.reviewCount || (course.reviews ? course.reviews.length : 100)} reviews)</span>
              </button>
              <span class="difficulty-pill ${(course.difficulty || 'Moderate').toLowerCase()}">${course.difficulty || 'Moderate'}</span>
            </div>

            <p class="course-desc-snip">${course.description}</p>

            <!-- Instructor Info -->
            <div class="course-instructor-row">
              <div class="instructor-avatar-icon">
                ${course.instructor.split(" ").map(n => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div class="instructor-meta-text">${course.instructor}</div>
                <div class="instructor-role-text">${course.instructorRole}</div>
              </div>
            </div>

            <!-- Key Metrics (Credits, Duration, Sem) -->
            <div class="course-metrics-row">
              <div class="metric-item">
                <span class="metric-val">${course.credits}</span>
                <span class="metric-lbl">Credits</span>
              </div>
              <div class="metric-item">
                <span class="metric-val">${course.duration}</span>
                <span class="metric-lbl">Duration</span>
              </div>
              <div class="metric-item">
                <span class="metric-val">${course.semester}</span>
                <span class="metric-lbl">Term</span>
              </div>
            </div>

            <!-- Seats Progress -->
            <div class="seats-progress-wrap">
              <div class="seats-header">
                <span>Available Seats</span>
                <span><strong>${course.availableSeats}</strong> / ${course.totalSeats}</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${seatPercent}%;"></div>
              </div>
            </div>

            <!-- Footer Action -->
            <div class="course-card-footer">
              <div class="course-fee-tag">
                <span class="fee-amount">₹${course.fee.toLocaleString()}</span>
                <span class="fee-label">Course Fee</span>
              </div>

              <div class="course-actions">
                <button class="btn btn-secondary btn-sm btn-view-course-details" data-id="${course.id}">
                  View Course
                </button>
                ${isRegistered ? `
                  <button class="btn btn-secondary btn-sm" disabled style="opacity: 0.7; cursor: default;">
                    Registered ✓
                  </button>
                ` : `
                  <button class="btn btn-primary btn-sm btn-quick-select-course" data-id="${course.id}">
                    ${isSelectedInCart ? "Selected ✓" : "Register Now"}
                  </button>
                `}
              </div>
            </div>

          </div>

        </div>
      `;
    }).join("");

    // Bind card action buttons
    grid.querySelectorAll(".btn-view-course-details").forEach(btn => {
      btn.addEventListener("click", () => this.openCourseDetailsModal(btn.dataset.id, "overview"));
    });

    grid.querySelectorAll(".btn-quick-reviews").forEach(btn => {
      btn.addEventListener("click", () => this.openCourseDetailsModal(btn.dataset.id, "reviews"));
    });

    grid.querySelectorAll(".btn-quick-select-course").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        this.toggleCourseInCart(id);
        this.renderBrowseCourses();
      });
    });
  }

  // =========================================================================
  // 5. COURSE REGISTRATION VIEW (Interactive Selector + Sticky Live Summary)
  // =========================================================================
  bindRegistrationEvents() {
    document.getElementById("btn-confirm-registration-trigger").addEventListener("click", () => {
      if (this.selectedCart.length === 0) {
        this.showToast("Please select at least one course to register.", "warning");
        return;
      }
      this.openConfirmRegistrationModal();
    });

    document.getElementById("btn-execute-confirm-registration").addEventListener("click", () => {
      this.executeCourseRegistration();
    });
  }

  renderRegistrationPage() {
    const listContainer = document.getElementById("reg-courses-list");
    if (!listContainer) return;

    const allCourses = store.getAllCourses();
    const registeredIds = store.getRegisteredCourseIds();

    listContainer.innerHTML = allCourses.map(course => {
      const isAlreadyRegistered = registeredIds.includes(course.id);
      const isSelected = this.selectedCart.includes(course.id) || isAlreadyRegistered;

      return `
        <div class="reg-course-row ${isSelected ? 'selected' : ''}" data-id="${course.id}">
          <input 
            type="checkbox" 
            class="reg-checkbox" 
            data-id="${course.id}"
            ${isSelected ? 'checked' : ''} 
            ${isAlreadyRegistered ? 'disabled title="Already registered"' : ''}
          />
          <div class="reg-info">
            <div class="reg-title-row">
              <span class="course-code-tag">${course.code}</span>
              <span class="reg-course-title">${course.title}</span>
              <span class="status-badge ${course.type === 'Core' ? 'registered' : 'in-progress'}">${course.type}</span>
              ${isAlreadyRegistered ? '<span class="status-badge completed">Already Enrolled</span>' : ''}
            </div>
            <div class="reg-meta-row">
              <span>Faculty: <strong>${course.instructor}</strong></span>
              <span>Credits: <strong>${course.credits}</strong></span>
              <span>Schedule: <strong>${course.schedule}</strong></span>
              <span>Available Seats: <strong>${course.availableSeats}</strong></span>
            </div>
          </div>
          <div class="reg-fee-badge">
            ₹${course.fee.toLocaleString()}
          </div>
        </div>
      `;
    }).join("");

    // Bind row click & checkbox toggle
    listContainer.querySelectorAll(".reg-course-row").forEach(row => {
      row.addEventListener("click", (e) => {
        if (e.target.tagName === "INPUT" || e.target.closest("input")) return;
        const id = row.dataset.id;
        if (!registeredIds.includes(id)) {
          this.toggleCourseInCart(id);
          this.renderRegistrationPage();
        }
      });
    });

    listContainer.querySelectorAll(".reg-checkbox").forEach(cb => {
      cb.addEventListener("change", (e) => {
        const id = cb.dataset.id;
        this.toggleCourseInCart(id);
        this.renderRegistrationPage();
      });
    });

    this.updateRegistrationSummary();
  }

  toggleCourseInCart(courseId) {
    const registeredIds = store.getRegisteredCourseIds();
    if (registeredIds.includes(courseId)) {
      this.showToast("This course is already in your enrolled courses!", "info");
      return;
    }

    if (this.selectedCart.includes(courseId)) {
      this.selectedCart = this.selectedCart.filter(id => id !== courseId);
      this.showToast(`Removed from registration selection.`, "info");
    } else {
      this.selectedCart.push(courseId);
      this.showToast(`Added to registration selection.`, "success");
    }

    localStorage.setItem("coursehub_selected_cart", JSON.stringify(this.selectedCart));
    this.updateRegistrationSummary();
  }

  updateRegistrationSummary() {
    const allCourses = store.getAllCourses();
    const registeredCourses = store.getRegisteredCourses();
    const cartCourses = allCourses.filter(c => this.selectedCart.includes(c.id));

    // Calculate totals
    const totalCredits = cartCourses.reduce((sum, c) => sum + c.credits, 0);
    const courseFees = cartCourses.reduce((sum, c) => sum + c.fee, 0);
    const registrationFee = cartCourses.length > 0 ? 500 : 0;
    const totalPayable = courseFees + registrationFee;

    // Update displays
    const countDisplay = document.getElementById("sum-courses-count");
    const creditsDisplay = document.getElementById("sum-credits-display");
    const creditsBar = document.getElementById("sum-credits-bar");
    const feesDisplay = document.getElementById("sum-course-fees");
    const totalDisplay = document.getElementById("sum-total-amount");
    const noteDisplay = document.getElementById("sum-credits-note");

    if (countDisplay) countDisplay.textContent = cartCourses.length;
    if (creditsDisplay) creditsDisplay.innerHTML = `<strong>${totalCredits}</strong> / 26 Max`;
    if (feesDisplay) feesDisplay.textContent = `₹${courseFees.toLocaleString()}`;
    if (totalDisplay) totalDisplay.textContent = `₹${totalPayable.toLocaleString()}`;

    // Credit progress percentage (capped at 26)
    const creditPercent = Math.min(100, Math.round((totalCredits / 26) * 100));
    if (creditsBar) creditsBar.style.width = `${creditPercent}%`;

    if (noteDisplay) {
      if (totalCredits < 16 && totalCredits > 0) {
        noteDisplay.innerHTML = `<span style="color: var(--accent-amber);">⚠️ Minimum recommended is 16 credits (${16 - totalCredits} more needed).</span>`;
      } else if (totalCredits > 26) {
        noteDisplay.innerHTML = `<span style="color: var(--accent-rose);">❌ Maximum 26 credits cap exceeded.</span>`;
      } else {
        noteDisplay.innerHTML = `Min allowable: 16 credits • Recommended: 20–24 credits`;
      }
    }
  }

  openConfirmRegistrationModal() {
    const modal = document.getElementById("confirm-reg-modal");
    const body = document.getElementById("confirm-reg-body");
    const allCourses = store.getAllCourses();
    const cartCourses = allCourses.filter(c => this.selectedCart.includes(c.id));

    const totalCredits = cartCourses.reduce((sum, c) => sum + c.credits, 0);
    const courseFees = cartCourses.reduce((sum, c) => sum + c.fee, 0);
    const total = courseFees + 500;

    body.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem;">Review Enrolled Courses (${cartCourses.length})</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.4;">
          Please review the subjects selected for your academic curriculum. Seats will be reserved immediately upon confirmation.
        </p>
      </div>

      <div class="modern-table-container" style="margin-bottom: 1.25rem;">
        <table class="modern-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Course Title</th>
              <th>Credits</th>
              <th>Faculty</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            ${cartCourses.map(c => `
              <tr>
                <td><strong>${c.code}</strong></td>
                <td>${c.title}</td>
                <td>${c.credits}</td>
                <td>${c.instructor}</td>
                <td>₹${c.fee.toLocaleString()}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div class="receipt-meta-box">
        <div style="display: flex; justify-content: space-between;">
          <span>Total Selected Credits:</span>
          <strong>${totalCredits} Credits</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Registration Dues (Course + Portal):</span>
          <strong style="color: var(--primary-700);">₹${total.toLocaleString()}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Prerequisites Status:</span>
          <span style="color: var(--accent-emerald); font-weight: 600;">Verified & Cleared ✓</span>
        </div>
      </div>

      <label class="checkbox-label" style="margin-top: 1rem;">
        <input type="checkbox" id="chk-terms-agree" checked />
        <span>I agree to university attendance policies (&gt;75%) and exam rules.</span>
      </label>
    `;

    modal.classList.remove("hidden");
  }

  executeCourseRegistration() {
    const agreeChk = document.getElementById("chk-terms-agree");
    if (agreeChk && !agreeChk.checked) {
      this.showToast("Please agree to the university regulations.", "warning");
      return;
    }

    const btn = document.getElementById("btn-execute-confirm-registration");
    btn.classList.add("is-loading");

    setTimeout(() => {
      const newlyAdded = [...this.selectedCart];
      store.confirmRegistration(newlyAdded);
      this.selectedCart = [];
      btn.classList.remove("is-loading");

      // Close confirm modal
      document.getElementById("confirm-reg-modal").classList.add("hidden");

      this.showToast(`Successfully registered ${newlyAdded.length} courses!`, "success");
      
      // Update sidebar counter
      const enrolledCount = store.getRegisteredCourses().length;
      document.getElementById("sidebar-enrolled-count").textContent = enrolledCount;

      // Navigate to My Courses to see them
      this.switchDashboardTab("my-courses");
    }, 700);
  }

  // =========================================================================
  // 6. MY COURSES VIEW
  // =========================================================================
  renderMyCourses() {
    const tbody = document.getElementById("my-courses-table-body");
    if (!tbody) return;

    const registered = store.getRegisteredCourses();
    const countBadge = document.getElementById("sidebar-enrolled-count");
    if (countBadge) countBadge.textContent = registered.length;

    if (registered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
            You have not enrolled in any courses yet.
            <br>
            <button class="btn btn-primary btn-sm" style="margin-top: 1rem;" onclick="app.switchDashboardTab('registration')">
              Go to Course Registration
            </button>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = registered.map(c => {
      const isCompleted = store.isCourseCompleted(c.id);
      const completedInfo = store.getCompletedCourse(c.id);
      const cert = store.getCertificateForCourse(c.id);

      const statusBadge = isCompleted 
        ? `<span class="status-badge" style="background: rgba(16, 185, 129, 0.12); color: #059669; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 700; white-space: nowrap;">
             ✓ Completed (${completedInfo ? completedInfo.grade : 'Pass'})
           </span>`
        : `<span class="status-badge registered">Registered</span>`;

      const examCol = isCompleted && cert
        ? `<div style="display: flex; flex-direction: column; gap: 0.3rem;">
             <button class="btn btn-sm btn-view-my-cert" data-cert="${cert.id}" style="background: linear-gradient(135deg, #d97706 0%, #b45309 100%); color: #fff; font-size: 0.76rem; padding: 0.35rem 0.65rem; border: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.35rem; border-radius: 6px; cursor: pointer;">
               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
               View Certificate
             </button>
             <button class="btn-link btn-retake-my-test" data-id="${c.id}" style="font-size: 0.72rem; color: var(--primary-600); text-align: left; background: none; border: none; cursor: pointer; text-decoration: underline;">
               Retake Test (${completedInfo ? completedInfo.score : 90}%)
             </button>
           </div>`
        : `<button class="btn btn-primary btn-sm btn-take-my-test" data-id="${c.id}" style="font-size: 0.76rem; padding: 0.35rem 0.65rem; display: inline-flex; align-items: center; gap: 0.35rem; white-space: nowrap;">
             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
             Take Mock Test
           </button>`;

      return `
        <tr>
          <td>
            <div style="display: flex; flex-direction: column;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="course-code-tag">${c.code}</span>
                <strong>${c.title}</strong>
              </div>
              <span style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem;">${c.departmentName}</span>
            </div>
          </td>
          <td>
            <div>
              <div>${c.instructor}</div>
              <span style="font-size: 0.74rem; color: var(--text-muted);">${c.instructorRole}</span>
            </div>
          </td>
          <td><strong>${c.credits}</strong></td>
          <td>${c.schedule}</td>
          <td><span class="class-room-tag">${c.classroom}</span></td>
          <td>${statusBadge}</td>
          <td>${examCol}</td>
          <td>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-secondary btn-sm btn-view-my-course" data-id="${c.id}" title="View Syllabus">
                Details
              </button>
              <button class="btn btn-danger btn-sm btn-drop-course" data-id="${c.id}" title="Drop this course">
                Drop
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    tbody.querySelectorAll(".btn-view-my-course").forEach(btn => {
      btn.addEventListener("click", () => this.openCourseDetailsModal(btn.dataset.id));
    });

    tbody.querySelectorAll(".btn-take-my-test, .btn-retake-my-test").forEach(btn => {
      btn.addEventListener("click", () => this.openMockTestModal(btn.dataset.id));
    });

    tbody.querySelectorAll(".btn-view-my-cert").forEach(btn => {
      btn.addEventListener("click", () => this.openCertificateModal(btn.dataset.cert));
    });

    tbody.querySelectorAll(".btn-drop-course").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        if (confirm(`Are you sure you want to drop course ${id}?`)) {
          store.dropCourse(id);
          this.showToast(`Dropped ${id}. Credits adjusted.`, "info");
          this.renderMyCourses();
        }
      });
    });


    // Print button
    document.getElementById("btn-print-courses-schedule").onclick = () => window.print();
  }

  // =========================================================================
  // 7. TIMETABLE VIEW
  // =========================================================================
  renderTimetable() {
    const gridWrapper = document.getElementById("timetable-grid-wrapper");
    if (!gridWrapper) return;

    // Filter day pills
    const pills = document.querySelectorAll("#timetable-day-filter .day-pill-btn");
    pills.forEach(btn => {
      btn.onclick = () => {
        pills.forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        this.activeDayFilter = btn.dataset.day;
        this.renderTimetable();
      };
    });

    document.getElementById("btn-print-timetable").onclick = () => window.print();

    const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
    let daysToRender = TIMETABLE_DATA;
    if (this.activeDayFilter !== "All") {
      daysToRender = TIMETABLE_DATA.filter(d => d.day === this.activeDayFilter);
    }

    gridWrapper.innerHTML = `
      <table class="timetable-week-table">
        <thead>
          <tr>
            <th style="width: 110px;">Time Slot</th>
            ${daysToRender.map(d => `<th>${d.day}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${timeSlots.map(time => `
            <tr>
              <td class="timetable-time-slot-label">${time}</td>
              ${daysToRender.map(dayObj => {
                const slot = dayObj.slots.find(s => s.time === time);
                if (!slot || slot.course === "FREE") {
                  return `
                    <td>
                      <div class="timetable-card slot-free">
                        <span>Free Hour</span>
                      </div>
                    </td>
                  `;
                }
                if (slot.course === "LUNCH") {
                  return `
                    <td>
                      <div class="timetable-card slot-free" style="background: #f8fafc;">
                        <span>🍴 Lunch Break</span>
                      </div>
                    </td>
                  `;
                }
                return `
                  <td>
                    <div class="timetable-card" style="background: ${slot.bg}; border-left-color: ${slot.color}; color: ${slot.color};">
                      <div class="timetable-card-name">${slot.name}</div>
                      <div class="timetable-card-room">
                        <strong>${slot.room}</strong> • ${slot.faculty}
                      </div>
                    </div>
                  </td>
                `;
              }).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  // =========================================================================
  // 8. PAYMENTS & TRANSACTIONS
  // =========================================================================
  bindPaymentEvents() {
    // Open payment modal
    const openBtn = document.getElementById("btn-open-payment-modal");
    if (openBtn) {
      openBtn.addEventListener("click", () => this.openPaymentModal());
    }

    // Payment method tabs
    document.querySelectorAll(".pay-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".pay-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.selectedPaymentMethod = btn.dataset.method;

        // Show matching content
        document.querySelectorAll(".pay-tab-content").forEach(c => c.classList.add("hidden"));
        const target = document.getElementById(`pay-content-${this.selectedPaymentMethod}`);
        if (target) target.classList.remove("hidden");
      });
    });

    // Execute Payment
    document.getElementById("btn-submit-payment").addEventListener("click", () => {
      this.executePayment();
    });

    // View official receipt button from success screen
    document.getElementById("btn-view-official-receipt").addEventListener("click", () => {
      document.getElementById("payment-success-modal").classList.add("hidden");
      if (this.activePaymentTxn) {
        this.openReceiptModal(this.activePaymentTxn);
      }
    });

    // Print Receipt
    document.getElementById("btn-print-receipt-action").addEventListener("click", () => {
      window.print();
    });

    // Search and filter in Payment History
    const searchHist = document.getElementById("history-search-input");
    const statusHist = document.getElementById("history-filter-status");
    if (searchHist) searchHist.addEventListener("input", () => this.renderPaymentHistory());
    if (statusHist) statusHist.addEventListener("change", () => this.renderPaymentHistory());
  }

  renderPayments() {
    const stats = store.getPaymentStats();

    document.getElementById("pay-total-fees").textContent = `₹${stats.totalFees.toLocaleString()}`;
    document.getElementById("pay-paid-amount").textContent = `₹${stats.paid.toLocaleString()}`;
    document.getElementById("pay-pending-amount").textContent = `₹${stats.pending.toLocaleString()}`;
    document.getElementById("pay-banner-amount").textContent = `₹${stats.pending.toLocaleString()}`;

    const badge = document.getElementById("pay-status-badge");
    const banner = document.getElementById("payment-due-banner");
    const aimlStatus = document.getElementById("row-aiml-status");
    const libStatus = document.getElementById("row-lib-status");

    if (stats.pending === 0) {
      badge.className = "status-badge paid";
      badge.textContent = "Fully Settled ✓";
      if (banner) banner.style.display = "none";
      if (aimlStatus) { aimlStatus.className = "status-badge paid"; aimlStatus.textContent = "Paid"; }
      if (libStatus) { libStatus.className = "status-badge paid"; libStatus.textContent = "Paid"; }
    } else {
      badge.className = "status-badge pending";
      badge.textContent = "Payment Pending";
      if (banner) banner.style.display = "flex";
      if (aimlStatus) { aimlStatus.className = "status-badge pending"; aimlStatus.textContent = "Pending"; }
      if (libStatus) { libStatus.className = "status-badge pending"; libStatus.textContent = "Pending"; }
    }
  }

  openPaymentModal() {
    const stats = store.getPaymentStats();
    if (stats.pending === 0) {
      this.showToast("No outstanding dues to pay! All fees are cleared.", "info");
      return;
    }

    const modal = document.getElementById("payment-modal");
    document.getElementById("modal-pay-amount-display").textContent = `₹${stats.pending.toLocaleString()}`;
    document.querySelector("#btn-submit-payment .btn-text").textContent = `Proceed to Pay ₹${stats.pending.toLocaleString()}`;
    modal.classList.remove("hidden");
  }

  executePayment() {
    const submitBtn = document.getElementById("btn-submit-payment");
    submitBtn.classList.add("is-loading");

    const stats = store.getPaymentStats();
    let methodString = "UPI (Google Pay)";
    if (this.selectedPaymentMethod === "card") methodString = "Debit Card •••• 4444";
    if (this.selectedPaymentMethod === "netbanking") methodString = "HDFC Net Banking";

    setTimeout(() => {
      submitBtn.classList.remove("is-loading");
      document.getElementById("payment-modal").classList.add("hidden");

      const txn = store.processPayment({
        amount: stats.pending,
        method: methodString,
        description: "Semester 5 Elective Add-on & Lab Certification"
      });

      this.activePaymentTxn = txn;

      // Update success modal
      document.getElementById("suc-txn-id").textContent = txn.id;
      document.getElementById("suc-date").textContent = `${txn.date}, ${txn.time}`;
      document.getElementById("suc-amount").textContent = `₹${txn.amount.toLocaleString()}`;
      document.getElementById("suc-method").textContent = txn.paymentMethod;

      document.getElementById("payment-success-modal").classList.remove("hidden");

      // Refresh payments state
      this.renderPayments();
      this.updateNotificationCounters();
    }, 1000);
  }

  renderPaymentHistory() {
    const tbody = document.getElementById("payment-history-table-body");
    if (!tbody) return;

    const txns = store.getTransactions();
    const searchVal = (document.getElementById("history-search-input")?.value || "").trim().toLowerCase();
    const statusVal = document.getElementById("history-filter-status")?.value || "all";

    let filtered = txns;
    if (searchVal) {
      filtered = filtered.filter(t => t.id.toLowerCase().includes(searchVal) || t.description.toLowerCase().includes(searchVal));
    }
    if (statusVal !== "all") {
      filtered = filtered.filter(t => t.status === statusVal);
    }

    tbody.innerHTML = filtered.map(t => `
      <tr>
        <td><strong>${t.id}</strong></td>
        <td>${t.date}<br><span style="font-size: 0.74rem; color: var(--text-muted);">${t.time}</span></td>
        <td>${t.description}</td>
        <td><strong>₹${t.amount.toLocaleString()}</strong></td>
        <td>${t.paymentMethod}</td>
        <td>
          <span class="status-badge ${t.status === 'Paid' ? 'paid' : 'pending'}">${t.status}</span>
        </td>
        <td>
          ${t.status === 'Paid' ? `
            <button class="btn btn-secondary btn-sm btn-view-receipt" data-id="${t.id}">
              Receipt
            </button>
          ` : `
            <button class="btn btn-primary btn-sm btn-pay-pending-row" onclick="app.openPaymentModal()">
              Pay
            </button>
          `}
        </td>
      </tr>
    `).join("");

    tbody.querySelectorAll(".btn-view-receipt").forEach(btn => {
      btn.addEventListener("click", () => {
        const txn = txns.find(t => t.id === btn.dataset.id);
        if (txn) this.openReceiptModal(txn);
      });
    });
  }

  openReceiptModal(txn) {
    const modal = document.getElementById("receipt-modal");
    const container = document.getElementById("official-receipt-render");
    const student = store.getStudentProfile();

    container.innerHTML = `
      <div class="official-receipt">
        <div class="receipt-header">
          <div>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: #4338ca;">Institute of Technology & Advanced Science</h2>
            <div style="font-size: 0.82rem; color: #64748b;">University Office of Financial Services & Accounts</div>
            <div style="font-size: 0.8rem; color: #64748b;">Affiliation: State Technological University</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #15803d;">FEE RECEIPT (VERIFIED)</div>
            <div style="font-size: 1rem; font-weight: 800;">${txn.receiptNumber}</div>
            <div style="font-size: 0.76rem; color: #64748b;">Date: ${txn.date}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem; font-size: 0.88rem; background: #f8fafc; padding: 1rem; border-radius: 8px;">
          <div>
            <div><strong>Student Name:</strong> ${student.name}</div>
            <div><strong>Student Roll No:</strong> ${student.rollNo}</div>
            <div><strong>Department:</strong> ${student.department}</div>
          </div>
          <div>
            <div><strong>Transaction Ref:</strong> ${txn.id}</div>
            <div><strong>Academic Term:</strong> ${txn.academicYear || '2024-2025'}</div>
            <div><strong>Mode:</strong> ${txn.paymentMethod}</div>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.88rem;">
          <thead>
            <tr style="border-bottom: 2px solid #cbd5e1; text-align: left;">
              <th style="padding: 0.5rem 0;">Description</th>
              <th style="padding: 0.5rem 0; text-align: right;">Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            ${(txn.items || [{ name: txn.description, amount: txn.amount }]).map(item => `
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 0.65rem 0;">${item.name}</td>
                <td style="padding: 0.65rem 0; text-align: right;"><strong>₹${item.amount.toLocaleString()}</strong></td>
              </tr>
            `).join("")}
            <tr style="font-size: 1.05rem;">
              <td style="padding: 0.75rem 0; font-weight: 800;">Total Amount Paid</td>
              <td style="padding: 0.75rem 0; text-align: right; font-weight: 800; color: #4338ca;">₹${txn.amount.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 2rem; padding-top: 1rem; border-top: 1px dashed #cbd5e1; font-size: 0.78rem; color: #64748b;">
          <div>
            • This is an electronically generated valid tax fee receipt.<br>
            • Retain this receipt for semester examination hall ticket endorsement.
          </div>
          <div style="text-align: center;">
            <div style="font-weight: 700; color: #0f172a; margin-bottom: 0.25rem;">Finance Officer</div>
            <div>Office of the Bursar</div>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
  }

  // =========================================================================
  // 9. NOTIFICATIONS CENTER
  // =========================================================================
  renderNotifications() {
    const feed = document.getElementById("notifications-feed");
    if (!feed) return;

    const notifs = store.getNotifications();

    document.getElementById("btn-mark-all-read").onclick = () => {
      store.markAllNotificationsRead();
      this.updateNotificationCounters();
      this.renderNotifications();
      this.showToast("All notifications marked as read.", "success");
    };

    feed.innerHTML = notifs.map(n => `
      <div class="notif-card ${n.unread ? 'unread' : ''}" data-id="${n.id}">
        <div class="notif-icon-bubble">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
          </svg>
        </div>
        <div class="notif-content">
          <div class="notif-title-row">
            <span class="notif-title">${n.title}</span>
            <span class="notif-time">${n.time}</span>
          </div>
          <p class="notif-message">${n.message}</p>
        </div>
      </div>
    `).join("");

    feed.querySelectorAll(".notif-card").forEach(card => {
      card.addEventListener("click", () => {
        store.markNotificationRead(card.dataset.id);
        this.updateNotificationCounters();
        this.renderNotifications();
      });
    });
  }

  // =========================================================================
  // 10. STUDENT PROFILE & EDITING
  // =========================================================================
  bindProfileEvents() {
    const editBtn = document.getElementById("btn-edit-profile-trigger");
    const editModal = document.getElementById("edit-profile-modal");
    const editForm = document.getElementById("edit-profile-form");

    if (editBtn) {
      editBtn.addEventListener("click", () => {
        const student = store.getStudentProfile();
        document.getElementById("edit-prof-name").value = student.name;
        document.getElementById("edit-prof-email").value = student.email;
        document.getElementById("edit-prof-phone").value = student.phone;
        document.getElementById("edit-prof-dept").value = student.department;
        document.getElementById("edit-prof-sem").value = student.semester;
        editModal.classList.remove("hidden");
      });
    }

    if (editForm) {
      editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const updated = store.updateStudentProfile({
          name: document.getElementById("edit-prof-name").value.trim(),
          email: document.getElementById("edit-prof-email").value.trim(),
          phone: document.getElementById("edit-prof-phone").value.trim(),
          department: document.getElementById("edit-prof-dept").value,
          semester: document.getElementById("edit-prof-sem").value
        });

        editModal.classList.add("hidden");
        this.loadDashboardData();
        this.renderProfile();
        this.showToast("Student profile successfully updated!", "success");
      });
    }
  }

  renderProfile() {
    const student = store.getStudentProfile();

    document.getElementById("profile-card-name").textContent = student.name;
    document.getElementById("profile-card-dept").textContent = student.department;
    document.getElementById("profile-card-year").textContent = student.year;
    document.getElementById("profile-card-sem").textContent = student.semester;
    document.getElementById("profile-card-avatar").src = student.avatarUrl;

    document.getElementById("prof-disp-rollno").textContent = student.rollNo;
    document.getElementById("prof-disp-id").textContent = student.id;
    document.getElementById("prof-disp-email").textContent = student.email;
    document.getElementById("prof-disp-phone").textContent = student.phone;
    document.getElementById("prof-disp-cgpa").textContent = `${student.cgpa} / 10.0`;
    document.getElementById("prof-disp-advisor").textContent = student.advisor;
    document.getElementById("prof-disp-college").textContent = student.college;

    // Render Academic Certifications Portfolio
    const certsContainer = document.getElementById("profile-certificates-list");
    if (certsContainer) {
      const certs = store.getCertificates();
      if (certs.length === 0) {
        certsContainer.innerHTML = `
          <div style="text-align: center; color: var(--text-muted); padding: 1.5rem 1rem;">
            No official certifications earned yet. Complete course mock exams with ≥ 70% score to receive official university credentials.
            <br>
            <button class="btn btn-primary btn-sm" style="margin-top: 0.85rem;" onclick="app.switchDashboardTab('tests')">
              Browse Mock Examinations →
            </button>
          </div>
        `;
      } else {
        certsContainer.innerHTML = `
          <div class="profile-certs-grid">
            ${certs.map(cert => `
              <div class="profile-cert-card">
                <div class="profile-cert-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2">
                    <circle cx="12" cy="8" r="6"/>
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                  </svg>
                </div>
                <div class="profile-cert-content">
                  <div class="profile-cert-title">${cert.courseTitle} (${cert.courseCode})</div>
                  <div class="profile-cert-meta">
                    Grade: <strong>${cert.grade} (${cert.score}%)</strong> • Issued: ${cert.issueDate} • ${cert.credits} Credits
                  </div>
                  <div class="profile-cert-id">Credential: <code>${cert.id}</code></div>
                </div>
                <button class="btn btn-outline btn-sm btn-prof-cert-view" data-cert="${cert.id}">
                  View Certificate 🎓
                </button>
              </div>
            `).join("")}
          </div>
        `;

        certsContainer.querySelectorAll(".btn-prof-cert-view").forEach(btn => {
          btn.addEventListener("click", () => this.openCertificateModal(btn.dataset.cert));
        });
      }
    }
  }


  // =========================================================================
  // 11. SETTINGS VIEW
  // =========================================================================
  bindSettingsEvents() {
    document.getElementById("btn-set-light-theme").addEventListener("click", () => {
      store.setTheme("light");
      this.showToast("Light theme applied.", "info");
    });

    document.getElementById("btn-set-dark-theme").addEventListener("click", () => {
      store.setTheme("dark");
      this.showToast("Dark theme applied.", "info");
    });

    document.getElementById("btn-save-password").addEventListener("click", () => {
      this.showToast("Password updated successfully!", "success");
    });
  }

  // =========================================================================
  // 12. LEARNING PATHS & SPECIALIZATIONS
  // =========================================================================
  renderLearningPaths() {
    const container = document.getElementById("learning-paths-container");
    if (!container) return;

    const paths = store.getLearningPaths();

    container.innerHTML = paths.map(path => {
      return `
        <div class="path-card" data-path-id="${path.id}">
          
          <!-- Path Header -->
          <div class="path-header" style="background: ${path.gradient};">
            <div class="path-header-info">
              <span class="path-badge">${path.badge}</span>
              <h3 class="path-title">${path.title}</h3>
              <p class="path-desc">${path.description}</p>
              
              <div style="font-size: 0.84rem; margin-bottom: 0.75rem; color: rgba(255,255,255,0.95);">
                <strong>Faculty Lead:</strong> ${path.leadFaculty}
              </div>

              <div class="career-tags-row">
                <span style="font-size: 0.76rem; font-weight: 700; align-self: center; margin-right: 0.25rem;">Target Careers:</span>
                ${path.careerOutcomes.map(c => `<span class="career-tag">${c}</span>`).join("")}
              </div>
            </div>

            <div class="path-header-metrics">
              <div class="path-progress-label">
                <span>Specialization Progress</span>
                <span>${path.progressPercentage}%</span>
              </div>
              <div class="progress-track" style="background: rgba(0,0,0,0.25);">
                <div class="progress-fill" style="background: #ffffff; width: ${path.progressPercentage}%;"></div>
              </div>
              <div style="font-size: 0.76rem; color: rgba(255,255,255,0.85); margin-top: 0.25rem;">
                ${path.completedCredits} of ${path.totalCredits} Track Credits Cleared
              </div>
              <div style="margin-top: 0.75rem;">
                ${path.isEnrolled ? `
                  <button class="btn btn-sm btn-hero-glass btn-full" disabled style="opacity: 0.95; cursor: default;">
                    Enrolled Track ✓
                  </button>
                ` : `
                  <button class="btn btn-sm btn-hero-white btn-full btn-enroll-path" data-id="${path.id}">
                    Enroll in Track
                  </button>
                `}
              </div>
            </div>
          </div>

          <!-- Stepped Milestones Timeline -->
          <div class="path-timeline-container">
            <div class="path-timeline-title">
              <span>Curriculum Milestone Sequence (Semester 1 to Semester 8)</span>
              <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-muted);">Click any course milestone to inspect syllabus</span>
            </div>

            <div class="path-milestones-row">
              ${path.milestones.map(m => {
                const statusClass = m.status.toLowerCase();
                let statusBadge = `<span class="status-badge ${statusClass === 'completed' ? 'completed' : statusClass === 'enrolled' ? 'registered' : statusClass === 'recommended' ? 'in-progress' : 'pending'}">${m.status}</span>`;

                return `
                  <div class="milestone-step ${statusClass}" data-code="${m.code}">
                    <div class="milestone-node">
                      ${statusClass === 'completed' ? '✓' : m.step}
                    </div>
                    <div class="milestone-info" style="cursor: pointer;" onclick="app.handleMilestoneClick('${m.code}')">
                      <div class="milestone-code">
                        <span>${m.code}</span>
                        ${m.grade && m.grade !== '-' ? `<span class="status-badge completed" style="font-size: 0.68rem; padding: 0.1rem 0.35rem;">${m.grade}</span>` : ''}
                      </div>
                      <div class="milestone-title">${m.title}</div>
                      <div class="milestone-meta">
                        <span>${m.semester}</span>
                        <span>${m.credits} Credits</span>
                      </div>
                      <div style="margin-top: 0.35rem;">
                        ${statusBadge}
                      </div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

        </div>
      `;
    }).join("");

    // Bind enroll path button
    container.querySelectorAll(".btn-enroll-path").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        store.enrollInLearningPath(id);
        this.showToast("Successfully enrolled in specialization track!", "success");
        this.renderLearningPaths();
      });
    });

    // AI Advisor recommendation button
    const recBtn = document.getElementById("btn-path-help-advisor");
    if (recBtn) {
      recBtn.onclick = () => {
        window.aiAssistant.toggle(true);
        window.aiAssistant.handleUserQuery("Which learning path track should I choose for my career?");
      };
    }
  }

  handleMilestoneClick(courseCode) {
    const course = store.getCourseById(courseCode);
    if (course) {
      this.openCourseDetailsModal(course.id, "path");
    } else {
      this.showToast(`Milestone ${courseCode} syllabus will unlock in upcoming semester.`, "info");
    }
  }

  // =========================================================================
  // 13. COURSE DETAILS MODAL (Overview, Learning Path, Student Reviews)
  // =========================================================================
  openCourseDetailsModal(courseId, initialTab = "overview") {
    const course = store.getCourseById(courseId);
    if (!course) return;

    this.activeModalCourseId = course.id;
    this.activeModalTab = initialTab;

    const modal = document.getElementById("course-details-modal");
    document.getElementById("modal-c-code").textContent = course.code;
    document.getElementById("modal-c-title").textContent = course.title;

    const reviewCountDisplay = document.getElementById("modal-c-review-count");
    if (reviewCountDisplay) {
      reviewCountDisplay.textContent = course.reviews ? course.reviews.length : (course.reviewCount || 0);
    }

    // Update tab bar active state
    document.querySelectorAll("#course-modal-tab-bar .modal-tab-btn").forEach(btn => {
      if (btn.dataset.tab === this.activeModalTab) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    this.renderCourseModalTabContent(course);

    // Modal action button
    const regActionBtn = document.getElementById("modal-c-register-action");
    const isRegistered = store.getRegisteredCourseIds().includes(course.id);
    if (isRegistered) {
      regActionBtn.textContent = "Already Enrolled ✓";
      regActionBtn.disabled = true;
    } else {
      regActionBtn.textContent = "Add to Registration Selection";
      regActionBtn.disabled = false;
      regActionBtn.onclick = () => {
        this.toggleCourseInCart(course.id);
        modal.classList.add("hidden");
        this.switchDashboardTab("registration");
      };
    }

    modal.classList.remove("hidden");
  }

  renderCourseModalTabContent(course) {
    const body = document.getElementById("modal-c-body");
    if (!body) return;

    if (this.activeModalTab === "overview") {
      // TAB 1: OVERVIEW & SYLLABUS
      body.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--primary-600); text-transform: uppercase;">
            ${course.departmentName} • ${course.type} Course
          </div>
          <p style="font-size: 0.95rem; color: var(--text-main); margin-top: 0.35rem; line-height: 1.5;">
            ${course.description}
          </p>
        </div>

        <div class="course-metrics-row" style="margin-bottom: 1.5rem;">
          <div class="metric-item">
            <span class="metric-val">${course.credits}</span>
            <span class="metric-lbl">Credits</span>
          </div>
          <div class="metric-item">
            <span class="metric-val">${course.duration}</span>
            <span class="metric-lbl">Duration</span>
          </div>
          <div class="metric-item">
            <span class="metric-val">⭐ ${course.rating}</span>
            <span class="metric-lbl">Student Rating</span>
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem;">Course Prerequisites</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${course.prerequisites.map(p => `
              <span style="background: var(--bg-surface-subtle); border: 1px solid var(--border-subtle); padding: 0.25rem 0.65rem; border-radius: 6px; font-size: 0.82rem; font-weight: 600;">
                ${p}
              </span>
            `).join("")}
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem;">Core Syllabus Modules</h4>
          <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
            ${course.syllabus.map(mod => `<li>${mod}</li>`).join("")}
          </ul>
        </div>

        <div class="receipt-meta-box">
          <div style="display: flex; justify-content: space-between;">
            <span>Classroom / Lab:</span>
            <strong>${course.classroom}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Weekly Schedule:</span>
            <strong>${course.schedule}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Course Fee:</span>
            <strong style="color: var(--primary-700);">₹${course.fee.toLocaleString()}</strong>
          </div>
        </div>
      `;
    } else if (this.activeModalTab === "path") {
      // TAB 2: LEARNING PATH POSITION
      const path = store.getLearningPathById(course.pathId) || store.getLearningPaths()[0];
      
      body.innerHTML = `
        <div style="background: var(--bg-surface-subtle); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.5rem; border-left: 4px solid var(--primary-600);">
          <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--primary-600); letter-spacing: 0.04em;">
            Academic Track Specialization
          </div>
          <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main); margin: 0.25rem 0 0.5rem 0;">
            ${path.title}
          </h4>
          <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.45;">
            This subject is <strong>${course.pathMilestone || 'a foundational milestone'}</strong> in the curriculum sequence.
          </p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.75rem;">Curriculum Milestone Pathway</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${path.milestones.map(m => {
              const isCurrent = m.code === course.code;
              return `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1.5px solid ${isCurrent ? 'var(--primary-600)' : 'var(--border-subtle)'}; background: ${isCurrent ? 'var(--primary-50)' : 'var(--bg-surface)'};">
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span class="milestone-node" style="width: 28px; height: 28px; font-size: 0.75rem; margin-bottom: 0; background: ${isCurrent ? 'var(--primary-600)' : 'var(--bg-surface-subtle)'}; color: ${isCurrent ? '#ffffff' : 'var(--text-muted)'};">
                      ${m.step}
                    </span>
                    <div>
                      <strong style="font-size: 0.88rem; color: var(--text-main);">${m.code}: ${m.title}</strong>
                      <div style="font-size: 0.74rem; color: var(--text-muted);">${m.semester} • ${m.credits} Credits</div>
                    </div>
                  </div>
                  <div>
                    <span class="status-badge ${m.status === 'Completed' ? 'completed' : m.status === 'Enrolled' ? 'registered' : 'pending'}">
                      ${isCurrent ? '📍 This Course' : m.status}
                    </span>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <div style="text-align: center; margin-top: 1.5rem;">
          <button type="button" class="btn btn-outline" id="btn-view-full-path-roadmaps">
            Explore All 4 Learning Path Roadmaps →
          </button>
        </div>
      `;

      const viewRoadmapBtn = document.getElementById("btn-view-full-path-roadmaps");
      if (viewRoadmapBtn) {
        viewRoadmapBtn.onclick = () => {
          document.getElementById("course-details-modal").classList.add("hidden");
          this.switchDashboardTab("paths");
        };
      }

    } else if (this.activeModalTab === "reviews") {
      // TAB 3: STUDENT REVIEWS & RATINGS
      const reviews = course.reviews || [];
      const totalReviews = reviews.length;
      const breakdown = course.ratingBreakdown || { 5: 75, 4: 18, 3: 5, 2: 1, 1: 1 };

      body.innerHTML = `
        <!-- Ratings Summary Box -->
        <div class="reviews-summary-box">
          <div class="overall-score-wrap">
            <div class="overall-score-big">${course.rating}</div>
            <div class="stars-row">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <div class="total-reviews-caption">Based on ${totalReviews} verified student reviews</div>
            <button type="button" class="btn btn-primary btn-sm" id="btn-open-review-from-tab" style="margin-top: 0.85rem; width: 100%;">
              ⭐ Write Review
            </button>
          </div>

          <div class="rating-breakdown-list">
            ${[5, 4, 3, 2, 1].map(stars => {
              const count = breakdown[stars] || 0;
              return `
                <div class="rating-bar-row">
                  <span style="min-width: 45px;">${stars} ★</span>
                  <div class="rating-bar-track">
                    <div class="rating-bar-fill" style="width: ${count}%;"></div>
                  </div>
                  <span style="min-width: 35px; text-align: right;">${count}%</span>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Student Reviews List -->
        <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
          <h4 style="font-size: 1rem; font-weight: 700;">Student Reviews & Lab Advice (${reviews.length})</h4>
          <span style="font-size: 0.78rem; color: var(--text-muted);">Verified Enrolled Students</span>
        </div>

        <div class="reviews-list" id="modal-reviews-list">
          ${reviews.length === 0 ? `
            <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
              No reviews yet. Be the first to share your experience!
            </div>
          ` : reviews.map(r => `
            <div class="review-item" data-rev-id="${r.id}">
              <div class="review-item-header">
                <div class="reviewer-profile-wrap">
                  <img class="reviewer-avatar" src="${r.avatar}" alt="${r.studentName}" />
                  <div>
                    <div class="reviewer-name">
                      ${r.studentName}
                      ${r.verified ? '<span class="verified-badge">✓ Verified Student</span>' : ''}
                    </div>
                    <div class="reviewer-sub">${r.rollNo} • ${r.batch}</div>
                  </div>
                </div>
                <div class="review-meta-pills">
                  <span class="difficulty-pill ${(r.difficulty || 'Moderate').toLowerCase()}">Difficulty: ${r.difficulty}</span>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <div style="color: #f59e0b; font-size: 0.95rem;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
                <span style="font-size: 0.78rem; color: var(--text-light);">Reviewed on ${r.date}</span>
                <span style="font-size: 0.78rem; color: var(--text-muted); margin-left: auto;">Instructor Rating: <strong>${r.instructorRating || 5}/5</strong></span>
              </div>

              <p class="review-comment-text">${r.comment}</p>

              <div class="review-footer-row">
                <span>Was this review helpful?</span>
                <button type="button" class="btn-helpful" data-course-id="${course.id}" data-rev-id="${r.id}">
                  <span>👍 Helpful</span>
                  <strong class="helpful-counter">${r.helpfulCount || 1}</strong>
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      `;

      // Bind helpful buttons
      body.querySelectorAll(".btn-helpful").forEach(btn => {
        btn.addEventListener("click", () => {
          const cId = btn.dataset.courseId;
          const rId = btn.dataset.revId;
          const updated = store.likeReview(cId, rId);
          if (updated) {
            btn.querySelector(".helpful-counter").textContent = updated;
            btn.style.borderColor = "var(--primary-600)";
            btn.style.color = "var(--primary-700)";
          }
        });
      });

      const writeBtnFromTab = document.getElementById("btn-open-review-from-tab");
      if (writeBtnFromTab) {
        writeBtnFromTab.onclick = () => this.openWriteReviewModal(course.id);
      }
    }
  }

  // =========================================================================
  // 14. STUDENT REVIEWS SYSTEM & FORM
  // =========================================================================
  bindReviewEvents() {
    // Modal tab switches
    document.querySelectorAll("#course-modal-tab-bar .modal-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        this.activeModalTab = tab;
        document.querySelectorAll("#course-modal-tab-bar .modal-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        if (this.activeModalCourseId) {
          const course = store.getCourseById(this.activeModalCourseId);
          if (course) this.renderCourseModalTabContent(course);
        }
      });
    });

    // Write review button inside footer
    const footerWriteBtn = document.getElementById("btn-modal-open-write-review");
    if (footerWriteBtn) {
      footerWriteBtn.addEventListener("click", () => {
        this.openWriteReviewModal(this.activeModalCourseId);
      });
    }

    // Star rating picker in Write Review modal
    const starPicker = document.getElementById("review-star-picker");
    if (starPicker) {
      const starItems = starPicker.querySelectorAll(".star-pick-item");
      const hiddenInput = document.getElementById("review-rating-value");
      const label = document.getElementById("star-picker-label");

      const ratingDescriptions = {
        1: "1.0 - Poor / Needs Improvement",
        2: "2.0 - Fair",
        3: "3.0 - Good Course",
        4: "4.0 - Very Good",
        5: "5.0 - Outstanding / Highly Recommended"
      };

      starItems.forEach(star => {
        star.addEventListener("click", () => {
          const val = Number(star.dataset.val);
          hiddenInput.value = val;
          starPicker.dataset.rating = val;
          if (label) label.textContent = ratingDescriptions[val];

          starItems.forEach(s => {
            if (Number(s.dataset.val) <= val) {
              s.classList.add("active");
            } else {
              s.classList.remove("active");
            }
          });
        });

        star.addEventListener("mouseenter", () => {
          const val = Number(star.dataset.val);
          starItems.forEach(s => {
            s.style.color = Number(s.dataset.val) <= val ? "#f59e0b" : "#cbd5e1";
          });
        });
      });

      starPicker.addEventListener("mouseleave", () => {
        const currentVal = Number(hiddenInput.value);
        starItems.forEach(s => {
          s.style.color = Number(s.dataset.val) <= currentVal ? "#f59e0b" : "#cbd5e1";
        });
      });
    }

    // Review form submission
    const reviewForm = document.getElementById("write-review-form");
    if (reviewForm) {
      reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const courseId = document.getElementById("review-course-select").value;
        const rating = Number(document.getElementById("review-rating-value").value);
        const difficulty = document.getElementById("review-difficulty").value;
        const instructorRating = Number(document.getElementById("review-instructor-rating").value);
        const comment = document.getElementById("review-comment").value.trim();
        const isAnonymous = document.getElementById("review-anonymous").checked;

        if (!comment || comment.length < 15) {
          this.showToast("Please write at least 15 characters of advice.", "warning");
          return;
        }

        const submitBtn = document.getElementById("btn-submit-review");
        submitBtn.classList.add("is-loading");

        setTimeout(() => {
          try {
            store.addCourseReview(courseId, {
              rating,
              difficulty,
              instructorRating,
              comment,
              isAnonymous
            });

            submitBtn.classList.remove("is-loading");
            document.getElementById("write-review-modal").classList.add("hidden");
            this.showToast("Your review has been verified and published! ⭐", "success");

            // Refresh views
            this.renderBrowseCourses();
            if (this.activeModalCourseId === courseId) {
              const updatedCourse = store.getCourseById(courseId);
              this.activeModalTab = "reviews";
              this.renderCourseModalTabContent(updatedCourse);
            }
          } catch (err) {
            submitBtn.classList.remove("is-loading");
            this.showToast(err.message, "error");
          }
        }, 700);
      });
    }
  }

  openWriteReviewModal(preselectedCourseId) {
    const modal = document.getElementById("write-review-modal");
    const select = document.getElementById("review-course-select");
    const allCourses = store.getAllCourses();

    select.innerHTML = allCourses.map(c => `
      <option value="${c.id}" ${c.id === preselectedCourseId ? 'selected' : ''}>
        ${c.code}: ${c.title} (${c.instructor})
      </option>
    `).join("");

    // Reset fields
    document.getElementById("review-comment").value = "";
    document.getElementById("review-anonymous").checked = false;

    modal.classList.remove("hidden");
  }

  // =========================================================================
  // 13. UNIVERSAL MODALS HANDLING
  // =========================================================================
  bindModalEvents() {
    // Backdrop click close & close button close
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          backdrop.classList.add("hidden");
        }
      });
    });

    document.querySelectorAll("[data-close]").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.close;
        const targetModal = document.getElementById(targetId);
        if (targetModal) targetModal.classList.add("hidden");
      });
    });

    // Escape key closes open modals
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.add("hidden"));
      }
    });
  }

  // =========================================================================
  // 14. TOAST NOTIFICATION SYSTEM
  // =========================================================================
  showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let iconSvg = "";
    if (type === "success") {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else if (type === "error") {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    } else if (type === "warning") {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      <div style="min-width: 20px;">${iconSvg}</div>
      <div style="flex: 1; font-size: 0.88rem; font-weight: 500; color: var(--text-main);">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 350);
    }, 3800);
  }

  // =========================================================================
  // 15. ACADEMIC MOCK TESTS & ASSESSMENTS
  // =========================================================================
  bindMockTestEvents() {
    // Start Exam button in Briefing View
    const btnStart = document.getElementById("btn-start-exam-now");
    if (btnStart) {
      btnStart.addEventListener("click", () => this.startActiveTest());
    }

    // Quit Exam button
    const btnQuit = document.getElementById("btn-quit-test");
    if (btnQuit) {
      btnQuit.addEventListener("click", () => {
        if (confirm("Are you sure you want to exit the examination? Your progress in this attempt will be lost.")) {
          this.stopTestTimer();
          document.getElementById("mock-test-modal").classList.add("hidden");
        }
      });
    }

    // Next / Prev question buttons
    const btnPrev = document.getElementById("btn-prev-question");
    if (btnPrev) {
      btnPrev.addEventListener("click", () => this.navigateTestQuestion(-1));
    }

    const btnNext = document.getElementById("btn-next-question");
    if (btnNext) {
      btnNext.addEventListener("click", () => this.navigateTestQuestion(1));
    }

    // Flag question button
    const btnFlag = document.getElementById("btn-flag-question");
    if (btnFlag) {
      btnFlag.addEventListener("click", () => this.toggleFlagTestQuestion());
    }

    // Final submit button
    const btnSubmit = document.getElementById("btn-submit-exam-final");
    if (btnSubmit) {
      btnSubmit.addEventListener("click", () => this.submitMockTest(false));
    }

    // Retake exam button in results view
    const btnRetake = document.getElementById("btn-retake-exam");
    if (btnRetake) {
      btnRetake.addEventListener("click", () => {
        if (this.activeTestCourseId) {
          this.openMockTestModal(this.activeTestCourseId);
        }
      });
    }

    // View certificate from results view
    const btnViewCert = document.getElementById("btn-view-certificate-from-result");
    if (btnViewCert) {
      btnViewCert.addEventListener("click", () => {
        document.getElementById("mock-test-modal").classList.add("hidden");
        if (this.activeTestCourseId) {
          this.openCertificateModal(this.activeTestCourseId);
        }
      });
    }

    // Filter tabs in Mock Tests catalog
    const filterTabs = document.querySelectorAll(".test-filter-btn");
    filterTabs.forEach(btn => {
      btn.addEventListener("click", () => {
        filterTabs.forEach(b => {
          b.classList.remove("active");
          b.classList.remove("btn-primary");
          b.classList.add("btn-outline");
        });
        btn.classList.add("active");
        btn.classList.add("btn-primary");
        btn.classList.remove("btn-outline");

        this.activeTestFilter = btn.dataset.filter;
        this.renderMockTestCards();
      });
    });
  }

  renderMockTests() {
    const registered = store.getRegisteredCourses();
    const completed = store.getCompletedCourses();
    const certificates = store.getCertificates();

    // Update top metric strip
    const elEnrolled = document.getElementById("tests-stat-enrolled");
    if (elEnrolled) elEnrolled.textContent = registered.length;

    const elCompleted = document.getElementById("tests-stat-completed");
    if (elCompleted) elCompleted.textContent = completed.length;

    const elCerts = document.getElementById("tests-stat-certs");
    if (elCerts) elCerts.textContent = certificates.length;

    const badgeCerts = document.getElementById("tests-certs-count-badge");
    if (badgeCerts) badgeCerts.textContent = certificates.length;

    const headerCerts = document.getElementById("tests-certs-header-count");
    if (headerCerts) headerCerts.textContent = `${certificates.length} Verified Credential${certificates.length === 1 ? '' : 's'}`;

    const elAvgScore = document.getElementById("tests-stat-avg-score");
    if (elAvgScore) {
      if (completed.length === 0) {
        elAvgScore.textContent = "-";
      } else {
        const avg = Math.round(completed.reduce((sum, c) => sum + (c.score || 85), 0) / completed.length);
        elAvgScore.textContent = `${avg}%`;
      }
    }

    // Render Certificates Gallery
    this.renderCertificatesGallery();

    // Render Mock Tests Grid
    this.renderMockTestCards();
  }

  renderCertificatesGallery() {
    const container = document.getElementById("tests-certificates-container");
    if (!container) return;

    const certificates = store.getCertificates();
    if (certificates.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🎓</div>
          <strong>No Certificates Earned Yet</strong>
          <p style="font-size: 0.85rem; margin-top: 0.35rem;">
            Take any course mock examination below and score 70% or higher to earn your official verifiable credential!
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = certificates.map(cert => `
      <div class="certificate-thumb-card">
        <div class="cert-thumb-ribbon">VERIFIED CREDENTIAL</div>
        <div class="cert-thumb-body">
          <div class="cert-thumb-crest">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <h4 class="cert-thumb-title">${cert.courseTitle}</h4>
          <div class="cert-thumb-code">${cert.courseCode} • ${cert.credits} Academic Credits</div>
          <div class="cert-thumb-meta">
            <span>Student: <strong>${cert.studentName}</strong></span>
            <span class="cert-grade-badge">Grade ${cert.grade} (${cert.score}%)</span>
          </div>
          <div class="cert-thumb-id">ID: <code>${cert.id}</code></div>
          <div class="cert-thumb-date">Issued on ${cert.issueDate}</div>
        </div>
        <div class="cert-thumb-footer">
          <button type="button" class="btn btn-sm btn-primary btn-view-cert-card" data-cert="${cert.id}">
            View & Print 🎓
          </button>
          <button type="button" class="btn btn-sm btn-outline btn-dl-cert-png" data-cert="${cert.id}">
            Download PNG
          </button>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".btn-view-cert-card").forEach(btn => {
      btn.addEventListener("click", () => this.openCertificateModal(btn.dataset.cert));
    });

    container.querySelectorAll(".btn-dl-cert-png").forEach(btn => {
      btn.addEventListener("click", () => {
        this.openCertificateModal(btn.dataset.cert);
        this.downloadCertificatePNG();
      });
    });
  }

  renderMockTestCards() {
    const grid = document.getElementById("mock-tests-cards-grid");
    if (!grid) return;

    const allCourses = store.getAllCourses();
    const registeredIds = store.getRegisteredCourseIds();
    const completedCourses = store.getCompletedCourses();
    const filter = this.activeTestFilter || "all";

    let filteredCourses = allCourses;
    if (filter === "enrolled") {
      filteredCourses = allCourses.filter(c => registeredIds.includes(c.id));
    } else if (filter === "completed") {
      filteredCourses = allCourses.filter(c => store.isCourseCompleted(c.id));
    }

    if (filteredCourses.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          No examinations match the selected filter.
        </div>
      `;
      return;
    }

    grid.innerHTML = filteredCourses.map(course => {
      const isEnrolled = registeredIds.includes(course.id);
      const isCompleted = store.isCourseCompleted(course.id);
      const completedInfo = store.getCompletedCourse(course.id);
      const cert = store.getCertificateForCourse(course.id);
      const latestAttempt = store.getLatestAttempt(course.id);

      let statusBadge = "";
      if (isCompleted) {
        statusBadge = `<span class="test-status-badge passed">✓ Completed • Grade ${completedInfo ? completedInfo.grade : 'A+'} (${completedInfo ? completedInfo.score : 90}%)</span>`;
      } else if (latestAttempt && !latestAttempt.passed) {
        statusBadge = `<span class="test-status-badge failed">Score: ${latestAttempt.percentage}% • Retake Available</span>`;
      } else if (isEnrolled) {
        statusBadge = `<span class="test-status-badge enrolled">Enrolled • Ready for Exam</span>`;
      } else {
        statusBadge = `<span class="test-status-badge practice">Catalog Practice Test</span>`;
      }

      const certActionBtn = isCompleted && cert
        ? `<button class="btn btn-outline btn-sm btn-card-view-cert" data-cert="${cert.id}" style="border-color: #f59e0b; color: #d97706; background: rgba(245, 158, 11, 0.08); font-weight: 600;">
             🎓 View Certificate
           </button>`
        : '';

      const testBtnText = isCompleted ? "Retake Test" : (latestAttempt ? "Retake Exam" : "Start Mock Test →");

      return `
        <div class="mock-test-card ${isCompleted ? 'is-completed' : ''}">
          <div class="test-card-header">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <span class="course-code-tag">${course.code}</span>
              <span class="badge badge-subtle">${course.departmentName}</span>
            </div>
            <h4 class="test-card-title">${course.title}</h4>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem;">
              Instructor: <strong>${course.instructor}</strong>
            </div>
          </div>

          <div class="test-card-specs">
            <div class="spec-pill"><span>📝</span> 5 Questions</div>
            <div class="spec-pill"><span>⏱️</span> 10 Mins</div>
            <div class="spec-pill"><span>🎯</span> 70% Pass Mark</div>
            <div class="spec-pill"><span>⚡</span> ${course.credits} Credits</div>
          </div>

          <div style="margin: 0.85rem 0 1.25rem;">
            ${statusBadge}
          </div>

          <div class="test-card-footer">
            ${certActionBtn}
            <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} btn-sm btn-launch-test" data-id="${course.id}" style="flex: 1;">
              ${testBtnText}
            </button>
          </div>
        </div>
      `;
    }).join("");

    grid.querySelectorAll(".btn-launch-test").forEach(btn => {
      btn.addEventListener("click", () => this.openMockTestModal(btn.dataset.id));
    });

    grid.querySelectorAll(".btn-card-view-cert").forEach(btn => {
      btn.addEventListener("click", () => this.openCertificateModal(btn.dataset.cert));
    });
  }

  // --- Interactive Test Runner Lifecycle ---
  openMockTestModal(courseId) {
    this.activeTestCourseId = courseId;
    const course = store.getCourseById(courseId);
    const testData = store.getMockTestForCourse(courseId) || store.getMockTests().AIML301;

    // Reset Views
    document.getElementById("test-briefing-view").classList.remove("hidden");
    document.getElementById("test-active-view").classList.add("hidden");
    document.getElementById("test-results-view").classList.add("hidden");

    // Populate Briefing view
    document.getElementById("briefing-course-title").textContent = `${course ? course.title : courseId} Examination`;
    document.getElementById("briefing-course-code").textContent = `${course ? course.code : courseId} • ${course ? course.credits : 4} Academic Credits • Department of ${course ? course.departmentName : 'Engineering'}`;
    document.getElementById("briefing-test-description").textContent = testData.description || "Comprehensive university course evaluation covering theoretical principles and practical problem solving.";

    // Open Modal
    document.getElementById("mock-test-modal").classList.remove("hidden");
  }

  startActiveTest() {
    const courseId = this.activeTestCourseId;
    const course = store.getCourseById(courseId);
    const testData = store.getMockTestForCourse(courseId) || store.getMockTests().AIML301;

    // Initialize Active State
    this.activeTestState = {
      courseId: courseId,
      course: course,
      testData: testData,
      currentQuestionIndex: 0,
      userAnswers: {},
      flaggedQuestions: new Set(),
      timeRemaining: (testData.durationMinutes || 10) * 60,
      timerInterval: null
    };

    // Switch View
    document.getElementById("test-briefing-view").classList.add("hidden");
    document.getElementById("test-active-view").classList.remove("hidden");
    document.getElementById("test-results-view").classList.add("hidden");

    // Set Header
    document.getElementById("active-test-code").textContent = course ? course.code : courseId;
    document.getElementById("active-test-title").textContent = course ? course.title : testData.title;

    // Start Countdown Timer
    this.startTestTimer();

    // Render First Question
    this.renderActiveQuestion();
  }

  startTestTimer() {
    this.stopTestTimer();
    const timerDisplay = document.getElementById("test-timer-countdown");
    const timerPill = document.getElementById("test-timer-pill");

    const updateTimer = () => {
      if (!this.activeTestState) return;

      const seconds = this.activeTestState.timeRemaining;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      if (timerDisplay) timerDisplay.textContent = formatted;

      if (seconds <= 120) {
        if (timerPill) timerPill.classList.add("urgent");
      } else {
        if (timerPill) timerPill.classList.remove("urgent");
      }

      if (seconds <= 0) {
        this.stopTestTimer();
        this.showToast("Time has expired! Submitting your examination answers...", "warning");
        this.submitMockTest(true);
      } else {
        this.activeTestState.timeRemaining--;
      }
    };

    updateTimer();
    this.activeTestState.timerInterval = setInterval(updateTimer, 1000);
  }

  stopTestTimer() {
    if (this.activeTestState && this.activeTestState.timerInterval) {
      clearInterval(this.activeTestState.timerInterval);
      this.activeTestState.timerInterval = null;
    }
  }

  renderActiveQuestion() {
    if (!this.activeTestState) return;
    const { currentQuestionIndex, testData, userAnswers, flaggedQuestions } = this.activeTestState;
    const total = testData.questions.length;
    const currentQ = testData.questions[currentQuestionIndex];

    // Update Progress Indicator
    document.getElementById("test-question-indicator").textContent = `Question ${currentQuestionIndex + 1} of ${total}`;
    const answeredCount = Object.keys(userAnswers).length;
    const percentDone = Math.round((answeredCount / total) * 100);
    document.getElementById("test-progress-percentage").textContent = `${percentDone}% Answered (${answeredCount}/${total})`;
    document.getElementById("test-progress-bar").style.width = `${((currentQuestionIndex + 1) / total) * 100}%`;

    // Render Question Palette Pills
    const palette = document.getElementById("test-palette-container");
    palette.innerHTML = testData.questions.map((q, idx) => {
      const isCurrent = idx === currentQuestionIndex;
      const isAnswered = userAnswers[idx] !== undefined;
      const isFlagged = flaggedQuestions.has(idx);

      let classes = "palette-pill";
      if (isCurrent) classes += " active";
      if (isAnswered) classes += " answered";
      if (isFlagged) classes += " flagged";

      return `
        <button type="button" class="${classes}" data-index="${idx}" title="Question ${idx + 1}${isFlagged ? ' (Flagged)' : ''}">
          ${idx + 1}${isFlagged ? '<span class="palette-flag-dot">★</span>' : ''}
        </button>
      `;
    }).join("");

    palette.querySelectorAll(".palette-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        this.activeTestState.currentQuestionIndex = parseInt(btn.dataset.index, 10);
        this.renderActiveQuestion();
      });
    });

    // Render Question Content
    const qContainer = document.getElementById("test-question-container");
    const selectedOption = userAnswers[currentQuestionIndex];

    qContainer.innerHTML = `
      <div class="question-header-row">
        <span class="badge badge-purple">${currentQ.topic || 'Core Subject'}</span>
        <span style="font-size: 0.8rem; color: var(--text-muted);">Points: 20</span>
      </div>
      <h3 class="test-question-text">${currentQ.question}</h3>

      <div class="test-options-list">
        ${currentQ.options.map((opt, optIdx) => {
          const isSelected = selectedOption === optIdx;
          const letter = String.fromCharCode(65 + optIdx);
          return `
            <div class="test-option-card ${isSelected ? 'selected' : ''}" data-option="${optIdx}">
              <div class="option-letter-badge">${letter}</div>
              <div class="option-text">${opt}</div>
              <div class="option-radio-circle"></div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    qContainer.querySelectorAll(".test-option-card").forEach(card => {
      card.addEventListener("click", () => {
        const optIdx = parseInt(card.dataset.option, 10);
        this.selectTestOption(optIdx);
      });
    });

    // Update Nav Buttons
    const btnPrev = document.getElementById("btn-prev-question");
    btnPrev.disabled = currentQuestionIndex === 0;

    const btnNext = document.getElementById("btn-next-question");
    const btnSubmit = document.getElementById("btn-submit-exam-final");

    if (currentQuestionIndex === total - 1) {
      btnNext.classList.add("hidden");
      btnSubmit.classList.remove("hidden");
    } else {
      btnNext.classList.remove("hidden");
      btnSubmit.classList.add("hidden");
    }

    // Update Flag Button
    const flagBtnText = document.getElementById("flag-btn-text");
    const btnFlag = document.getElementById("btn-flag-question");
    if (flagBtnText && btnFlag) {
      if (flaggedQuestions.has(currentQuestionIndex)) {
        flagBtnText.textContent = "Unflag Question";
        btnFlag.classList.add("flagged");
      } else {
        flagBtnText.textContent = "Flag for Review";
        btnFlag.classList.remove("flagged");
      }
    }
  }

  selectTestOption(optIdx) {
    if (!this.activeTestState) return;
    this.activeTestState.userAnswers[this.activeTestState.currentQuestionIndex] = optIdx;
    this.renderActiveQuestion();
  }

  navigateTestQuestion(delta) {
    if (!this.activeTestState) return;
    const newIdx = this.activeTestState.currentQuestionIndex + delta;
    const total = this.activeTestState.testData.questions.length;
    if (newIdx >= 0 && newIdx < total) {
      this.activeTestState.currentQuestionIndex = newIdx;
      this.renderActiveQuestion();
    }
  }

  toggleFlagTestQuestion() {
    if (!this.activeTestState) return;
    const idx = this.activeTestState.currentQuestionIndex;
    if (this.activeTestState.flaggedQuestions.has(idx)) {
      this.activeTestState.flaggedQuestions.delete(idx);
    } else {
      this.activeTestState.flaggedQuestions.add(idx);
    }
    this.renderActiveQuestion();
  }

  submitMockTest(isAuto = false) {
    if (!this.activeTestState) return;
    const { testData, userAnswers, timeRemaining, courseId } = this.activeTestState;
    const total = testData.questions.length;
    const answeredCount = Object.keys(userAnswers).length;

    // Check unanswered if manual submit
    if (!isAuto && answeredCount < total) {
      const unanswered = total - answeredCount;
      if (!confirm(`You have ${unanswered} unanswered question${unanswered === 1 ? '' : 's'}. Are you sure you want to finish and submit the exam?`)) {
        return;
      }
    }

    // Stop Timer
    this.stopTestTimer();

    // Calculate Scores
    let correctCount = 0;
    testData.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / total) * 100);
    let grade = "F";
    if (percentage >= 95) grade = "A+";
    else if (percentage >= 85) grade = "A";
    else if (percentage >= 75) grade = "B+";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";

    const passed = percentage >= (testData.passingPercentage || 70);
    const initialDuration = (testData.durationMinutes || 10) * 60;
    const timeSpent = Math.max(10, initialDuration - timeRemaining);

    // Save Attempt & Issue Certificate via store
    const { attempt, certificate } = store.saveTestAttempt(courseId, {
      answers: userAnswers,
      score: percentage,
      percentage,
      passed,
      grade,
      timeSpent,
      totalQuestions: total
    });

    // Display Results View
    this.renderTestResults(attempt, certificate);

    // Refresh UI components
    this.renderMockTests();
    this.renderMyCourses();
    this.renderDashboardHome();
  }

  renderTestResults(attempt, certificate) {
    // Switch View
    document.getElementById("test-briefing-view").classList.add("hidden");
    document.getElementById("test-active-view").classList.add("hidden");
    document.getElementById("test-results-view").classList.remove("hidden");

    const course = store.getCourseById(attempt.courseId);
    const passed = attempt.passed;
    const testData = this.activeTestState ? this.activeTestState.testData : store.getMockTestForCourse(attempt.courseId);

    const bannerContainer = document.getElementById("test-score-banner");
    const certBtn = document.getElementById("btn-view-certificate-from-result");

    const mins = Math.floor(attempt.timeSpent / 60);
    const secs = attempt.timeSpent % 60;
    const timeStr = `${mins}m ${secs}s`;

    if (passed) {
      if (certBtn) certBtn.classList.remove("hidden");

      bannerContainer.innerHTML = `
        <div class="result-celebration-badge">
          <div class="celebration-icon">🎉</div>
          <h3>EXAMINATION PASSED WITH HONORS!</h3>
          <p>You met the academic passing requirements for <strong>${course ? course.title : attempt.courseId}</strong>.</p>
        </div>

        <div class="result-stats-row">
          <div class="result-stat-box">
            <div class="stat-number score-green">${attempt.percentage}%</div>
            <div class="stat-label">Final Evaluation Score</div>
          </div>
          <div class="result-stat-box">
            <div class="stat-number score-green">Grade ${attempt.grade}</div>
            <div class="stat-label">Academic Standing</div>
          </div>
          <div class="result-stat-box">
            <div class="stat-number">${attempt.score >= 70 ? Math.round(attempt.totalQuestions * (attempt.score / 100)) : 0} / ${attempt.totalQuestions}</div>
            <div class="stat-label">Correct Questions</div>
          </div>
          <div class="result-stat-box">
            <div class="stat-number">${timeStr}</div>
            <div class="stat-label">Time Elapsed</div>
          </div>
        </div>

        <div class="cert-congrats-card">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="font-size: 2.5rem;">📜</div>
            <div>
              <strong style="color: #92400e; font-size: 1.05rem;">Official Course Certificate Issued!</strong>
              <div style="font-size: 0.82rem; color: #78350f; margin-top: 0.2rem;">
                Credential ID: <code>${certificate ? certificate.id : 'VERIFIED'}</code> • Added to your student transcript.
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-primary btn-sm" onclick="app.openCertificateModal('${attempt.courseId}')">
            View Certificate 🎓
          </button>
        </div>
      `;
    } else {
      if (certBtn) certBtn.classList.add("hidden");

      bannerContainer.innerHTML = `
        <div class="result-celebration-badge failed">
          <div class="celebration-icon">📘</div>
          <h3>EXAMINATION ATTEMPT COMPLETED</h3>
          <p>You scored <strong>${attempt.percentage}%</strong>. The passing cutoff for certification is 70%.</p>
        </div>

        <div class="result-stats-row">
          <div class="result-stat-box">
            <div class="stat-number score-amber">${attempt.percentage}%</div>
            <div class="stat-label">Final Evaluation Score</div>
          </div>
          <div class="result-stat-box">
            <div class="stat-number score-amber">Grade ${attempt.grade}</div>
            <div class="stat-label">Academic Standing</div>
          </div>
          <div class="result-stat-box">
            <div class="stat-number">${Math.round(attempt.totalQuestions * (attempt.score / 100))} / ${attempt.totalQuestions}</div>
            <div class="stat-label">Correct Questions</div>
          </div>
          <div class="result-stat-box">
            <div class="stat-number">${timeStr}</div>
            <div class="stat-label">Time Elapsed</div>
          </div>
        </div>

        <div class="cert-congrats-card failed">
          <div>
            <strong>Ready to improve your score?</strong>
            <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">
              Review the detailed question explanations below and retake the test anytime to unlock your credential.
            </div>
          </div>
          <button type="button" class="btn btn-primary btn-sm" onclick="app.openMockTestModal('${attempt.courseId}')">
            Retake Exam 🔄
          </button>
        </div>
      `;
    }

    // Render Detailed Solutions & Rationales
    const reviewList = document.getElementById("test-solutions-review");
    if (reviewList && testData) {
      reviewList.innerHTML = testData.questions.map((q, idx) => {
        const studentAns = attempt.answers[idx];
        const isCorrect = studentAns === q.correctIndex;
        const studentAnsText = studentAns !== undefined ? `${String.fromCharCode(65 + studentAns)}. ${q.options[studentAns]}` : "Not Answered";
        const correctAnsText = `${String.fromCharCode(65 + q.correctIndex)}. ${q.options[q.correctIndex]}`;

        return `
          <div class="solution-card ${isCorrect ? 'is-correct' : 'is-incorrect'}">
            <div class="solution-header">
              <span class="solution-status-icon">${isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
              <span class="badge badge-subtle">${q.topic || 'Concept'}</span>
            </div>
            <h4 class="solution-question">Q${idx + 1}: ${q.question}</h4>
            
            <div class="solution-answers-grid">
              <div class="solution-student-answer ${isCorrect ? 'good' : 'bad'}">
                <strong>Your Answer:</strong> ${studentAnsText}
              </div>
              ${!isCorrect ? `
                <div class="solution-correct-answer">
                  <strong>Correct Answer:</strong> ${correctAnsText}
                </div>
              ` : ''}
            </div>

            <div class="solution-explanation-box">
              <strong>Pedagogical Rationale:</strong>
              <p>${q.explanation}</p>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // =========================================================================
  // 16. OFFICIAL ACADEMIC CERTIFICATES OF COMPLETION
  // =========================================================================
  bindCertificateEvents() {
    const btnCopy = document.getElementById("btn-copy-cert-id");
    if (btnCopy) {
      btnCopy.addEventListener("click", () => this.copyCertificateLink());
    }

    const btnPrint = document.getElementById("btn-print-certificate");
    if (btnPrint) {
      btnPrint.addEventListener("click", () => this.printCertificate());
    }

    const btnDl = document.getElementById("btn-download-cert-png");
    if (btnDl) {
      btnDl.addEventListener("click", () => this.downloadCertificatePNG());
    }
  }

  openCertificateModal(courseIdOrCertId) {
    let cert = store.getCertificateById(courseIdOrCertId) || store.getCertificateForCourse(courseIdOrCertId);

    if (!cert) {
      const course = store.getCourseById(courseIdOrCertId);
      const student = store.getStudentProfile();
      // Generate certificate for preview if enrolled/completed
      cert = store.issueCertificate({
        courseId: courseIdOrCertId,
        studentName: student.name,
        rollNo: student.rollNo,
        grade: "A+",
        score: 95,
        percentage: 95
      });
    }

    this.activeCertificate = cert;

    // Populate Certificate HTML elements
    document.getElementById("cert-header-meta").textContent = `Verified Credential • ID: ${cert.id}`;
    document.getElementById("cert-student-name").textContent = cert.studentName;
    document.getElementById("cert-student-roll").textContent = cert.rollNo;
    document.getElementById("cert-student-dept").textContent = cert.department;
    document.getElementById("cert-course-title").textContent = cert.courseTitle;
    document.getElementById("cert-course-code").textContent = cert.courseCode;
    document.getElementById("cert-course-credits").textContent = `${cert.credits} Academic Credits`;
    document.getElementById("cert-course-grade").textContent = `${cert.grade} (${cert.score}%)`;

    document.getElementById("cert-sig-instructor").textContent = cert.instructor;
    document.getElementById("cert-name-instructor").textContent = cert.instructor;
    document.getElementById("cert-title-instructor").textContent = cert.instructorRole;

    document.getElementById("cert-sig-dean").textContent = cert.registrar || "Dr. Arvind Subramanian";
    document.getElementById("cert-name-registrar").textContent = cert.registrar || "Dr. Arvind Subramanian";

    document.getElementById("cert-issue-date").textContent = cert.issueDate;
    document.getElementById("cert-credential-id").textContent = cert.id;

    // Open Modal
    document.getElementById("certificate-modal").classList.remove("hidden");
  }

  printCertificate() {
    window.print();
  }

  copyCertificateLink() {
    if (!this.activeCertificate) return;
    const url = `https://coursehub.university.edu/verify/${this.activeCertificate.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        this.showToast(`Verification link copied: ${this.activeCertificate.id}`, "success");
      }).catch(() => {
        this.showToast(`Credential ID: ${this.activeCertificate.id}`, "info");
      });
    } else {
      this.showToast(`Credential ID: ${this.activeCertificate.id}`, "info");
    }
  }

  downloadCertificatePNG() {
    const cert = this.activeCertificate;
    if (!cert) {
      this.showToast("No active certificate found to export.", "error");
      return;
    }

    // High resolution canvas for print quality (1800 x 1270 px, 300 DPI feel)
    const canvas = document.createElement("canvas");
    canvas.width = 1800;
    canvas.height = 1270;
    const ctx = canvas.getContext("2d");

    // 1. Parchment Background Fill
    const bgGrad = ctx.createLinearGradient(0, 0, 1800, 1270);
    bgGrad.addColorStop(0, "#faf8f2");
    bgGrad.addColorStop(0.5, "#ffffff");
    bgGrad.addColorStop(1, "#f6f1e5");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1800, 1270);

    // 2. Outer Ornate Border
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, 1740, 1210);

    // Secondary Inner Gold Border
    ctx.strokeStyle = "#92400e";
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, 1700, 1170);

    // Thin inner hairline
    ctx.strokeStyle = "#b45309";
    ctx.lineWidth = 1;
    ctx.strokeRect(60, 60, 1680, 1150);

    // 3. Corner Filigree Accents
    const drawCorner = (x, y, rot) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.fillStyle = "#d4af37";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(80, 0);
      ctx.bezierCurveTo(40, 0, 0, 40, 0, 80);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#b45309";
      ctx.beginPath();
      ctx.arc(25, 25, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawCorner(60, 60, 0);
    drawCorner(1740, 60, Math.PI / 2);
    drawCorner(1740, 1210, Math.PI);
    drawCorner(60, 1210, -Math.PI / 2);

    // 4. University Emblem / Crest
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.arc(900, 150, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🏛️", 900, 162);

    // 5. Header Titles
    ctx.fillStyle = "#1e1b4b";
    ctx.font = "800 42px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("COURSEHUB UNIVERSITY", 900, 235);

    ctx.fillStyle = "#4338ca";
    ctx.font = "600 21px 'Inter', sans-serif";
    ctx.fillText("INSTITUTE OF TECHNOLOGY & ADVANCED SCIENCE", 900, 272);

    ctx.fillStyle = "#b45309";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("—  ★  ★  ★  —", 900, 310);

    ctx.fillStyle = "#92400e";
    ctx.font = "bold 44px 'Plus Jakarta Sans', serif";
    ctx.fillText("CERTIFICATE OF COMPLETION", 900, 375);

    ctx.fillStyle = "#64748b";
    ctx.font = "italic 24px Georgia, serif";
    ctx.fillText("This is to officially certify that", 900, 430);

    // 6. Student Recipient
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 58px Georgia, serif";
    ctx.fillText(cert.studentName, 900, 510);

    // Flourish line under name
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(600, 535);
    ctx.lineTo(1200, 535);
    ctx.stroke();

    ctx.fillStyle = "#475569";
    ctx.font = "600 22px 'Inter', sans-serif";
    ctx.fillText(`Roll No: ${cert.rollNo}   •   Department of ${cert.department}`, 900, 580);

    ctx.fillStyle = "#334155";
    ctx.font = "24px Georgia, serif";
    ctx.fillText("has fulfilled all academic requirements, laboratory practicums, and successfully passed the comprehensive evaluation for", 900, 640);

    // 7. Course Details Badge Box
    ctx.fillStyle = "rgba(99, 102, 241, 0.05)";
    ctx.strokeStyle = "rgba(99, 102, 241, 0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(400, 680, 1000, 120, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#312e81";
    ctx.font = "bold 34px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(cert.courseTitle, 900, 730);

    ctx.fillStyle = "#047857";
    ctx.font = "600 20px 'Inter', sans-serif";
    ctx.fillText(`Course Code: ${cert.courseCode}   •   Credits: ${cert.credits} Academic Credits   •   Final Grade: ${cert.grade} (${cert.score}%)`, 900, 770);

    // 8. Signatures & Seals
    // Left Signature
    ctx.fillStyle = "#1e1b4b";
    ctx.font = "italic bold 32px Georgia, serif";
    ctx.fillText(cert.instructor, 450, 940);
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(300, 960);
    ctx.lineTo(600, 960);
    ctx.stroke();
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(cert.instructor, 450, 990);
    ctx.fillStyle = "#64748b";
    ctx.font = "16px sans-serif";
    ctx.fillText("Professor & Department Chair", 450, 1015);

    // Center 3D Gold Seal
    const sealGrad = ctx.createRadialGradient(900, 940, 10, 900, 940, 65);
    sealGrad.addColorStop(0, "#fde68a");
    sealGrad.addColorStop(0.6, "#d97706");
    sealGrad.addColorStop(1, "#92400e");
    ctx.fillStyle = sealGrad;
    ctx.beginPath();
    ctx.arc(900, 940, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#78350f";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText("★", 900, 940);
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("OFFICIAL SEAL", 900, 970);
    ctx.fillText("VERIFIED", 900, 918);

    // Right Signature
    ctx.fillStyle = "#1e1b4b";
    ctx.font = "italic bold 32px Georgia, serif";
    ctx.fillText(cert.registrar || "Dr. Arvind Subramanian", 1350, 940);
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(1200, 960);
    ctx.lineTo(1500, 960);
    ctx.stroke();
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(cert.registrar || "Dr. Arvind Subramanian", 1350, 990);
    ctx.fillStyle = "#64748b";
    ctx.font = "16px sans-serif";
    ctx.fillText("University Registrar & Dean", 1350, 1015);

    // 9. Bottom Verification Strip
    ctx.fillStyle = "rgba(15, 23, 42, 0.04)";
    ctx.fillRect(80, 1100, 1640, 55);
    ctx.fillStyle = "#475569";
    ctx.font = "500 18px 'Inter', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Issue Date: ${cert.issueDate}`, 120, 1135);

    ctx.textAlign = "center";
    ctx.fillText(`Credential ID: ${cert.id}`, 900, 1135);

    ctx.textAlign = "right";
    ctx.fillStyle = "#059669";
    ctx.font = "bold 18px 'Inter', sans-serif";
    ctx.fillText("✓ Cryptographically Signed & Verified", 1680, 1135);

    // 10. Trigger Download
    const filename = `CourseHub_Certificate_${cert.courseCode}_${cert.studentName.replace(/\s+/g, '_')}.png`;
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showToast(`Official Certificate downloaded: ${filename}`, "success");
  }
}

