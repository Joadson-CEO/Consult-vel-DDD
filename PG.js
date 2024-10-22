function consultarDDD() {
    const ddd = document.getElementById('ddd').value;
    const resultDiv = document.getElementById('result');

    if (ddd === '' || isNaN(ddd) || ddd.length !== 2) {
        resultDiv.innerHTML = '<p style="color: red;">Por favor, insira um DDD válido de 2 dígitos.</p>';
        return;
    }

    resultDiv.innerHTML = '<p>Consultando...</p>';
    const url = `https://brasilapi.com.br/api/ddd/v1/${ddd}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
        if (data.cities) {
        let tableContent = `<h3>Cidades com DDD ${ddd}:</h3>
        <table class="table table-bordered table-custom">
        <thead>
        <tr>
        <th scope="col">Cidades</th>
        </tr>
        </thead>
        <tbody>`;
                
    data.cities.forEach(city => {
    tableContent += `<tr><td>${city}</td></tr>`;});

    tableContent += `</tbody></table>`;
    resultDiv.innerHTML = tableContent;
} else {
resultDiv.innerHTML = `<p style="color: red;">Não foram encontradas informações para o DDD ${ddd}.</p>`;
}
})
.catch(error => {
    resultDiv.innerHTML = '<p style="color: red;">Erro ao consultar a API. Tente novamente mais tarde.</p>';
    console.error('Erro:', error);
});
}
