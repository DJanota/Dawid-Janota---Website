<?php
error_reporting(0);

$mailToSend = 'poczta@dawidjanota.pl';

if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
	$name       = $_POST['name'];
	$email      = $_POST['email'];
	$message    = $_POST['message'];
	$regulation = $_POST['regulation'];
	$errors     = Array();
	$return     = Array();

	if ( empty( $name ) ) {
		array_push( $errors, 'name' );
	}
	if ( ! filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
		array_push( $errors, 'email' );
	}
	if ( empty( $message ) ) {
		array_push( $errors, 'message' );
	}
	if ( empty( $regulation ) ) {
		array_push( $errors, 'regulation' );
	}

	if ( count( $errors ) > 0 ) {
		$return['errors'] = $errors;
	} else {
		$headers = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
		$headers .= 'From: ' . $email . "\r\n";
		$headers .= 'Reply-to: ' . $email;
		$message = "
			<html>
			<head>
			<meta charset=\"utf-8\">
			</head>
			<style type='text/css'>
				body {font-family:sans-serif; color:#222; padding:20px;}
				div {margin-bottom:10px;}
				.msg-title {margin-top:30px;}
			</style>
			<body>
			<div>Imię: <strong>$name</strong></div>
			<div>Email: <a href=\"mailto:$email\">$email</a></div>
			<div class=\"msg-title\"> <strong>Wiadomość:</strong></div>
			<div>$message</div>
			</body>
			</html>";

		if ( mail( $mailToSend, 'Wiadomość ze strony - ' . date( "d-m-Y" ), $message, $headers ) ) {
			$return['status'] = 'ok';
		} else {
			$return['status'] = 'error';
		}
	}

	header( 'Content-Type: application/json' );
	echo json_encode( $return );
}
