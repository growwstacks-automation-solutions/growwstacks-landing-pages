<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$token = $data['token'] ?? '';

if (!$token) {
    echo json_encode(["success" => false]);
    exit;
}

// 🔐 PUT YOUR NEW SECRET KEY HERE
$secret = "0x4AAAAAADAAC_qdrwmM3rN4mPmzMyMaV1U";

$response = file_get_contents("https://challenges.cloudflare.com/turnstile/v0/siteverify", false, stream_context_create([
    'http' => [
        'method'  => 'POST',
        'header'  => "Content-type: application/x-www-form-urlencoded",
        'content' => http_build_query([
            'secret' => $secret,
            'response' => $token
        ])
    ]
]));

$result = json_decode($response, true);
echo json_encode($result);