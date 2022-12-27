import axios from "axios";

export const postImageHandler = async (document: any) => {
    const form = new FormData();
    form.append("image", document.imageInput);
    form.append("title", document.title);
    form.append("content", document.content);
    form.append("currentUser", document.currentUser);
    const data = await axios("http://localhost:3000/api/posts/post", {
      method: "POST",
      data: form,
    });
    console.log(data);
  };