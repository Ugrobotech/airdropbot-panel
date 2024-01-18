function mount() {
  document.addEventListener("DOMContentLoaded", async function () {
    const allData = await fetchDataAndRenderTable(); // Fetch initial data

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
          openEditModal(itemId, allData);
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
          category: getCheckedCategories("create-categories"),
          description: document.getElementById("create-description").value,
          steps: document.getElementById("create-steps").value,
          cost: document.getElementById("create-price").value,
        };
        console.log("FORMDATA: ", formData);
        createNewItem(formData);
      }
    });

    // Example: Attach submit event to update form
    document.getElementById("edit-form");
    document.body.addEventListener("submit", async function (event) {
      if (event.target.id == "edit-form") {
        const itemId = event.target.getAttribute("data-id");
        console.log("this is Item Id :", itemId);
        event.preventDefault();

        const data = {
          name: document.getElementById("edit-name").value,
          network: document.getElementById("edit-network").value,
          category: getCheckedCategories("edit-categories"),
          description: document.getElementById("edit-description").value,
          steps: document.getElementById("edit-steps").value,
          cost: document.getElementById("edit-price").value,
        };

        const formData = await createFormData(data);

        console.log("updated formitem: ", formData);
        updateItem(formData, itemId);
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
                    <input type="checkbox" id="create-hottest" name="create-categories" value="HOTTEST">
                    <label for="create-hottest">Hottest</label>
                </div>
                <div>
                    <input type="checkbox" id="create-latest" name="create-categories" value="LATEST">
                    <label for="create-latest">Latest</label>
                </div>
                <div>
                    <input type="checkbox" id="create-potential" name="create-categories" value="POTENTIAL">
                    <label for="create-potential">Potential</label>
                </div>
<br>
                <label for="create-description">Description:</label>
                <textarea id="create-description" rows="4" required></textarea>
                <br>
                 <label for="create-steps">Steps/Task:</label>
                <textarea id="create-steps" rows="4" required></textarea>
<br>
  <label for="create-price">Price:</label>
                <input type="text" id="create-price" required>
                <br>
                <button type="submit">Create Item</button>
            </form>
        </div>
    `;

  // Destroy existing TinyMCE instances if they exist
  if (tinymce.get("create-description") || tinymce.get("create-steps")) {
    tinymce.get("create-description").remove();
    tinymce.get("create-steps").remove();
  }
  // Add the following code to initialize TinyMCE for the create-description textarea
  tinymce.init({
    selector: "#create-description",
    height: 200,
    plugins: "advlist autolink lists link image charmap print preview anchor",
    toolbar:
      "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    setup: function (editor) {
      editor.on("change", function () {
        tinymce.triggerSave();
      });
    },
  });

  // Add the following code to initialize TinyMCE for the create-steps textarea
  tinymce.init({
    selector: "#create-steps",
    height: 200,
    plugins: "advlist autolink lists link image charmap print preview anchor",
    toolbar:
      "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    setup: function (editor) {
      editor.on("change", function () {
        tinymce.triggerSave();
      });
    },
  });

  createModal.style.display = "block";
  // mount();
}

function closeCreateModal() {
  document.getElementById("createModal").style.display = "none";
}

function openEditModal(id, data) {
  // Add your modal display logic here for creating a new item
  console.log("this is the data: ", id);
  const dataToEDit = data.find((element) => element.id === +id);
  console.log("this is the data to edit: ", dataToEDit);
  const editModal = document.getElementById("editModal");
  editModal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeEditModal()">&times;</span>
            <form id="edit-form" data-id="${id}">
                <label for="edit-name">Name:</label>
                <input type="text" id="edit-name"  value="${dataToEDit.name}" >
                
                <label for="edit-network">Network:</label>
                <input type="text" id="edit-network" value="${dataToEDit.network}" >
                
                <label>Categories:</label>
                <div>
                    <input type="checkbox" id="edit-hottest" name="edit-categories" value="HOTTEST">
                    <label for="edit-hottest">Hottest</label>
                </div>
                <div>
                    <input type="checkbox" id="edit-latest" name="edit-categories" value="LATEST">
                    <label for="edit-latest">Latest</label>
                </div>
                <div>
                    <input type="checkbox" id="edit-potential" name="edit-categories" value="POTENTAL">
                    <label for="edit-potential">Potential</label>
                </div>
<br>
                <label for="edit-description">Description:</label>
                <textarea id="edit-description" rows="3"></textarea>
<br>
        <label for="edit-steps">Steps/Task:</label>
                <textarea id="edit-steps" rows="4"  ></textarea>
                <br>
 <label for="edit-price">Price:</label>
                <input type="text" id="edit-price" value="${dataToEDit.cost}" required>
                <br>
                <button type="submit">edit Item</button>
            </form>
        </div>
    `;
  // Destroy existing TinyMCE instances if they exist
  if (tinymce.get("edit-description") || tinymce.get("edit-steps")) {
    tinymce.get("edit-description").remove();
    tinymce.get("edit-steps").remove();
  }

  tinymce.init({
    selector: "#edit-description",
    height: 200,
    plugins: "advlist autolink lists link image charmap print preview anchor",
    toolbar:
      "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    setup: function (editor) {
      editor.on("change", function () {
        tinymce.triggerSave();
      });
    },
  });

  // Add the following code to initialize TinyMCE for the create-steps textarea
  tinymce.init({
    selector: "#edit-steps",
    height: 200,
    plugins: "advlist autolink lists link image charmap print preview anchor",
    toolbar:
      "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    setup: function (editor) {
      editor.on("change", function () {
        tinymce.triggerSave();
      });
    },
  });

  editModal.style.display = "block";
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
  return checkedCategories[0];
}

