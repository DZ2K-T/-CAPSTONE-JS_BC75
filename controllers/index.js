//gọi api lấy danh sách sp từ server
// const apiURL = "https://6700f1ceb52042b542d65450.mockapi.io/api/v1/product"; // Ví dụ: lấy sản phẩm

let productList = null;
let fetchProductList = () => {

    axios({
        url: "https://raw.githubusercontent.com/DZ2K-T/-CAPSTONE-JS_BC75/refs/heads/main/demo/product.json?timestamp=" + new Date().getTime(),
        method: "GET",
    })
        .then((res) => {
            console.log("res:", res);
            productList = res.data
            renderProduct(productList);
            //render ui

            let sanPhamDaThem = getLocalStorage('product');
            if (sanPhamDaThem) {
                gioHang(sanPhamDaThem);
            }

        })
        .catch((err) => {
            console.log("err:", err);
        });
}

let renderProduct = (productList) => {
    let content = "";
    productList.forEach((product) => {
        content += `
        <div class="product-item--box">
        <img src="${product.img}" alt="${product.name}" width="100">
        <h2>${product.name}</h2>
        <p>Giá: $${product.price}</p>
        <p>Màn hình: ${product.screen}</p>
        <p>Camera sau: ${product.backCamera}</p>
        <p>Camera trước: ${product.frontCamera}</p>
        <p>Mô tả: ${product.desc}</p>
        <button class ="btn-add" onclick="addProduct(${product.id})">Add to cart</button>
        </div>

        `
    });
    document.getElementById("product-list").innerHTML = content;
}


let addProduct = (id) => {
    let sanPhamDaThem = getLocalStorage('product');
    let mangSanPhamDaThem = [];
    if (sanPhamDaThem) {
        mangSanPhamDaThem = sanPhamDaThem.split(",");
    }
    mangSanPhamDaThem.push(id);
    setLocalStorage('product', mangSanPhamDaThem)

    // let sanPhamSauKhiUpate = getLocalStorage('product');
    let sanPhamSauKhiUpate = mangSanPhamDaThem.join(",");
    gioHang(sanPhamSauKhiUpate);
}

let gioHang = (mangSanPhamDaThem) => {
    let content = "";
    let tong = 0;
    if (mangSanPhamDaThem) {
        mangSanPhamDaThem = mangSanPhamDaThem.split(",");
    }
    mangSanPhamDaThem.forEach((productDaThem) => {
        for (let product of productList) {
            if (product.id == productDaThem) {
                content += `
                <div class="product-item--box">
                <img src="${product.img}" alt="${product.name}" width="100">
                <h2>${product.name}</h2>
                <p>Giá: $${product.price}</p>
                </div>
                `
                tong = tong + 1;
                break; // Dừng vòng lặp
            }
        }
    });
    document.getElementById("cart-list").innerHTML = content;
    document.getElementById("cart-number").innerHTML = tong;
}


fetchProductList();



let setLocalStorage = (key, data) => {
    localStorage.setItem(key, data);
}

let getLocalStorage = (key) => {
    let data = localStorage.getItem(key);
    return data;
}
