function loadOrders() {
    fetch("http://localhost:3000/orders")
    .then(res => res.json())
    .then(data => {
        let table = "<tr><th>Name</th><th>Product</th><th>Qty</th><th>Total</th></tr>";
        data.forEach(o => {
            table += `<tr>
                <td>${o.name}</td>
                <td>${o.product}</td>
                <td>${o.quantity}</td>
                <td>${o.total}</td>
            </tr>`;
        });
        document.getElementById("ordersTable").innerHTML = table;
    });
}

function highestOrder() {
    fetch("http://localhost:3000/highest")
    .then(res => res.json())
    .then(data => {
        document.getElementById("highest").innerText =
            "Highest Order: ₹" + data[0].total;
    });
}

function activeCustomer() {
    fetch("http://localhost:3000/active")
    .then(res => res.json())
    .then(data => {
        document.getElementById("active").innerText =
            "Most Active Customer: " + data[0].name;
    });
}