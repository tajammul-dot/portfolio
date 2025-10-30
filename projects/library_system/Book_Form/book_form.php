<?php
include '../Config/Database.php';
include '../Classes/Book.php';

$db = new Database();
$conn = $db->conn;
$book = new Book($conn);

// Check if we’re editing (when id is passed via GET)
$id = $_GET['id'] ?? null;
$bookData = null;

if ($id) {
    // Fetch existing book details
    $bookData = $book->getById($id); 
}
?>

<!DOCTYPE html>
<html>
<head>
    <title><?php echo $id ? 'Edit Book' : 'Add New Book'; ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h2><?php echo $id ? 'Edit Book' : 'Add New Book'; ?></h2>

<form action="<?php echo $id ? '../Actions/update_books.php' : '../Actions/create_book.php'; ?>" method="POST">

    <?php if ($id): ?>
        <input type="hidden" name="id" value="<?php echo $id; ?>">
    <?php endif; ?>

    <label>Title:</label><br>
    <input type="text" name="title" value="<?= $bookData['title'] ?? '' ?>"><br><br>

    <label>Author:</label><br>
    <input type="text" name="author" value="<?= $bookData['author'] ?? '' ?>"><br><br>

    <label>ISBN:</label><br>
    <input type="text" name="isbn" value="<?= $bookData['isbn'] ?? '' ?>"><br><br>

    <label>Published Year:</label><br>
    <input type="text" name="published_year" value="<?= $bookData['published_year'] ?? '' ?>"><br><br>

    <label>Category:</label><br>
    <input type="text" name="category" value="<?= $bookData['category'] ?? '' ?>"><br><br>

    <input type="submit" value="<?= $id ? 'Update Book' : 'Add Book' ?>">
</form>

</body>
</html>
