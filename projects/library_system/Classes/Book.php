<?php
class Book {
    private $conn;
    private $table = "books";

    // Constructor receives a database connection and stores it in $this->conn
    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all books
    public function getAll() {
        $query = "SELECT * FROM $this->table ORDER BY id DESC";
        return $this->conn->query($query);
    }

    // Create a new book
    public function create($title, $author, $isbn, $year, $category) {
        $query = "INSERT INTO $this->table (title, author, isbn, published_year, category)
                  VALUES ('$title', '$author', '$isbn', '$year', '$category')";
        return $this->conn->query($query);
    }

    // Delete a book by ID 
    public function delete($id) {
        $query = "DELETE FROM $this->table WHERE id = '$id'";
        return $this->conn->query($query);
    }

    // Update a book by ID
    public function update($id, $title, $author, $isbn, $year, $category) {
        $query = "UPDATE $this->table 
                  SET title = '$title', author = '$author', isbn = '$isbn', 
                      published_year = '$year', category = '$category' 
                  WHERE id = '$id'";
        return $this->conn->query($query);
    }

    // Get a single book by ID
    public function getById($id) {
        $query = "SELECT * FROM $this->table WHERE id = '$id' LIMIT 1";
        $result = $this->conn->query($query);
    return $result->fetch_assoc(); // return one row as an associative array
}

}
?>
