const commentFormHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    const post_id = event.target.getAttribute("data-id");
    const description = document
      .querySelector(".description-input")
      .value.trim();

    console.log(post_id);
    console.log(description);

    if (description) {
      console.log("new comment");

      const response = await fetch("/api/comments/", {
        method: "POST",
        body: JSON.stringify({ description, post_id }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/posts/" + post_id);
      } else {
        alert(response.statusText);
      }
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
