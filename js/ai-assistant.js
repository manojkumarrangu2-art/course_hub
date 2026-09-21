/**
 * CourseAssist AI — Floating Smart University Advisor
 * Intelligent knowledge engine with context-aware responses
 */

class CourseAssistAI {
  constructor() {
    this.isOpen = false;
    this.messages = [
      {
        sender: "bot",
        time: "Just now",
        text: "Hello! I'm **CourseAssist AI**, your university academic advisor. How can I assist you with course registration, prerequisites, credits, or payments today?"
      }
    ];
    this.init();
  }

  init() {
    this.renderWidget();
    this.bindEvents();
  }

  renderWidget() {
    const container = document.createElement("div");
    container.id = "ai-assistant-container";
    container.innerHTML = `
      <!-- Floating Trigger Button -->
      <button id="ai-floating-btn" class="ai-floating-btn" aria-label="Open CourseAssist AI" title="CourseAssist AI Assistant">
        <div class="ai-avatar-glow"></div>
        <div class="ai-sparkle-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
          </svg>
        </div>
        <svg class="ai-icon-robot" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 8V4H8"/>
          <rect width="16" height="12" x="4" y="8" rx="2"/>
          <path d="M2 14h2"/>
          <path d="M20 14h2"/>
          <path d="M15 13v2"/>
          <path d="M9 13v2"/>
        </svg>
        <span class="ai-btn-text">CourseAssist AI</span>
      </button>

      <!-- Chat Drawer Window -->
      <div id="ai-chat-window" class="ai-chat-window hidden" role="dialog" aria-label="CourseAssist AI Chat">
        <div class="ai-chat-header">
          <div class="ai-header-info">
            <div class="ai-avatar-bubble">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
              </svg>
            </div>
            <div>
              <div class="ai-header-title">CourseAssist AI</div>
              <div class="ai-header-subtitle"><span class="ai-online-dot"></span> Academic Advisor • Online</div>
            </div>
          </div>
          <div class="ai-header-actions">
            <button id="ai-minimize-btn" class="ai-icon-btn" title="Minimize Chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Suggestion Chips -->
        <div class="ai-chips-bar" id="ai-chips-bar">
          <button class="ai-chip" data-query="What are the prerequisites for AIML301?">Prerequisites for AIML301?</button>
          <button class="ai-chip" data-query="How many credits have I registered?">My Credits Summary</button>
          <button class="ai-chip" data-query="Do I have any pending fee payments?">Pending Fee Status?</button>
          <button class="ai-chip" data-query="Recommend electives for Semester 5">Recommend Electives</button>
          <button class="ai-chip" data-query="Show today's class timetable">Today's Timetable</button>
        </div>

        <!-- Chat Messages Area -->
        <div class="ai-chat-body" id="ai-chat-body">
          <!-- Rendered messages will go here -->
        </div>

        <!-- Typing Indicator -->
        <div class="ai-typing-indicator hidden" id="ai-typing">
          <span></span><span></span><span></span>
          <span class="ai-typing-text">CourseAssist is analyzing catalog...</span>
        </div>

        <!-- Chat Input Footer -->
        <form class="ai-chat-footer" id="ai-chat-form">
          <input 
            type="text" 
            id="ai-user-input" 
            class="ai-input" 
            placeholder="Ask about courses, credits, fees, faculty..." 
            autocomplete="off"
            required
          />
          <button type="submit" id="ai-send-btn" class="ai-send-btn" title="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(container);
    this.renderMessages();
  }

  bindEvents() {
    const floatBtn = document.getElementById("ai-floating-btn");
    const minimizeBtn = document.getElementById("ai-minimize-btn");
    const form = document.getElementById("ai-chat-form");
    const chipsBar = document.getElementById("ai-chips-bar");

    floatBtn.addEventListener("click", () => this.toggle());
    minimizeBtn.addEventListener("click", () => this.toggle(false));

    chipsBar.addEventListener("click", (e) => {
      const chip = e.target.closest(".ai-chip");
      if (chip) {
        const query = chip.dataset.query;
        this.handleUserQuery(query);
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("ai-user-input");
      const text = input.value.trim();
      if (!text) return;
      input.value = "";
      this.handleUserQuery(text);
    });
  }

  toggle(forceState) {
    this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
    const win = document.getElementById("ai-chat-window");
    const floatBtn = document.getElementById("ai-floating-btn");

    if (this.isOpen) {
      win.classList.remove("hidden");
      floatBtn.classList.add("active");
      document.getElementById("ai-user-input").focus();
      this.scrollToBottom();
    } else {
      win.classList.add("hidden");
      floatBtn.classList.remove("active");
    }
  }

  handleUserQuery(queryText) {
    // Add user message
    this.messages.push({
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: queryText
    });
    this.renderMessages();

    // Show typing
    const typing = document.getElementById("ai-typing");
    typing.classList.remove("hidden");
    this.scrollToBottom();

    // Generate intelligent contextual response
    setTimeout(() => {
      typing.classList.add("hidden");
      const botReply = this.generateResponse(queryText);
      this.messages.push({
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: botReply
      });
      this.renderMessages();
    }, 650);
  }

  generateResponse(query) {
    const q = query.toLowerCase();
    const student = store.getStudentProfile();
    const registered = store.getRegisteredCourses();
    const allCourses = store.getAllCourses();
    const regIds = store.getRegisteredCourseIds();
    const paymentStats = store.getPaymentStats();

    // 1. Prerequisites check
    if (q.includes("prereq") || q.includes("prerequisite")) {
      const matched = allCourses.find(c => q.includes(c.code.toLowerCase()) || q.includes(c.title.toLowerCase()));
      if (matched) {
        return `**Prerequisites for ${matched.code} (${matched.title})**:\n\n` +
          matched.prerequisites.map(p => `• **${p}**`).join("\n") +
          `\n\n*Note:* You must have obtained at least a grade 'C' or completed these courses in Sem 3/4 before enrolling.`;
      }
      return `For Semester 5 Core courses:\n• **AIML301 (AI & ML)**: Requires CS201 (Data Structures) & MATH202.\n• **CS306 (Cyber Security)**: Requires CS204 (Networks).\n• **CS304 (Cloud)**: Requires CS203 (Operating Systems).`;
    }

    // 2. Credits check
    if (q.includes("credit") || q.includes("load") || q.includes("limit")) {
      const regCredits = registered.reduce((acc, c) => acc + c.credits, 0);
      return `**Your Academic Credit Status:**\n\n` +
        `• **Current Enrolled Credits:** ${regCredits} Credits (${registered.length} courses)\n` +
        `• **Completed Credits:** ${student.completedCredits} / ${student.totalCreditsTarget} Credits\n` +
        `• **Semester Guidelines:** Minimum allowable is **16 credits**, recommended is **20–24 credits**, and the Dean's maximum cap is **26 credits**.\n\n` +
        (regCredits < 16 ? `⚠️ *Notice: You are currently below the 16-credit minimum. Consider selecting 1 more elective in the Course Registration tab.*` : `✅ *Your credit distribution meets the university requirements.*`);
    }

