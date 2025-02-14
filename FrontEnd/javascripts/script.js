document.getElementById('convertBtn').addEventListener('click', function() {
    const url = document.getElementById('url').value;

    fetch('/convert', {
        method: 'POST',  // Ensure this is POST
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => {
        if (response.ok) {
            return response.blob();
        } else {
            throw new Error('Conversion failed');
        }
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'output.mp3';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
