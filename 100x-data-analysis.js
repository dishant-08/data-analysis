let assignmentIdHeader;

// Step 1: Fetch data and assignment ID
fetch('https://one00x-data-analysis.onrender.com/assignment?email=dishant.sahu07@gmail.com')
  .then((res) => {
    if (res.status === 200) {
      assignmentIdHeader = res.headers.get('x-assignment-id'); // Corrected variable name
      return res.json();
    } else {
      throw new Error('Failed to fetch data');
    }
  })
  .then((data) => {
    const jargons = data;
    const jargonCounts = {};

    // Step 2: Calculate word counts
    jargons.forEach((jargon) => {
      jargonCounts[jargon] = (jargonCounts[jargon] || 0) + 1;
    });

    // Step 3: Find the most used jargon
    const mostUsedJargon = Object.keys(jargonCounts).reduce((a, b) => {
      return jargonCounts[a] > jargonCounts[b] ? a : b;
    });

    // Step 4: Prepare and submit the answer
    const requestData = {
      
      assignment_id: assignmentIdHeader, 
      answer: mostUsedJargon,
    };
    // console.log(requestData);

    // Step 5: Submit the answer
    return fetch('https://one00x-data-analysis.onrender.com/assignment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Failed to submit the answer');
    }
  })
  .then((data) => {
    console.log( data);
  })
  .catch((error) => {
    if (error.message.includes('HTTP 500')) { // For 500 status code
      console.error('Received HTTP 500 response. Please retry.');
    } else {
      console.error('Error:', error);
    }
  });
