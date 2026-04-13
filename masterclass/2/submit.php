<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name  = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    // ✅ Get IP
    $ip = $_SERVER['REMOTE_ADDR'];

    // ✅ Optional: Handle proxy (Cloudflare, etc.)
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = explode(",", $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
    }

    // ✅ Get Location (using free API)
    $location = "Unknown";
    $response = @file_get_contents("http://ip-api.com/json/$ip");
    if ($response) {
        $data = json_decode($response, true);
        if ($data['status'] === "success") {
            $location = $data['city'] . ", " . $data['regionName'] . ", " . $data['country'];
        }
    }

    $servername = "localhost";
    $username = "u662824813_manishmandot08";
    $password = "Groww@2025";
    $dbname = "u662824813_masterclass";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // ✅ Insert with created_at, ip, and location
    $stmt = $conn->prepare("INSERT INTO form_submissions (name, email, phone, ip_address, location) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $phone, $ip, $location);

    if ($stmt->execute()) {
        // ✅ Prepare payload
        $payload = [
            "name"      => $name,
            "email"     => $email,
            "phone"     => $phone,
            "ip"        => $ip,
            "location"  => $location,
            "created_at"=> date("Y-m-d H:i:s")
        ];

        // ✅ Send payload to webhook
        $ch = curl_init("https://hook.eu1.make.com/7knuexrqgcnusnwq7s1qu2l1ibsxmsft");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);

        // ✅ Respond back to frontend
        echo json_encode(["status" => "success", "message" => "Thank you! Form submitted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
