fetch('http://192.168.1.93/data')
    .then(response => response.json())
    .then(data => {
        console.log('Temperature:', data.Temperature);
        console.log('Humidity:', data.Humidity);
        console.log('Gas Value:', data.gasValue);
        // You can perform further operations with the received data here
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
