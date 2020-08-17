let rowValue = 0;

async function getData(event, value) {
    event.preventDefault();
    const jsonInput = JSON.stringify([{
        'text': event.target.text.value, 'value': value
    }])
    const response = await fetch('/predict', {
        method: 'POST',
        body: jsonInput, // string or object
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const myJson = await response.json();
    if (myJson != null) {
        const table = document.getElementsByTagName('tbody')[0];
        const first = check_abusive(myJson['bow.json']);
        const second = check_abusive(myJson['logistic.sav']);
        const third = check_abusive(myJson['mn.sav']);
        const fourth = check_abusive(myJson['value']);
        const text = myJson['text'];
        const items = (`<tr>
                    <th scope="row">${rowValue}</th>
                    <td>${text}</td>
                    ${generate_row(first)}
                    ${generate_row(second)}
                    ${generate_row(third)}
                    ${generate_row(fourth)}
                </tr>`);
        rowValue >= 1 ?
            table.innerHTML += items : table.innerHTML = items;
        rowValue++;
    }
}

function check_abusive(value) {
    return value !== '0' ? 'Abusive' : 'Non Abusive';
}

function generate_row(value) {
    return `<td> <span style="color: ${value === 'Abusive' ? 'red' : 'darkgreen'}"><strong>${value}</strong></span></td>`
}

function clearData() {
    const table = document.getElementsByTagName('tbody')[0];
    table.innerHTML = null;
}