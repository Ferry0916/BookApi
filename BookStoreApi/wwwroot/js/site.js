﻿const uri = 'api/Books';
let books = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addPriceTextbox = document.getElementById('add-price');
    const addCategoryTextbox = document.getElementById('add-category');
    const addAuthorTextbox = document.getElementById('add-author');

    const item = {
        name: addNameTextbox.value.trim(),
        price: addPriceTextbox.value.trim(),
        category: addCategoryTextbox.value.trim(),
        author: addAuthorTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addPriceTextbox.value = '';
            addCategoryTextbox.value = '';
            addAuthorTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = books.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-price').value = item.price;
    document.getElementById('edit-category').value = item.category;
    document.getElementById('edit-author').value = item.author;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: itemId,
        name: document.getElementById('edit-name').value.trim(),
        price: document.getElementById('edit-price').value.trim(),
        category: document.getElementById('edit-category').value.trim(),
        author: document.getElementById('edit-author').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'book' : 'books';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('books');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;


        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.Name);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        let textNode2 = document.createTextNode(item.price);
        td3.appendChild(textNode2);

        let td4 = tr.insertCell(3);
        let textNode3 = document.createTextNode(item.category);
        td4.appendChild(textNode3);

        let td5 = tr.insertCell(4);
        let textNode4 = document.createTextNode(item.author);
        td5.appendChild(textNode4);


        let td6 = tr.insertCell(5);
        td6.appendChild(editButton);

        let td7 = tr.insertCell(6);
        td7.appendChild(deleteButton);
    });

    books = data;
}