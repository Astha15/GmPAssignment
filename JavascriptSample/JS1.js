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
        addButton(i + '_remove', "Remove List", removeList, list);

        var item = items[i];
        var listItems = document.createElement('ul');

        //to add items into an empty list
        for(var j in item)
        {
            var listItem = document.createElement('li');
            listItem.id = i + '_' + item[j];
            listItem.draggable = "true";

            listItem.addEventListener('dragstart', dragDropEvents.dragStarted);
            listItem.addEventListener('drop', dragDropEvents.dropping);
            listItem.addEventListener('dragenter', dragDropEvents.preventDrag);
            listItem.addEventListener('dragover', dragDropEvents.preventDrag);

            listItem.appendChild(document.createTextNode(item[j]));
            listItems.appendChild(listItem);

            //Adding remove button for every list item
            addButton(i + '_' + item[j] + '_remove', "Remove", removeItem, listItems);
        }
        list.appendChild(listItems);

        //Textbox to add a new item to a list. Placed at the end of every list 
        var addItemsTextbox = document.createElement('input');
        addItemsTextbox.type = 'text';
        addItemsTextbox.placeholder = 'Add Items';
        addItemsTextbox.id = i + "_textbox";
        list.appendChild(addItemsTextbox);

        //Button to add a new item to a list. Placed at the end of every 
        addButton(i + '_button', "Add", addItem, list);

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
    if (!items[listName]) {
        document.getElementById("text2").value = "";
        items[listName] = [];
        onLoad();
    }
    else {
        alert('The list name already exists');
    }

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

//Called when a list is removed
function removeList(event) {
    var id = event.target.id;
    var listName = id.split('_')[0];
    var childCount = document.getElementById('lists').childElementCount;
    if (childCount > 2) {
        delete items[listName];
        onLoad();
    }
    else {
        alert('There should be atleast 2 lists');
    }
}

//Contains drag and drop events

var dragDropEvents = {

    dragStarted : function dragStarted(event) {
        var id = event.target.id;
        var listName = id.split('_')[0];
        var listItem = id.split('_')[1];

        var index = items[listName].indexOf(listItem);
        items[listName].splice(index, 1);

        event.dataTransfer.setData('text', listItem);
        event.dataTransfer.effectAllowed = 'move';
    },

    preventDrag : function (event) {
        event.preventDefault();
    },

    dropping : function (event) {
        var item = event.dataTransfer.getData('text');
        var id = event.target.id;
        var listName = id.split('_')[0];
        var listItem = id.split('_')[0];
        var index = items[listName].indexOf(listItem);
        items[listName].splice(index, 0, item);
        onLoad();
    }
}

//Creates and adds a new button
function addButton(id, value, clickFunction, parent) {

    var btn = document.createElement('input');
    btn.type = 'button';
    btn.id = id;
    btn.value = value;
    btn.addEventListener('click', clickFunction);

    parent.appendChild(btn);
}