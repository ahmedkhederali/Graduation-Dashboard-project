// this my services with crud opertaion on task
export const postTaskData = async (url, newTaskData) => {
    fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTaskData)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Response:', data); 
          })
          .catch(error => {
            console.error('Error:', error);
          });
};


export const getTasksData = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.tasks;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const deleteTaskData = async (url, taskId) => {
  fetch(`${url}/${taskId}`, {
    method: 'DELETE',
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('Task deleted successfully');
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}

export const updateTaskData = async (url, taskId, editedTask) => {
  fetch(`${url}/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedTask),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('Task updated successfully');
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}
 
    
