const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

/*
for (item of menuItems) {
    if (currentPage == item.getAttribute("href")) {
        item.classList.add("active")
    }
}
*/

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

// Paginação
// totalPages = 20
// selectedPage = 15
// [1, ..., 13, 14, 15, 16, 17, ..., 20]

let totalPages = 20,
    selectedPage = 15,
    pages = []

for(let currentPage = 1; currentPage <= totalPages; currentPage++) {

    if (currentPage == 1 || currentPage == totalPages) {
        pages.push(currentPage)
    }
}

console.log(pages)