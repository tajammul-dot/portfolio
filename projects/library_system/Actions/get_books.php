<?php
include '../Config/Database.php';
include '../Classes/Book.php';

// Create a database object — connection starts in constructor
$db = new Database();
$conn = $db->conn;  // $conn now holds the active MySQLi connection

// Create a Book object
$book = new Book($conn);
$books = $book->getAll();
?>