async function createNewItem(formData) {
  console.log("Creating new item with data:", formData);
  // You can add the actual AJAX request here to send formData to the backend
  const post = await postData("http://localhost:3000/admin", formData);
  console.log(post);
  if (post) {
    // After successfully creating, you may want to close the modal and update the table
    alert("Data created succeefully");
    closeCreateModal();
    // Fetch updated data and update the table
    fetchDataAndRenderTable();
  }
}
async function updateItem(formData, id) {
  // Add your AJAX request to send data to the backend here
  // Example:
  console.log("Updating new item with data:", formData);
  console.log("Updating new item with id:", id);
  // You can add the actual AJAX request here to send formData to the backend
  const edit = await editData(`http://localhost:3000/admin/${id}`, formData);
  console.log(edit);
  // After successfully creating, you may want to close the modal and update the table
  if (edit) {
    alert("data Edited successfully");
    closeEditModal();
    // Fetch updated data and update the table
    fetchDataAndRenderTable();
  }
}

async function fetchDataAndRenderTable() {
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

  const Data = await fetchData("http://localhost:3000/admin");
  const userCount = await fetchData("http://localhost:3000/admin/users");
  const subCount = await fetchData("http://localhost:3000/admin/subs");
  console.log(Data);
  updateUserCount(userCount, subCount);
  generateTableRows(Data);
  return Data;
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
      <td>${item.description}</td>
       <td>${item.steps}</td>
      <td>${item.category}</td>
       <td>${item.cost}</td>
      <td>
        <button class="edit-button" data-id="${item.id}">Edit</button> 
        <button class="delete-button" data-id="${item.id}">Delete</button>
        <button class="notify-button" data-id="${item.id}">Notify</button>
      </td>
    `;
  });
}

async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function postData(url, payload) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function editData(url, payload) {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed for your PATCH request
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

function updateUserCount(newCount, subCount) {
  const subUserCountElement = document.getElementById("subscribedCount");
  const userCountElement = document.getElementById("userCount"); // Replace with your actual HTML element ID
  if (userCountElement && subUserCountElement) {
    subUserCountElement.textContent = subCount;
    userCountElement.textContent = newCount;
  } else {
    console.error("User count element not found.");
  }
}

async function createFormData(data) {
  let formData = {};

  // Assuming 'data' is an object with key-value pairs
  for (const key in data) {
    // Check if the value is not an empty string
    if (data[key] !== "") {
      formData = { ...formData, [key]: data[key] };
    }
  }

  console.log(formData);
  return formData;
}

// function convertHtmlToTelegramFormat(htmlContent) {
//   // Replace HTML tags with Telegram text styles
//   let formattedContent = htmlContent
//     .replace(/<b>/g, "*") // Bold
//     .replace(/<\/b>/g, "*")
//     .replace(/<strong>/g, "*") // Bold
//     .replace(/<\/strong>/g, "*")
//     .replace(/<i>/g, "_") // Italic
//     .replace(/<\/i>/g, "_")
//     .replace(/<u>/g, "__") // Underline
//     .replace(/<\/u>/g, "__")
//     .replace(/<code>/g, "`") // Code
//     .replace(/<\/code>/g, "`")
//     .replace(/<s>/g, "~") // Strikethrough
//     .replace(/<\/s>/g, "~")
//     .replace(/<br>/g, "\n") // Line break
//     .replace(/<div>/g, "\n")
//     .replace(/<\/div>/g, "")
//     .replace(/<p>/g, "")
//     .replace(/<\/p>/g, "\n")
//     .replace(/<ul>/g, "\n") // Unordered list
//     .replace(/<\/ul>/g, "")
//     .replace(/<ol>/g, "\n") // Ordered list
//     .replace(/<\/ol>/g, "");

//   // Convert multiple consecutive spaces to a single space
//   formattedContent = formattedContent.replace(/\s+/g, " ");

//   // Replace list items and tabs
//   formattedContent = formattedContent
//     .replace(/<li>/g, "\t• ")
//     .replace(/<\/li>/g, "\n");

//   return formattedContent.trim();
// }

mount();
