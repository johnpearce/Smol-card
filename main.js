```javascript
let scrapedData = [];

document.getElementById('startButton').addEventListener('click', startScraping);

function startScraping() {
    scrapeReddit()
        .then(data => {
            scrapedData = data;
            document.getElementById('dataDisplay').textContent = JSON.stringify(scrapedData, null, 2);
            storeData(scrapedData);
        })
        .catch(handleErrorScraping);
}

function storeData(data) {
    fetch('data.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function handleScrapeComplete() {
    console.log('Scraping complete');
}

function handleErrorScraping(error) {
    console.error('Error during scraping:', error);
}
```
