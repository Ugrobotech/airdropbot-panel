function mount() {
  document.addEventListener("DOMContentLoaded", function () {
    fetchDataAndRenderTable(); // Fetch initial data

    // Example: Attach click event to notify button
    document
      .getElementById("data-table")
      .addEventListener("click", function (event) {
        if (event.target.classList.contains("notify-button")) {
          const itemId = event.target.getAttribute("data-id");
          notifyUser(itemId);
        }
      });

    // Example: Attach click event to edit button
    document
      .getElementById("data-table")
      .addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-button")) {
          const itemId = event.target.getAttribute("data-id");
          openEditModal(itemId);
        }
      });

    // Example: Attach click event to create new button
    document
      .getElementById("create-button")
      .addEventListener("click", function () {
        openCreateModal();
      });

    // Example: Attach submit event to create form
    document.getElementById("create-form");
    document.body.addEventListener("submit", function (event) {
      if (event.target.id === "create-form") {
        event.preventDefault();
        const formData = {
          name: document.getElementById("create-name").value,
          network: document.getElementById("create-network").value,
          categories: getCheckedCategories("create-categories"),
          description: document.getElementById("create-description").value,
        };
        console.log("FORMDATA: ", formData);
        createNewItem(formData);
      }
    });

    // Example: Attach submit event to update form
    document.getElementById("edit-form");
    document.body.addEventListener("submit", function (event) {
      if (event.target.id == "edit-form") {
        event.preventDefault();
        const formData = {
          name: document.getElementById("edit-name").value,
          network: document.getElementById("edit-network").value,
          categories: getCheckedCategories("edit-categories"),
          description: document.getElementById("edit-description").value,
        };
        console.log("updated item: ", formData);
        updateItem(formData);
      }
    });
  });
}

function openCreateModal() {
  // Add your modal display logic here for creating a new item
  const createModal = document.getElementById("createModal");
  createModal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeCreateModal()">&times;</span>
            <form id="create-form">
                <label for="create-name">Name:</label>
                <input type="text" id="create-name" required>
                
                <label for="create-network">Network:</label>
                <input type="text" id="create-network" required>
                
                <label>Categories:</label>
                <div>
                    <input type="checkbox" id="create-hottest" name="create-categories" value="hottest">
                    <label for="create-hottest">Hottest</label>
                </div>
                <div>
                    <input type="checkbox" id="create-latest" name="create-categories" value="latest">
                    <label for="create-latest">Latest</label>
                </div>
                <div>
                    <input type="checkbox" id="create-potential" name="create-categories" value="potential">
                    <label for="create-potential">Potential</label>
                </div>

                <label for="create-description">Description:</label>
                <textarea id="create-description" rows="4" required></textarea>

                <button type="submit">Create Item</button>
            </form>
        </div>
    `;
  createModal.style.display = "block";
  mount();
}

function closeCreateModal() {
  document.getElementById("createModal").style.display = "none";
}

function openEditModal(id) {
  // Add your modal display logic here for creating a new item
  const createModal = document.getElementById("createModal");
  createModal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeCreateModal()">&times;</span>
            <form id="edit-form">
                <label for="edit-name">Name:</label>
                <input type="text" id="edit-name" required>
                
                <label for="edit-network">Network:</label>
                <input type="text" id="edit-network" required>
                
                <label>Categories:</label>
                <div>
                    <input type="checkbox" id="edit-hottest" name="edit-categories" value="hottest">
                    <label for="edit-hottest">Hottest</label>
                </div>
                <div>
                    <input type="checkbox" id="edit-latest" name="edit-categories" value="latest">
                    <label for="edit-latest">Latest</label>
                </div>
                <div>
                    <input type="checkbox" id="edit-potential" name="edit-categories" value="potential">
                    <label for="edit-potential">Potential</label>
                </div>

                <label for="edit-description">Description:</label>
                <textarea id="edit-description" rows="4" required></textarea>

                <button type="submit">edit Item</button>
            </form>
        </div>
    `;
  createModal.style.display = "block";
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

function getCheckedCategories(checkboxName) {
  const checkboxes = document.getElementsByName(checkboxName);
  const checkedCategories = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedCategories.push(checkbox.value);
    }
  });
  return checkedCategories;
}

function createNewItem(formData) {
  // Add your AJAX request to send data to the backend here
  // Example:
  console.log("Creating new item with data:", formData);
  // You can add the actual AJAX request here to send formData to the backend
  // After successfully creating, you may want to close the modal and update the table
  closeCreateModal();
  // Fetch updated data and update the table
  fetchDataAndRenderTable();
}
function updateItem(formData) {
  // Add your AJAX request to send data to the backend here
  // Example:
  console.log("Creating new item with data:", formData);
  // You can add the actual AJAX request here to send formData to the backend
  // After successfully creating, you may want to close the modal and update the table
  closeCreateModal();
  // Fetch updated data and update the table
  fetchDataAndRenderTable();
}

function fetchDataAndRenderTable() {
  // Dummy data - replace this with actual data from your backend
  const dummyData = [
    {
      id: 1,
      name: "Item 1",
      network: "Network A",
      subscribed: true,
      catergory: "Latest",
    },
    {
      id: 2,
      name: "Item 2",
      network: "Network B",
      subscribed: false,
      catergory: "potential",
    },
    {
      id: 3,
      name: "Item 3",
      network: "Network C",
      subscribed: true,
      catergory: "Hottest",
    },
  ];

  generateTableRows(dummyData);
}

function generateTableRows(data) {
  const tableBody = document
    .getElementById("data-table")
    .getElementsByTagName("tbody")[0];

  // Clear existing rows
  tableBody.innerHTML = "";

  // Generate table rows
  data.forEach((item) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
    
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.network}</td>
      <td>${item.subscribed ? "Yes" : "No"}</td>
      <td>${item.catergory}</td>
      <td>
        <button class="edit-button" data-id="${item.id}">Edit</button>
        <button class="notify-button" data-id="${item.id}">Notify</button>
      </td>
    `;
  });
}

mount();
