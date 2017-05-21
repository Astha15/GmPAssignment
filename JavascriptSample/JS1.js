var items =  {   "Fruits" : ["Mango", "Apple"],
"Vegetables" : ["Onion", "Tomato"]
};

function onLoad() {
    var lists = document.getElementById('lists');
    lists.innerHTML = "";
    for(var i in items)
    {
        //creates an empty List with the title
        var list = document.createElement('li');
        list.appendChild(document.createTextNode(i));

        //to remove a list
        var removeListbtn = document.createElement('input');
        removeListbtn.type = 'button';
        removeListbtn.value = "Remove List";
        removeListbtn.id = i + '_remove';
        removeListbtn.addEventListener('click', removeList);
        list.appendChild(removeListbtn);

        var item = items[i];
        var listItems = document.createElement('ul');
        listItems.addEventListener('drop', dropping);
        listItems.addEventListener('dragenter', dragEnter);
        listItems.addEventListener('dragover', dragOver);
        //listItems.title = i;

        //to add items into an empty list
        for(var j in item)
        {
            var listItem = document.createElement('li');
            listItem.id = i + '_' + item[j];
            listItem.draggable = "true";

            listItem.addEventListener('dragstart', dragStarted);

            listItem.appendChild(document.createTextNode(item[j]));
            listItems.appendChild(listItem);

            //Adding remove button for every list item
            var removeItemBtn = document.createElement('input');
            removeItemBtn.type = 'button';
            removeItemBtn.id = i + '_' + item[j] + '_remove';
            removeItemBtn.value = 'Remove';
            removeItemBtn.addEventListener('click', removeItem);

            listItems.appendChild(removeItemBtn);
        }
        list.appendChild(listItems);

        //Textbox to add a new item to a list. Placed at the end of every list 
        var addItemsTextbox = document.createElement('input');
        addItemsTextbox.type = 'text';
        addItemsTextbox.placeholder = 'Add Items';
        addItemsTextbox.id = i + "_textbox";

        //Button to add a new item to a list. Placed at the end of every list 
        var addItemButton = document.createElement('input');        
        addItemButton.type = 'button';
        addItemButton.value = 'Add';
        addItemButton.id = i + "_button";
        addItemButton.addEventListener('click', addItem);

        list.appendChild(addItemsTextbox);
        list.appendChild(addItemButton);
        lists.appendChild(list);
    }
}


// Called when new item is added to any list
function addItem(event) {
    var id = event.target.id;
    var listName = id.split('_')[0];
    var listItem = document.getElementById(listName + '_textbox').value;
    document.getElementById(listName + '_textbox').value = "";
    items[listName].push(listItem);
    onLoad();
}

//Called when a new list is added
function addList() {
   
    var listName = document.getElementById("text2").value;
    document.getElementById("text2").value = "";
    items[listName] = [];
    onLoad();
}

//Called when any item of any list is removed
function removeItem(event) {
    var id = event.target.id;
    var listName = id.split('_')[0];
    var listItem = id.split('_')[1];
    
    var index = items[listName].indexOf(listItem);
    items[listName].splice(index, 1);
    onLoad();
}

function removeList(event) {
    var id = event.target.id;
    var listName = id.split('_')[0];
    delete items[listName];
    onLoad();
}

//Called when the dragging of any item in a list starts
function dragStarted(event) {
    var id = event.target.id;
    var listName = id.split('_')[0];
    var listItem = id.split('_')[1];

    var index = items[listName].indexOf(listItem);
    items[listName].splice(index, 1);

    event.dataTransfer.setData('text', listItem);
    event.dataTransfer.effectAllowed = 'move';
}

function dragOver(event) {
    event.preventDefault();
    return false;
}

function dragEnter(event) {
    event.preventDefault();
}

//Called when the list item is dropped into another list
function dropping(event) {
    var item = event.dataTransfer.getData('text');
    var id = event.target.id;
    var listName = id.split('_')[0];
    items[listName].push(item);
    onLoad();
}