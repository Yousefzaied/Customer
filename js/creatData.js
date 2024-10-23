
let inputName = document.getElementById('inputName');
let inputJob = document.getElementById('inputJob');
let inputPhone = document.getElementById('inputPhone');
let inputExperince = document.getElementById('inputExp');
let btn = document.getElementById('submit');

// update data
let isUpdating = false;
let currentUpdateIndex = -1;

// Retrieve existing data from local storage if available
let dataCustomer = JSON.parse(localStorage.getItem('customers')) || [];

 // create data  => this include Tow Function 1- update data    2- create data
 function createOrUpdataData() {

  if (isUpdating === true) {
    updataData();
} else {
    createData();
}
    showData();

  }

  // create data
function createData() {
  // create data object 
  let newDataCustomer = {
    name: inputName.value,
    job: inputJob.value,
    experince: inputExperince.value,
    phone: inputPhone.value
}

// Push the new data to the array and save it in local storage
dataCustomer.push(newDataCustomer);
localStorage.setItem('customers', JSON.stringify(dataCustomer));
}

// updat data
function updataData() {
    dataCustomer[currentUpdateIndex].name = inputName.value;
    dataCustomer[currentUpdateIndex].job = inputJob.value;
    dataCustomer[currentUpdateIndex].experince = inputExperince.value;
    dataCustomer[currentUpdateIndex].phone = inputPhone.value;

    // Save updated data back to local storage
    localStorage.setItem('customers', JSON.stringify(dataCustomer));

    // Reset the form and the button text
    btn.innerHTML = 'Submit';
    isUpdating = false;
    currentUpdateIndex = -1;
}

//   Show data
  function showData() {
    let table = ``;

    for(let i = 0; i < dataCustomer.length; i++) {
      document.getElementById('customer').innerHTML = `Number Of Customer:${i+1}`;
        table += `
             <tr>
                    <td id= "li">${i+1}</td>
                    <td>${dataCustomer[i].name}</td>
                    <td>${dataCustomer[i].job}</td>
                    <td>${dataCustomer[i].experince}year</td>
                    <td>
                        <button onclick="updatData(event, ${i}) " class="btn btn-sm btn-primary">Update</button>
                        <button onclick="deletData(event,${i})" class="btn btn-sm btn-danger">Delete</button>
                    </td>
              </tr>
        `;
    }

    // Correct the assignment to the innerHTML of the tbody, not the element itself
    document.getElementById('tbody').innerHTML = table;
  }

  showData();


  // Delet data
function deletData(event, index) {
  event.preventDefault();

  // Remove item from dataCustomer array
  dataCustomer.splice(index, 1);

  // Save updated array to localStorage
  localStorage.setItem('customers', JSON.stringify(dataCustomer));

  showData();
}


// updat data
function updatData(event, index) {
  event.preventDefault();
  
 
    // Set current data in input fields
    inputName.value = dataCustomer[index].name;
    inputJob.value = dataCustomer[index].job;
    inputExperince.value = dataCustomer[index].experince;
    inputPhone.value = dataCustomer[index].phone;
  inputName.focus();

  scroll({
    top:0,
})

  btn.innerHTML = 'Update';
  isUpdating = true;
  currentUpdateIndex = index;
}
