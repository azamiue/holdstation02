var userInput = [];
var api =
  "https://gateway.holdstation.com/services/launchpad/api/staking/wallets?list=";

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
});

async function returnText() {
  var input = document.getElementById("UserInput").value;
  var inputArray = input.split(",");

  var resultTable = document.getElementById("resultTable");

  resultTable.innerHTML = "";

  // Tạo header cho bảng
  var headerRow = document.createElement("tr");

  var addressHeader = document.createElement("th");
  addressHeader.textContent = "Address";
  headerRow.appendChild(addressHeader);

  var pendingRewardHeader = document.createElement("th");
  pendingRewardHeader.textContent = "Pending Reward";
  headerRow.appendChild(pendingRewardHeader);

  var harvestedRewardHeader = document.createElement("th");
  harvestedRewardHeader.textContent = "Harvested Reward";
  headerRow.appendChild(harvestedRewardHeader);

  // Thêm header vào bảng
  resultTable.appendChild(headerRow);

  snum = 0;

  for (let key of inputArray) {
    var api_key = api + key;
    console.log(key);

    try {
      const res = await fetch(api_key);
      if (res.status == 200) {
        const data = await res.json();

        // lưu vào localstorage
        let savedItem_cache = JSON.stringify(data[0]);
        console.log(savedItem_cache);
        snum = localStorage.length;
        // Lưu lịch sử input // LocalStorage
        localStorage.setItem(`${snum++}`, savedItem_cache);
        savedItemindex = snum;

        // Tạo dòng mới cho mỗi dữ liệu JSON
        var dataRow = document.createElement("tr");

        var addressCell = document.createElement("td");
        addressCell.textContent = data[0].address;
        dataRow.appendChild(addressCell);

        var pendingRewardCell = document.createElement("td");
        pendingRewardCell.textContent = data[0].pendingReward;
        dataRow.appendChild(pendingRewardCell);

        var harvestedRewardCell = document.createElement("td");
        harvestedRewardCell.textContent = data[0].harvestedReward;
        dataRow.appendChild(harvestedRewardCell);

        // Thêm dòng vào bảng
        resultTable.appendChild(dataRow);
        var hasValidData = true;
      } else {
        alert(`Cannot to find address: ${key}`);
        // Kiểm tra flag và xóa headerRow nếu không có dữ liệu hợp lệ
        if (!hasValidData) {
          resultTable.innerHTML = "";
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  console.log("All requests completed");
}
