    console.log('task-form.js loaded');

    const form = document.getElementById('task-form');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const title = document.getElementById('task-name').value.trim();
      const status = document.querySelector('input[name="status"]:checked')?.value;

      try {
        const response = await fetch('/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, status })
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          console.log('Task added successfully');
          form.reset();
        } else {
          console.log(data.error || 'Something went wrong');
        }
      } catch (error) {
        console.error(error);
        alert('Server error');
      }
    });