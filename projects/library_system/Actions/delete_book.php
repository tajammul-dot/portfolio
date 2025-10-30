<?php
include '../Config/Database.php';
include '../Classes/Book.php';

// Create a database object — connection starts in constructor
$db = new Database();
$conn = $db->conn;  // $conn now holds the active MySQLi connection

// Create a Book object
$book = new Book($conn);

if (isset($_POST['delete'])) {
    $book->delete($_POST['delete']);
    header("Location: ../Book_Form/books_list.php");
    exit;
}
?>
