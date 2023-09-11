document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'UIHERK1NEJHRBBRY'; 
    const getQuoteButton = document.getElementById('getQuote');
    const symbolInput = document.getElementById('symbol');
    const quoteResult = document.getElementById('quoteResult');

    getQuoteButton.addEventListener('click', () => {
        const symbol = symbolInput.value.toUpperCase();
        const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data['Time Series (5min)']) {
                    const latestData = data['Time Series (5min)'][Object.keys(data['Time Series (5min)'])[0]];
                    const price = latestData['1. open'];
                    const date = Object.keys(data['Time Series (5min)'])[0];
                    const symbolName = data['Meta Data']['2. Symbol'];

                    quoteResult.innerHTML = `
                        <h2>${symbolName} - Cotización Actual</h2>
                        <p>Precio: $${price}</p>
                        <p>Fecha y Hora: ${date}</p>
                    `;
                } else {
                    quoteResult.innerHTML = '<p>No se encontraron datos para el símbolo de la acción ingresado.</p>';
                }
            })
            .catch(error => {
                console.error('Error al obtener la cotización:', error);
                quoteResult.innerHTML = '<p>Ocurrió un error al obtener la cotización.</p>';
            });
    });
});