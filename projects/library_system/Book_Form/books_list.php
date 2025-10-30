<?php
include '../Config/Database.php';
include '../Classes/Book.php';


// Connect to database
$db = new Database();
$conn = $db->conn;
$book = new Book($conn);

// Fetch all books
$books = $book->getAll();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Books List</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h2>Library Books</h2>

<!-- Add New Book Button -->
<a href="../Book_Form/book_form.php">➕ Add New Book</a>
<br><br>

<table border="1" cellpadding="8" cellspacing="0">
    <thead>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Year</th>
            <th>Category</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <?php if ($books->num_rows > 0): ?>
            <?php while ($row = $books->fetch_assoc()): ?>
                <tr>
                    <td><?= $row['id'] ?></td>
                    <td><?= $row['title'] ?></td>
                    <td><?= $row['author'] ?></td>
                    <td><?= $row['isbn'] ?></td>
                    <td><?= $row['published_year'] ?></td>
                    <td><?= $row['category'] ?></td>
                    <td>
                    <div class="action-buttons">

                        <!-- Edit Button -->
                        <a href="../Book_Form/book_form.php?id=<?= $row['id'] ?>" class="action-btn edit-btn">
                            ✏️ 
                        </a>

                        <!-- Delete Button -->
                        <form action="../Actions/delete_book.php" method="POST" class="inline-form">
                            <button type="submit" name="delete" value="<?= $row['id'] ?>" class="action-btn delete-btn" onclick="return confirm('Delete this book?');">
                                🗑️ 
                            </button>
                        </form>
                    </div>
                    </td>
                </tr>
            <?php endwhile; ?>
        <?php else: ?>
            <tr><td colspan="7">No books found.</td></tr>
        <?php endif; ?>
    </tbody>
</table>

</body>
</html>
