import {toDo,toDos,projects,createProject,deleteTodo} from "./logic.js"

//FORM TO CREATE TODO
const toDoForm = ()=> {
    const form = document.createElement('form');
    const name = document.createElement('input');
    const date = document.createElement('input');
    const description = document.createElement('input');
    const priority = document.createElement('div');
    const low = document.createElement('input');
    const lowLabel = document.createElement('label');
    const mid = document.createElement('input');
    const midLabel = document.createElement('label');
    const high = document.createElement('input');
    const highLabel = document.createElement('label');
    const projectID = document.createElement('select');
    const add = document.createElement('button');
    const close = document.createElement('button');
    low.type = 'radio';
    mid.type = 'radio';
    high.type = 'radio';
    low.name = 'priority';
    mid.name = 'priority';
    high.name = 'priority';
    low.value = 'low';
    mid.value = 'low';
    high.value = 'high';
    lowLabel.htmlFor = 'low';
    lowLabel.textContent = 'Low';
    midLabel.htmlFor = 'mid';
    midLabel.textContent = 'Mid';
    highLabel.htmlFor = 'high';
    highLabel.textContent = 'High';   
    priority.append(low,lowLabel,mid,midLabel,high,highLabel);
    form.append(name,date,description,priority,projectID,add,close);
    form.id = 'form';
    name.id = 'name';
    date.id = 'date';
    description.id = 'description';
    priority.id = 'priority';
    low.id = 'lowPriority';
    mid.id = 'midPriority';
    high.id = 'highPriority';
    projectID.id = 'projectID';
    add.id = 'addToDo';
    close.id = 'closeForm';
    add.type = 'button';
    close.type = 'button';
    add.addEventListener('click',()=> {
        addToDo();
        checkUsedProject();
        triggerChangeEvent('change');
        hideForm('form');
        clearForm();
    });
    close.addEventListener('click',()=> {
        hideForm('form');
        clearForm();
    });
    return form;
}

//REFRESH PROJECT OPTIONS, STORE PROJECT ID
const refreshProjects = ()=> {
    document.getElementById('projectID').options.length = projects.length;
    for(let i = 0; i < projects.length; i++) {
        document.getElementById('projectID').options[i].textContent = projects[i].getName();
        document.getElementById('projectID').options[i].dataset.projectID = projects[i].getID();
    }
}

//DISPLAY FORM
const displayForm = (formid)=> {
    document.getElementById(formid).style.display = "flex";
}

//HIDE FORM
const hideForm = (formid)=> {
    document.getElementById(formid).style.display = "none";
}

//TAKES VALUES INSERTED BY USER TO CREATE NEW TODO AND PUSH IT TO THE ARRAY / CLEAR THE FORM
const addToDo = ()=> {   
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('form').elements['priority'].value;
    const projectID = document.getElementById('projectID').options[document.getElementById('projectID').selectedIndex].dataset.projectID; //ACCESS DATASET OF SELECTED OPTION
    toDos.push(toDo(name,date,description,priority,projectID));
}

const clearForm = ()=> {
    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('description').value = '';
    document.getElementById('priority').value = '';
    document.getElementById('projectID').value = '';
}

//TAKES A TODO AND GENERATES AN ELEMENT TO DISPLAY
const elementToDo = (displayMe)=> {
    const elementToDo = document.createElement('div');
    const nameDisplay = document.createElement('div');
    const dateDisplay = document.createElement('div');
    const descriptionDisplay = document.createElement('div');
    const priorityDisplay = document.createElement('div');
    const projectDisplay = document.createElement('div');
    const checkDisplay = document.createElement('div');
    const details = document.createElement('button');
    const removeTodo = document.createElement('button');
    const editTodo = document.createElement('button');
    elementToDo.dataset.todoid = displayMe.getProjectID();
    nameDisplay.textContent = displayMe.getName();
    dateDisplay.textContent = displayMe.getDate();
    descriptionDisplay.textContent = displayMe.getDescription();
    priorityDisplay.textContent = displayMe.getPriority();  //CAMBIAR POR COLOR
    projectDisplay.textContent = displayMe.getProjectID();  //NO
    checkDisplay.textContent = displayMe.getCheckState();  //CAMBIAR POR SELECTOR GREEN/RED
    descriptionDisplay.style.display = 'none';
    editTodo.style.display = 'none';
    elementToDo.append(nameDisplay,dateDisplay,descriptionDisplay,priorityDisplay,projectDisplay,checkDisplay,details,removeTodo,editTodo);
    elementToDo.classList.add('defaultDisplay');
    details.addEventListener('click',(e)=>{
        changeDisplayClass(e.target.parentNode);
        displayDescriptionEdit(e.target.parentNode);
    });
    removeTodo.addEventListener('click',()=>{
        deleteTodo(toDos.indexOf(displayMe));
        removeTodoElement(elementToDo);
    })
    return elementToDo;
}

