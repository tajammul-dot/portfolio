<?php
class Database {
    private $server = "localhost";
    private $user = "root";
    private $pass = "11112222";
    private $dbname = "library_db";
    public $conn;

    public function __construct() {
        $this->conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }
}
?>
