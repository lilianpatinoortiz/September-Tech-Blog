const commentFormHandler = async (event) => {
  event.preventDefault();
  alert("AHHAHA");
  const description = document.querySelector("#description").value.trim();
  // this code could be improved :(
  const currentUrl = window.location.href;
  const post_id = currentUrl.split("posts/")[1];
  console.log(post_id);

  if (description & post_id) {
    const response = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({ description, post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      //document.location.replace("/dashboard");
      alert(response.statusText);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
