//gọi api lấy danh sách sp từ server
// const apiURL = "https://6700f1ceb52042b542d65450.mockapi.io/api/v1/product"; // Ví dụ: lấy sản phẩm
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
    console.log(
        "id:", id
    );
    axios({
        url: `https://6700f1ceb52042b542d65450.mockapi.io/api/v1/product/${id}`,
        method: "POST",
    })
        .then((res) => {
            console.log("res:", res);

        })
        .catch((err) => {
            console.log("err:", err);

        });


}
let fetchProductList = () => {

    axios({
        url: "https://6700f1ceb52042b542d65450.mockapi.io/api/v1/product",
        method: "GET",
    })
        .then((res) => {
            console.log("res:", res);
            let productList = res.data
            renderProduct(productList);
            //render ui
        })
        .catch((err) => {
            console.log("err:", err);
        });
}
fetchProductList();