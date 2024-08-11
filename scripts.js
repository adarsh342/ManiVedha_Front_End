document.getElementById('submit-btn').addEventListener('click', async function() {
    const symptomInput = document.getElementById('symptom-input').value;
    
    if (symptomInput.trim() === '') {
        alert('Please enter your symptoms or disease.');
        return;
    }

    document.getElementById('loading').style.display = 'block';

    try {
        const response = await fetch('https://manivedha-back-end.onrender.com/get-disease-info', {  // Correct backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symptoms: symptomInput })
        });

        const data = await response.json();
        document.getElementById('loading').style.display = 'none';

        if (data.error) {
            alert(data.error);
        } else {
            let resultHTML = '<h2>Possible Diseases and Treatments:</h2>';
            data.result.forEach(item => {
                resultHTML += `<p><strong>Disease:</strong> ${item.disease_name}</p>`;
                item.treatments.forEach(treatment => {
                    resultHTML += `<p><strong>Treatment Type:</strong> ${treatment.type}<br><strong>Treatment:</strong> ${treatment.description}</p>`;
                });
            });
            document.getElementById('result-box').innerHTML = resultHTML;
        }
    } catch (error) {
        document.getElementById('loading').style.display = 'none';
        alert('An error occurred. Please try again later.');
        console.error(error);
    }

    document.getElementById('symptom-input').value = '';
});
