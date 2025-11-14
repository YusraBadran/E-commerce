<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    $conn = new mysqli('localhost', 'root', '', 'e-commerce');

    if ($conn) {
        // Define the SQL query
        $sql = "INSERT INTO contact (name, email, phone, message) VALUES ('$name', '$email', '$phone', '$message')";

        // Execute the query and store the result
        $result = mysqli_query($conn, $sql);

        if ($result) {
            header("Location: success.html");
            exit();
            /* echo "Data inserted successfully"; */
        } else {
            echo "Data insertion failed: " . mysqli_error($conn);
        }
    } else {
        echo "No Connection";
    }
}
?>
