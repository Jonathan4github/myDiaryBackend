const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "./signin.html";
}

const getAllEntry = () => {
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    }
  };
  fetch("http://localhost:3000/api/v1/entries", option)
    .then(res => res.json())
    .then(data => {
      let userEntry = "";
      const datas = data.entries;
      document.getElementById("total-entries").innerHTML = `Total entries: ${datas.length}`;
      datas.map(entry => {
        userEntry += `<tr>
        <td>${entry.created_date}</td>
        <td>${entry.title}</td>
        <td>${entry.entry.split(" ")[0]} ${entry.entry.split(" ")[1]} ${entry.entry.split(" ")[2]}...</td>
        <td align="center"><a><i class="fa fa-eye"></i></a></td>
      </tr > `;
      });
      document.getElementById("tbody").innerHTML = userEntry;
    });
};
