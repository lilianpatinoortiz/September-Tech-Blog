const editPostFormHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    console.log("edit");

    const id = event.target.getAttribute("data-id");
    const name = document.querySelector("#title").value.trim();
    const description = document.querySelector("#content").value.trim();

    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name, description }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete the post");
    }
  }
};

document
  .querySelector(".editpost-form")
  .addEventListener("submit", editPostFormHandler);

document
  .querySelector(".delete-post-button")
  .addEventListener("click", delButtonHandler);
