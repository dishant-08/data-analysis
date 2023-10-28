let assignmentIdHeader;

function mostUsedWord(data){
  const jargons = data;
  const jargonCounts = {};
  const mostUsedJargon = new Map()
  // Step 2: Calculate word counts

  jargons.forEach((jargon) => {
    mostUsedJargon.set(jargon , (mostUsedJargon.get(jargon) || 0) + 1);
  });
  let maxCount = Math.max(...mostUsedJargon.values())
// console.log(maxCount);
let i =0 
for(let max of mostUsedJargon.keys()){
    if(mostUsedJargon.get(max) === maxCount){
        jargonCounts[i++] = (max)
    }
}
  // console.log(jargonCounts);
  return jargonCounts;
}

// Step 1: Fetch data and assignment ID
fetch('https://one00x-data-analysis.onrender.com/assignment?email=dishant.sahu07@gmail.com')
  .then((res) => {
    if (res.ok) {
      assignmentIdHeader = res.headers.get('x-assignment-id'); // Corrected variable name
      return res.json();
    } else {
      throw new Error('Failed to fetch data');
    }
  })
  .then((data) => {
   

    // Step 4: Prepare and submit the answer
    const requestData = {
      
      assignment_id: assignmentIdHeader, 
      answer: (mostUsedWord(data)[0]),
    };
    console.log(requestData);

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
    if (response.ok) {
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