//APPEND TODO
const appendTodo = (appendMe)=> {
    document.getElementById('todosList').appendChild(elementToDo(appendMe));
}

//REMOVE TODO ELEMENT
const removeTodoElement = (removeMe)=> {
    removeMe.parentNode.removeChild(removeMe);
}

//REMOVE ALL TODOS ELEMENTS
const removeAllTodosElements = ()=> {
    const todosElements = document.getElementById('todosList').childNodes;
    console.log(todosElements);
    while (todosElements.length > 0) {
        for(let i = 0; i < toDos.length; i++) {
            removeTodoElement(todosElements[0]);
        }
    }
}

//CLASSES CHANGE THE SIZE AND CONTENT OF EACH TODO DISPLAY
const changeDisplayClass = (parentNode)=> {
   parentNode.classList.toggle('defaultDisplay');
   parentNode.classList.toggle('detailDisplay');
}

const displayDescriptionEdit = (parentNode)=> {
    if(parentNode.classList.contains('defaultDisplay')) {
        parentNode.childNodes[2].style.display = 'none';  //DESCRIPTION
        parentNode.childNodes[8].style.display = 'none';  //EDIT BUTTON
    }
    else {
        parentNode.childNodes[2].style.display = 'block';
        parentNode.childNodes[8].style.display = 'block';
    } 
}

//PROJECT FORM
const projectForm = ()=> {
    const container = document.createElement('div');
    const textIndication = document.createElement('div');
    const nameInput = document.createElement('input');
    const create = document.createElement('button');
    const close = document.createElement('button');
    container.append(textIndication,nameInput,create,close);
    container.id = 'projectForm';
    create.addEventListener('click', ()=> {
        createProject(nameInput.value);
        projectList();                       //que no se borre todo y volver, sino queda unchecked         
        hideForm('projectForm');
        nameInput.value = '';
    //    displayCheckedProjects()           //que muestre los pertenecientes a los proyectos checkeados en este momento
    });
    close.addEventListener('click',hideForm.bind(this,'projectForm'));
    return container
}

//UPDATE PROJECT LIST
const checkUsedProject = ()=> {
    const projectID = document.getElementById('projectID').options[document.getElementById('projectID').selectedIndex].dataset.projectID;
    const checkbox = document.querySelector(`div[data-projectid = "${projectID}"]`).childNodes[1];
    const project = projects[projectID];
    if (checkbox.checked == false) checkbox.checked = true;
}

//TRIGGER CHANGE EVENT
const triggerChangeEvent = (eventName)=> {
    const projectID = document.getElementById('projectID').options[document.getElementById('projectID').selectedIndex].dataset.projectID;
    const element = document.querySelector(`div[data-projectid = "${projectID}"]`).childNodes[1]
    const event = document.createEvent("HTMLEvents");
    event.initEvent(eventName, false, true);
    element.dispatchEvent(event);
}

//EMPTY PROJECT LIST     no se usa, reutilizar par delete project
const emptyProjectList = ()=> {
    const projectsList = document.getElementById('projectsList');
    while (projectsList.lastChild) projectsList.removeChild(projectsList.lastChild);
}

//PROJECT LIST
const projectList = ()=> {
    //generar "newprojects" en base a projectid que no existan en el DOM, filter projects¿?
    // const newProjects 
    // console.log(newProjects);
    projects.forEach((project)=> {     //esto se va a cambiar por new projects
        const projectDisplay = document.createElement('div');
        const projectName = document.createElement('div');
        const displayCheckbox = document.createElement('input');
        projectDisplay.dataset.projectid = project.getID();
        displayCheckbox.type = 'checkbox';
        projectName.textContent = project.getName();
        displayCheckbox.classList.add('displayCheckbox');
        displayCheckbox.addEventListener('change',extractTodosForDisplay.bind(this,project,displayCheckbox));
        projectDisplay.append(projectName,displayCheckbox);
        document.getElementById('projectsList').appendChild(projectDisplay);
    })
}

//DISPLAY (APPEND/REMOVE) PROJECT
const extractTodosForDisplay = (project,displayCheckbox)=> {
    const toDos = project.projectToDos();
    toDos.forEach(todo => {
        displayIfChecked(todo,displayCheckbox);
    });
}

//DISPLAY CHECKED PROJECTS
const displayIfChecked = (todo,displayCheckbox)=> {
    if(todo !== "") {
        if (displayCheckbox.checked == true) {
            appendTodo(todo);
        }
        else if (displayCheckbox.checked == false)  {
                const listToRemove = document.querySelectorAll(`div[data-todoid = "${todo.getProjectID()}"]`);
                removeTodoElement(listToRemove[0]);
            }
        }
}

//ITERATE OVER PROJECTS AND CHECKBOX


export {projectForm,refreshProjects,projectList,toDoForm,displayForm,removeAllTodosElements}


//por que lista ya existente proyecto
//SEGUIR ACA: iterar y pasar todos por EXTRACT!!!
