<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Replace this email with the recipient's email
    $mail_to = "paldencjatsho@gmail.com";

    // Sender Data
    $name = str_replace(array("\r","\n"),array(" "," "), strip_tags(trim($_POST["name"])));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = trim($_POST["pnumber"]);
    $room_preference = trim($_POST["room_preference"]);
    $guest_number = trim($_POST["guest-number"]);
    $checkin = trim($_POST["checkin"]);
    $checkout = trim($_POST["checkout"]);
    $message = trim($_POST["visitor_message"]);

    // Validate the form data
    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($phone) || empty($room_preference) || empty($guest_number) || empty($checkin) || empty($checkout) || empty($message)) {
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }

    // Mail Content
    $subject = "Room Booking Request";
    $content = "New booking request details:\n\n";
    $content .= "Name: $name\n";
    $content .= "Email: $email\n";
    $content .= "Phone: $phone\n";
    $content .= "Room Preference: $room_preference\n";
    $content .= "Number of Guests: $guest_number\n";
    $content .= "Check-in Date: $checkin\n";
    $content .= "Check-out Date: $checkout\n\n";
    $content .= "Additional Message:\n$message\n";

    // Email headers
    $headers = "From: $name <$email>";

    // Send the email
    $success = mail($mail_to, $subject, $content, $headers);

    if ($success) {
        http_response_code(200);
        echo "Thank You! Your booking request has been sent.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong, we couldn't send your booking request.";
    }
} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>
