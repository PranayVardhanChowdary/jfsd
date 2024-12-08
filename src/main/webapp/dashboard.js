function callApi(METHOD, URL, DATA, SUCCESS) {
  var xhttp = new XMLHttpRequest();
  xhttp.open(METHOD, URL, true);
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        SUCCESS(this.responseText);
      } else {
        alert("HTTP " + this.status + ": Service unavailable");
      }
    }
  };

  xhttp.send(DATA);
}

function uploadFile() {
  var studentName = document.getElementById("studentName").value;
  var fileInput = document.getElementById("file");

  var formData = new FormData();
  formData.append("studentName", studentName);
  formData.append("file", fileInput.files[0]);

  callApi("POST", "/resumes/upload", formData, function (response) {
    alert("Resume uploaded successfully");
  });
}

var uploadButton = document.getElementById("uploadButton");
uploadButton.addEventListener("click", uploadFile);
// script.js
document.addEventListener("DOMContentLoaded", function () {
  initializeCharts();
  setupEventListeners();
});

function initializeCharts() {
  // Grade Distribution Chart
  const gradeCtx = document.getElementById("gradeChart").getContext("2d");
  new Chart(gradeCtx, {
    type: "doughnut",
    data: {
      labels: ["A", "B", "C", "D"],
      datasets: [
        {
          data: [12, 8, 3, 1],
          backgroundColor: ["#4361ee", "#3f37c9", "#ff9800", "#f44336"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });

  // Study Hours Chart
  const studyCtx = document.getElementById("studyChart").getContext("2d");
  new Chart(studyCtx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Hours",
          data: [4, 6, 5, 8, 3, 7, 4],
          borderColor: "#4361ee",
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function setupEventListeners() {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }
}
// script.js
const studentData = {
  tasks: [
    {
      id: 1,
      title: "Complete Database Project",
      type: "Academic",
      deadline: "2024-03-25",
      priority: "high",
      status: "pending",
    },
    {
      id: 2,
      title: "Submit Weekly Work Report",
      type: "Job",
      deadline: "2024-03-22",
      priority: "medium",
      status: "pending",
    },
  ],
  workSchedule: {
    monday: { hours: 4, location: "Tech Lab" },
    wednesday: { hours: 5, location: "Library" },
    friday: { hours: 4, location: "IT Department" },
  },
  jobMetrics: {
    hoursWorked: 45,
    tasksCompleted: 12,
    performance: 85,
    earnings: 850,
  },
};

function initializeDashboard() {
  updateTaskList();
  updateJobMetrics();
  initializeCharts();
  setupNotifications();
}

function updateTaskList() {
  const taskContainer = document.getElementById("taskList");
  taskContainer.innerHTML = studentData.tasks
    .map(
      (task) => `
        <div class="task-card ${task.status}" data-id="${task.id}">
            <div class="task-header">
                <span class="task-type ${task.type.toLowerCase()}">${
        task.type
      }</span>
                <span class="task-priority ${task.priority}">${
        task.priority
      }</span>
            </div>
            <h4>${task.title}</h4>
            <div class="task-meta">
                <span><i class="fas fa-calendar"></i> ${task.deadline}</span>
                <div class="task-actions">
                    <button onclick="completeTask(${task.id})">
                        <i class="fas fa-check"></i>
                    </button>
                    <button onclick="editTask(${task.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function updateJobMetrics() {
  const metrics = studentData.jobMetrics;
  document.getElementById("hoursWorked").textContent = metrics.hoursWorked;
  document.getElementById("earnings").textContent = `$${metrics.earnings}`;
  document.getElementById(
    "performance"
  ).textContent = `${metrics.performance}%`;

  // Update progress bars
  updateProgressBar("performanceProgress", metrics.performance);
}

function updateProgressBar(elementId, value) {
  const progressBar = document.getElementById(elementId);
  progressBar.style.width = `${value}%`;
  progressBar.setAttribute("aria-valuenow", value);
}

function completeTask(taskId) {
  const task = studentData.tasks.find((t) => t.id === taskId);
  if (task) {
    task.status = "completed";
    updateTaskList();
    showNotification("Task completed successfully!", "success");
  }
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === "success" ? "check-circle" : "info-circle"
        }"></i>
        <span>${message}</span>
    `;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

function setupNotifications() {
  // Check for upcoming deadlines
  setInterval(() => {
    const today = new Date();
    studentData.tasks.forEach((task) => {
      const deadline = new Date(task.deadline);
      const daysUntil = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

      if (daysUntil === 1 && task.status === "pending") {
        showNotification(`Task "${task.title}" is due tomorrow!`, "warning");
      }
    });
  }, 3600000); // Check every hour
}

function addNewTask(taskData) {
  const newTask = {
    id: studentData.tasks.length + 1,
    ...taskData,
    status: "pending",
  };
  studentData.tasks.push(newTask);
  updateTaskList();
  showNotification("New task added successfully!", "success");
}

// Add event listeners when document loads
document.addEventListener("DOMContentLoaded", () => {
  initializeDashboard();

  // Task form submission
  document.getElementById("addTaskForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addNewTask({
      title: formData.get("taskTitle"),
      type: formData.get("taskType"),
      deadline: formData.get("taskDeadline"),
      priority: formData.get("taskPriority"),
    });
    e.target.reset();
  });
});

// Update charts with job-related data
function updateJobCharts() {
  const workHoursChart = new Chart(
    document.getElementById("workHoursChart").getContext("2d"),
    {
      type: "bar",
      data: {
        labels: Object.keys(studentData.workSchedule),
        datasets: [
          {
            label: "Work Hours",
            data: Object.values(studentData.workSchedule).map(
              (day) => day.hours
            ),
            backgroundColor: "#4361ee",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Hours",
            },
          },
        },
      },
    }
  );
}

// Initialize all features
initializeDashboard();
// Add to your JavaScript
const modal = document.getElementById("taskModal");
const addTaskBtn = document.getElementById("addTaskBtn");
const closeBtn = document.querySelector(".close-modal");
const taskForm = document.getElementById("taskForm");

// Check user access
const checkAccess = () => {
  // Replace with your actual authentication logic
  const userRole = localStorage.getItem("userRole");
  return userRole === "student" || userRole === "admin";
};

// Show modal with access check
addTaskBtn.addEventListener("click", () => {
  if (checkAccess()) {
    modal.style.display = "block";
  } else {
    showNotification("Access denied. Please log in first.", "error");
  }
});

// Close modal
const closeModal = () => {
  modal.style.display = "none";
  taskForm.reset();
};

closeBtn.addEventListener("click", closeModal);

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Handle form submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(taskForm);
  const taskData = {
    title: formData.get("taskTitle"),
    type: formData.get("taskType"),
    deadline: formData.get("taskDeadline"),
    priority: formData.get("taskPriority"),
    id: Date.now(), // Unique ID
    status: "pending",
  };

  // Add task to list
  addNewTask(taskData);
  closeModal();
});

// Add validation to form inputs
document
  .querySelectorAll("#taskForm input, #taskForm select")
  .forEach((input) => {
    input.addEventListener("invalid", (e) => {
      e.preventDefault();
      input.classList.add("error");
    });

    input.addEventListener("input", () => {
      input.classList.remove("error");
    });
  });
// script.js

// Task Management System
class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Add Task Button
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskModal = document.getElementById("taskModal");
    const taskForm = document.getElementById("taskForm");
    const closeModalBtn = document.querySelector(".close-modal");

    addTaskBtn?.addEventListener("click", () => {
      taskModal.style.display = "block";
    });

    closeModalBtn?.addEventListener("click", () => {
      this.closeModal();
    });

    taskForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleTaskSubmission(e);
    });

    // Close modal on outside click
    window.addEventListener("click", (e) => {
      if (e.target === taskModal) {
        this.closeModal();
      }
    });
  }

  handleTaskSubmission(e) {
    const form = e.target;
    const formData = new FormData(form);

    const newTask = {
      id: Date.now(),
      title: formData.get("taskTitle"),
      type: formData.get("taskType"),
      deadline: formData.get("taskDeadline"),
      priority: formData.get("taskPriority"),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    if (this.validateTask(newTask)) {
      this.addTask(newTask);
      this.closeModal();
      this.showNotification("Task added successfully!", "success");
    }
  }

  validateTask(task) {
    if (!task.title || task.title.trim().length < 3) {
      this.showNotification(
        "Task title must be at least 3 characters",
        "error"
      );
      return false;
    }

    if (!task.deadline) {
      this.showNotification("Deadline is required", "error");
      return false;
    }

    const deadlineDate = new Date(task.deadline);
    if (deadlineDate < new Date()) {
      this.showNotification("Deadline cannot be in the past", "error");
      return false;
    }

    return true;
  }

  addTask(task) {
    this.tasks.push(task);
    this.saveTasks();
    this.renderTasks();
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  renderTasks() {
    const taskContainer = document.getElementById("taskList");
    if (!taskContainer) return;

    taskContainer.innerHTML = this.tasks
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .map((task) => this.createTaskCard(task))
      .join("");
  }

  createTaskCard(task) {
    return `
            <div class="task-card ${task.status}" data-id="${task.id}">
                <div class="task-header">
                    <span class="task-type ${task.type.toLowerCase()}">${
      task.type
    }</span>
                    <span class="task-priority ${task.priority}">${
      task.priority
    }</span>
                </div>
                <h4>${task.title}</h4>
                <div class="task-meta">
                    <span><i class="fas fa-calendar"></i> ${new Date(
                      task.deadline
                    ).toLocaleDateString()}</span>
                    <div class="task-actions">
                        ${
                          task.status !== "completed"
                            ? `
                            <button onclick="taskManager.toggleTaskStatus(${task.id})" class="btn-action complete">
                                <i class="fas fa-check"></i>
                            </button>
                        `
                            : ""
                        }
                        <button onclick="taskManager.editTask(${
                          task.id
                        })" class="btn-action edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="taskManager.deleteTask(${
                          task.id
                        })" class="btn-action delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
  }

  toggleTaskStatus(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = task.status === "completed" ? "pending" : "completed";
      this.saveTasks();
      this.renderTasks();
      this.showNotification(`Task marked as ${task.status}`, "success");
    }
  }

  deleteTask(taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
      this.tasks = this.tasks.filter((t) => t.id !== taskId);
      this.saveTasks();
      this.renderTasks();
      this.showNotification("Task deleted successfully", "success");
    }
  }

  closeModal() {
    const modal = document.getElementById("taskModal");
    const form = document.getElementById("taskForm");
    modal.style.display = "none";
    form.reset();
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "error"
                ? "exclamation-circle"
                : "info-circle"
            }"></i>
            <span>${message}</span>
        `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
}

// Initialize Task Manager
const taskManager = new TaskManager();

// Add to DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  taskManager.renderTasks();
});
// script.js