    // 3. Pending fees / payment questions
    if (q.includes("fee") || q.includes("pay") || q.includes("due") || q.includes("receipt") || q.includes("cost")) {
      return `**Fee & Payment Summary:**\n\n` +
        `• **Status:** ${paymentStats.status === "Pending" ? "⚠️ Pending Dues Found" : "✅ All Fees Cleared"}\n` +
        `• **Outstanding Dues:** ₹${paymentStats.pending.toLocaleString()}\n` +
        `• **Previously Cleared:** ₹${paymentStats.paid.toLocaleString()}\n\n` +
        `You can clear dues seamlessly under the **Payments** tab using UPI (GPay, PhonePe), Credit/Debit Cards, or Net Banking. Official receipts are instantly downloadable!`;
    }

    // 4. Timetable / Schedule queries
    if (q.includes("timetable") || q.includes("schedule") || q.includes("class") || q.includes("room") || q.includes("today")) {
      const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
      const dayData = TIMETABLE_DATA.find(d => d.day.toLowerCase() === today.toLowerCase()) || TIMETABLE_DATA[0];
      const activeSlots = dayData.slots.filter(s => s.course !== "FREE" && s.course !== "LUNCH").slice(0, 3);
      
      let scheduleText = `**Classes for ${dayData.day}:**\n\n`;
      activeSlots.forEach(s => {
        scheduleText += `• **${s.time}** — ${s.name} (${s.course}) at *${s.room}* with ${s.faculty}\n`;
      });
      scheduleText += `\nVisit the **Timetable** tab for the full visual interactive weekly grid!`;
      return scheduleText;
    }

    // 5. Course recommendations / electives
    if (q.includes("recommend") || q.includes("elective") || q.includes("suggest") || q.includes("which course")) {
      const unregisteredElectives = allCourses.filter(c => c.type === "Elective" && !regIds.includes(c.id));
      if (unregisteredElectives.length > 0) {
        let recText = `**Recommended Electives for your ${student.department} track:**\n\n`;
        unregisteredElectives.slice(0, 3).forEach(c => {
          recText += `• **${c.code}: ${c.title}** (${c.credits} Credits, Rating: ⭐ ${c.rating})\n  *Key Topics: ${c.tags.join(", ")}*\n  *Seats Remaining:* ${c.availableSeats}/${c.totalSeats}\n\n`;
        });
        recText += `You can add these straight from the **Course Registration** page.`;
        return recText;
      }
      return `You have registered for all key electives! You can view detailed syllabus breakdowns in **Browse Courses**.`;
    }

