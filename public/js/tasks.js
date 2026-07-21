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
        <div class="task-main">
          <div class="task-info">
            <h4 class="task-title">${task.title}</h4>
            <p class="task-meta">
              ${task.category ? task.category : 'Uncategorized'}
            </p>
            <div class="task-timestamp">
              Date created: ${formatTimestamp(task.created_at)}
            </div>
          </div>

          <div class="task-badges">
            <span class="task-priority-badge task-priority-${task.priority}">
              ${formatPriority(task.priority)}
            </span>

            <span class="task-status-badge task-status-${task.status}">
              ${formatStatus(task.status)}
            </span>
          </div>
        </div>
      </article>
    `).join('');

  } catch (error) {
    console.error(error);
    tasksSection.innerHTML = `<p class="tasks-placeholder">Server error while loading tasks.</p>`;
  }
}

function formatStatus(status) {
  if (!status) return 'Unknown';

  return status
    .replaceAll('_', ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
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

function formatPriority(priority) {
  if (!priority) return 'None';

  return priority
    .replaceAll('_', ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}
loadTasks();
