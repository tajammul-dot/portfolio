<?php
include '../Config/Database.php';
include '../Classes/Book.php';

// Create a database object — connection starts in constructor
$db = new Database();
$conn = $db->conn;  // $conn now holds the active MySQLi connection

// Create a Book object
$book = new Book($conn);

// Collect form data safely (using null coalescing operator)

$id       = $_POST['id']              ?? '';
$title    = $_POST['title']           ?? '';
$author   = $_POST['author']          ?? '';
$isbn     = $_POST['isbn']            ?? '';
$year     = $_POST['published_year']  ?? '';
$category = $_POST['category']        ?? '';


// Check that all fields are filled
if (!empty($id) && !empty($title) && !empty($author) && !empty($isbn) && !empty($year) && !empty($category)) {

    // Try updating the book
    if ($book->update($id , $title, $author, $isbn, $year, $category)) {
        // ✅ Success: redirect to list
        header("Location: ../Book_Form/books_list.php");
        exit;
    } else {
        // ❌ Database query failed
    echo "Error: Failed to update book. Please check your database connection or query.";
    }

} 
    else {
    // ❗ Some field was empty
    echo "Please fill in all required fields before submitting.";
}
?>