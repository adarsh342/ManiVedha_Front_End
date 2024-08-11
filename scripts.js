document.getElementById('submitButton').addEventListener('click', function() {
    const symptoms = document.getElementById('symptomInput').value;

    fetch('https://your-render-app-url.com/get-disease-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: symptoms }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('result').innerText = data.error;
        } else {
            const resultElement = document.getElementById('result');
            resultElement.innerHTML = '';
            data.result.forEach(disease => {
                resultElement.innerHTML += `<h3>${disease.disease_name}</h3>`;
                disease.treatments.forEach(treatment => {
                    resultElement.innerHTML += `<p>${treatment.type}: ${treatment.description}</p>`;
                });
            });
        }
    })
    .catch(error => console.error('Error:', error));
});
