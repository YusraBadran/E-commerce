<?php
$conn = new mysqli('localhost', 'root', '', 'e-commerce');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $cart = json_decode($_POST['cartData'], true);

    $stmt = $conn->prepare("INSERT INTO orders (customer_name, customer_phone) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $phone);
    $stmt->execute();
    $order_id = $stmt->insert_id;
    $stmt->close();

    foreach ($cart as $item) {
        $stmt = $conn->prepare("INSERT INTO order_items (order_id, product_name, quantity, price) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("isid", $order_id, $item['name'], $item['quantity'], $item['price']);
        $stmt->execute();
        $stmt->close();
    }

    header("Location: success-order.html");
    exit();
}
?>