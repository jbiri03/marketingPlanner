async function loadTasks() {
  const tasksSection = document.getElementById('tasks-section');

  try {
    const response = await fetch('/tasks');
    const tasks = await response.json();

    if (!response.ok) {
      tasksSection.innerHTML = `<p class="tasks-placeholder">Failed to load tasks.</p>`;
      return;
    }

    if (!tasks.length) {
      tasksSection.innerHTML = `<p class="tasks-placeholder">No tasks found yet.</p>`;
      return;
    }

    tasksSection.innerHTML = tasks.map(task => `
      <article class="task-card">

        <div class="task-info">
          <h4>${task.title}</h4>

          <div class="task-timestamp">
            Date created: ${formatTimestamp(task.created_at)}
          </div>

          <div class="task-due-date">
            Due date: <span style="color: var(--muted); font-weight: 500;">None yet</span>
          </div>
        </div>

        <span class="task-status-badge task-status-${task.status}">
          ${formatStatus(task.status)}
        </span>

      </article>
    `).join('');

  } catch (error) {
    console.error(error);
    tasksSection.innerHTML = `<p class="tasks-placeholder">Server error while loading tasks.</p>`;
  }
}

function formatStatus(status) {
  if (status === 'pending') return 'Not started';
  if (status === 'in_progress') return 'In progress';
  if (status === 'completed') return 'Completed';
  if (status === 'skipped') return 'Skipped';
  return status;
}

function formatTimestamp(ts) {
  const date = new Date(ts);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

loadTasks();