class CourseManager {
  constructor() {
    this.courses = JSON.parse(localStorage.getItem("courses")) || [];
    this.assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    document.getElementById("addCourseBtn")?.addEventListener("click", () => {
      this.showCourseModal();
    });

    document.getElementById("courseForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleCourseSubmission(e);
    });
  }

  handleCourseSubmission(e) {
    const formData = new FormData(e.target);
    const newCourse = {
      id: Date.now(),
      code: formData.get("courseCode"),
      name: formData.get("courseName"),
      instructor: formData.get("instructor"),
      schedule: formData.get("schedule"),
      credits: formData.get("credits"),
      progress: 0,
    };

    this.addCourse(newCourse);
    this.closeCourseModal();
  }

  addCourse(course) {
    this.courses.push(course);
    this.saveCourses();
    this.renderCourses();
  }

  renderCourses() {
    const courseContainer = document.getElementById("courseList");
    if (!courseContainer) return;

    courseContainer.innerHTML = this.courses
      .map(
        (course) => `
            <div class="course-card">
                <div class="course-header">
                    <h3>${course.code}</h3>
                    <span class="credit-badge">${course.credits} Credits</span>
                </div>
                <h4>${course.name}</h4>
                <p><i class="fas fa-user"></i> ${course.instructor}</p>
                <p><i class="fas fa-clock"></i> ${course.schedule}</p>
                <div class="course-progress">
                    <div class="progress-bar" style="width: ${course.progress}%"></div>
                    <span>${course.progress}% Complete</span>
                </div>
                <div class="course-actions">
                    <button onclick="courseManager.viewAssignments(${course.id})">
                        <i class="fas fa-tasks"></i> Assignments
                    </button>
                    <button onclick="courseManager.editCourse(${course.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  }

  viewAssignments(courseId) {
    const assignments = this.assignments.filter((a) => a.courseId === courseId);
    const course = this.courses.find((c) => c.id === courseId);

    const assignmentsList = document.getElementById("assignmentsList");
    assignmentsList.innerHTML = `
            <h3>Assignments for ${course.name}</h3>
            <div class="assignments-grid">
                ${assignments
                  .map(
                    (assignment) => `
                    <div class="assignment-card ${assignment.status}">
                        <h4>${assignment.title}</h4>
                        <p>${assignment.description}</p>
                        <div class="assignment-meta">
                            <span><i class="fas fa-calendar"></i> Due: ${new Date(
                              assignment.dueDate
                            ).toLocaleDateString()}</span>
                            <span class="status-badge ${assignment.status}">${
                      assignment.status
                    }</span>
                        </div>
                        <div class="assignment-actions">
                            <button onclick="courseManager.toggleAssignmentStatus(${
                              assignment.id
                            })">
                                ${
                                  assignment.status === "completed"
                                    ? "Mark Incomplete"
                                    : "Mark Complete"
                                }
                            </button>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  saveCourses() {
    localStorage.setItem("courses", JSON.stringify(this.courses));
  }

  calculateProgress() {
    this.courses.forEach((course) => {
      const courseAssignments = this.assignments.filter(
        (a) => a.courseId === course.id
      );
      const completed = courseAssignments.filter(
        (a) => a.status === "completed"
      ).length;
      course.progress = courseAssignments.length
        ? Math.round((completed / courseAssignments.length) * 100)
        : 0;
    });
    this.saveCourses();
  }
}

// Add to your existing TaskManager
taskManager.courseManager = new CourseManager();

// Add this HTML to your dashboard
