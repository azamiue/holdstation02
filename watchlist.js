var userInput = [];
var api =
  "https://gateway.holdstation.com/services/launchpad/api/staking/wallets?list=";

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
});

// Tạo header cho bảng
var headerRow = document.createElement("tr");

var IndexHeader = document.createElement("th");
IndexHeader.textContent = "Index";
headerRow.appendChild(IndexHeader);

var addressHeader = document.createElement("th");
addressHeader.textContent = "Address";
headerRow.appendChild(addressHeader);
watchlist.appendChild(headerRow);

// Thêm header vào bảng

saveItem = [];
for (var i = 0; i < localStorage.length; i++) {
  let savedItemCache = JSON.parse(localStorage.getItem(i));

  saveItem.push(savedItemCache.address);
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

var AdressUnique = saveItem.filter(onlyUnique);
console.log(AdressUnique);

for (var i = 0; i < AdressUnique.length; i++) {
  var dataRow = document.createElement("tr");

  var indexCell = document.createElement("td");
  indexCell.textContent = i;
  dataRow.appendChild(indexCell);

  var addressCell = document.createElement("td");
  addressCell.textContent = AdressUnique[i];
  dataRow.appendChild(addressCell);

  watchlist.appendChild(dataRow);
}

async function returnText_wlist() {
  var input = document.getElementById("UserInput").value;
  var inputArray = input.split(",");
  console.log(inputArray);

  for (let key of inputArray) {
    var api_key = api + key;
    console.log(key);
    try {
      const res = await fetch(api_key);
      if (res.status == 200) {
        const data = await res.json();
        if (AdressUnique.includes(key)) {
          alert(`${key} already exist`);
        } else {
          // lưu vào localstorage
          let savedItem_cache = JSON.stringify(data[0]);
          console.log(savedItem_cache);
          snum = localStorage.length;
          // Lưu lịch sử input // LocalStorage
          localStorage.setItem(`${snum++}`, savedItem_cache);
          savedItemindex = AdressUnique.length;

          var dataRow = document.createElement("tr");

          var indexCell = document.createElement("td");
          indexCell.textContent = savedItemindex;
          dataRow.appendChild(indexCell);

          savedItemindex++;

          var addressCell = document.createElement("td");
          addressCell.textContent = key;
          dataRow.appendChild(addressCell);

          watchlist.appendChild(dataRow);
        }
      } else {
        alert(`Could not find address: ${key}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  location.reload();
  console.log("All requests completed");
}

let clearLocalStorageLink = document.getElementById("clearLocalStorageLink");

// Gán sự kiện click cho thẻ a
clearLocalStorageLink.addEventListener("click", function () {
  localStorage.clear();
  alert("Local Storage cleared");
  location.reload();
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// // Tạo header cho bảng
// var headerRow = document.createElement("tr");

// var IndexHeader = document.createElement("th");
// IndexHeader.textContent = "Index";
// headerRow.appendChild(IndexHeader);

// var addressHeader = document.createElement("th");
// addressHeader.textContent = "Address";
// headerRow.appendChild(addressHeader);

// // Thêm header vào bảng
// watchlist.appendChild(headerRow);

// saveItem = [];
// for (var i = 0; i < localStorage.length; i++) {
//   let savedItemCache = JSON.parse(localStorage.getItem(i));

//   saveItem.push(savedItemCache.address);
// }

// function onlyUnique(value, index, array) {
//   return array.indexOf(value) === index;
// }

// var AdressUnique = saveItem.filter(onlyUnique);
// console.log(AdressUnique);

// for (var i = 0; i < AdressUnique.length; i++) {
//   var dataRow = document.createElement("tr");

//   var indexCell = document.createElement("td");
//   indexCell.textContent = i;
//   dataRow.appendChild(indexCell);

//   var addressCell = document.createElement("td");
//   addressCell.textContent = AdressUnique[i];
//   dataRow.appendChild(addressCell);

//   watchlist.appendChild(dataRow);
// }

// =========================================================================