    // 6. Registration steps / guidance
    if (q.includes("how to register") || q.includes("registration") || q.includes("register")) {
      return `**Step-by-Step Registration Guide:**\n\n` +
        `1. Navigate to **Course Registration** from the left sidebar.\n` +
        `2. Check the tick-boxes for your desired core & elective subjects.\n` +
        `3. Keep an eye on the **Live Summary** on the right side to balance your credits (16–24 credits).\n` +
        `4. Click **Confirm Registration** to submit.\n` +
        `5. Proceed to **Payments** to settle any course or lab add-on fees.`;
    }

    // 7. Faculty / Instructor queries
    if (q.includes("faculty") || q.includes("instructor") || q.includes("professor") || q.includes("teacher") || q.includes("advisor")) {
      return `**Faculty & Mentorship Contacts:**\n\n` +
        `• **Your Faculty Advisor:** ${student.advisor} (Dean Office, Wing A)\n` +
        `• **AI & ML Lab:** Dr. Priya Sharma (priya.sharma@university.edu)\n` +
        `• **CSE Dept Head:** Dr. Rajiv Kumar (rajiv.kumar@university.edu)\n` +
        `• **DevOps & Cloud:** Prof. Sarah Jenkins (s.jenkins@university.edu)\n` +
        `Office hours are held Mon–Fri between 04:00 PM and 05:00 PM.`;
    }

    // 8. Learning Paths & Academic Specializations
    if (q.includes("path") || q.includes("track") || q.includes("roadmap") || q.includes("specialization") || q.includes("career")) {
      const paths = store.getLearningPaths();
      let pathText = `**Academic Learning Paths & Career Specializations:**\n\n`;
      paths.forEach(p => {
        pathText += `• **${p.title}** (${p.progressPercentage}% Completed)\n  *Target Careers:* ${p.careerOutcomes.slice(0, 2).join(", ")}\n  *Lead Faculty:* ${p.leadFaculty}\n\n`;
      });
      pathText += `Visit the **Learning Paths** tab from the left sidebar to view the full stepped semester roadmap!`;
      return pathText;
    }

    // 9. Student Reviews & Ratings
    if (q.includes("review") || q.includes("rating") || q.includes("feedback") || q.includes("what do students say") || q.includes("difficulty")) {
      const matched = allCourses.find(c => q.includes(c.code.toLowerCase()) || q.includes(c.title.toLowerCase()));
      if (matched) {
        const topReview = matched.reviews && matched.reviews[0];
        return `**Student Reviews for ${matched.code} (${matched.title}):**\n\n` +
          `• **Rating:** ⭐ ${matched.rating} / 5.0 (${matched.reviewCount || (matched.reviews ? matched.reviews.length : 100)} verified reviews)\n` +
          `• **Difficulty:** ${matched.difficulty || 'Moderate'}\n\n` +
          (topReview ? `*Featured Student Review (${topReview.studentName}, ${topReview.batch}):*\n"${topReview.comment}"\n\n` : '') +
          `You can view full student testimonials and submit your own review inside the **Course Details** modal!`;
      }

      return `**Top Student-Rated Courses:**\n\n` +
        `• **CS306: Cyber Security & Cryptography** (⭐ 4.92 / 5.0 - 118 reviews)\n` +
        `• **AIML301: AI & Machine Learning** (⭐ 4.90 / 5.0 - 142 reviews)\n` +
        `• **IT308: Full-Stack Web Engineering** (⭐ 4.88 / 5.0 - 164 reviews)\n` +
        `• **CS302: Data Structures & Algorithms** (⭐ 4.85 / 5.0 - 198 reviews)\n\n` +
        `Click on any course in **Browse Courses** to read verified student feedback!`;
    }

    // Fallback friendly guidance
    return `I can assist you with that! As your academic AI copilot, I can help you with:\n\n` +
      `• **Prerequisites** (e.g. "What are prerequisites for CS306?")\n` +
      `• **Credit Calculation** (e.g. "Check my credits")\n` +
      `• **Fee Status & Receipts** (e.g. "Any pending fees?")\n` +
      `• **Elective Guidance** (e.g. "Recommend electives for Sem 5")\n` +
      `• **Timetable Checks** (e.g. "Where is my 10 AM class?")\n\n` +
      `What would you like to explore next?`;
  }

  renderMessages() {
    const body = document.getElementById("ai-chat-body");
    if (!body) return;

    body.innerHTML = this.messages.map(m => {
      const isBot = m.sender === "bot";
      // Convert markdown bold and bullets simply
      let formatted = m.text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\n\n/g, "<br><br>")
        .replace(/\n• /g, "<br>• ");

      return `
        <div class="ai-msg ${isBot ? "ai-msg-bot" : "ai-msg-user"}">
          ${isBot ? `
            <div class="ai-msg-avatar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
              </svg>
            </div>
          ` : ""}
          <div class="ai-msg-bubble">
            <div class="ai-msg-content">${formatted}</div>
            <div class="ai-msg-meta">${m.time}</div>
          </div>
        </div>
      `;
    }).join("");

    this.scrollToBottom();
  }

  scrollToBottom() {
    const body = document.getElementById("ai-chat-body");
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }
}
