document.getElementById('convertBtn').addEventListener('click', function () {
    const url = document.getElementById('url').value;
    console.log(url)
    fetch('https://2025-y2-mp-3.vercel.app/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({ url: url })
    })
        .then(response => {
            if (response.ok) {
                console.log(response)
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
            document.body.main.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});