//gọi api lấy danh sách sp từ server
const apiURL = "https://6700f1ceb52042b542d65450.mockapi.io/api/v1/product"; // Ví dụ: lấy sản phẩm
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
        </div>

        `
    });
    document.getElementById("product-list").innerHTML = content;
}
axios({
    url: apiURL,
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