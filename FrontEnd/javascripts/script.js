document.getElementById('convertBtn').addEventListener('click', async function (e) {
    e.preventDefault();
    const input = document.getElementById('url');
    const url = input.value;
    input.value = "";
    console.log(url)

    let response = await fetch('/', {
        method: 'POST',
        host: 'https://2025-y2-mp-3.vercel.app',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({ url: url })
    })
    console.log(response)
    if (response.ok) {
        console.log(response)
        let blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.mp3';
        document.body.main.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } else {
        throw new Error('Conversion failed');
    }

    // fetch('https://2025-y2-mp-3.vercel.app/convert', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'

    //     },
    //     body: JSON.stringify({ url: url })
    // })
    //     .then(response => {
    //         if (response.ok) {
    //             console.log(response)
    //             return response.blob();
    //         } else {
    //             throw new Error('Conversion failed');
    //         }
    //     })
    //     .then(blob => {
    //         const url = window.URL.createObjectURL(blob);
    //         const a = document.createElement('a');
    //         a.style.display = 'none';
    //         a.href = url;
    //         a.download = 'output.mp3';
    //         document.body.main.appendChild(a);
    //         a.click();
    //         window.URL.revokeObjectURL(url);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
});