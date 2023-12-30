<?php
/*Install Midtrans PHP Library (https://github.com/Midtrans/midtrans-php)
composer require midtrans/midtrans-php
                              
Alternatively, if you are not using **Composer**, you can download midtrans-php library 
(https://github.com/Midtrans/midtrans-php/archive/master.zip), and then require 
the file manually.   

require_once dirname(__FILE__) . '/pathofproject/Midtrans.php'; */

require_once dirname(__FILE__) . '/midtrans-php-master/Midtrans.php';

//SAMPLE REQUEST START HERE

// Set your Merchant Server Key
\Midtrans\Config::$serverKey = 'SB-Mid-server-lMQ1xr63bVPlp7UcHXdhbhUl';
// Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
\Midtrans\Config::$isProduction = false;
// Set sanitization on (default)
\Midtrans\Config::$isSanitized = true;
// Set 3DS transaction for credit card to true
\Midtrans\Config::$is3ds = true;

// Retrieve JSON data sent from JavaScript fetch
$json_data = file_get_contents('php://input');
$objData = json_decode($json_data, true);

// Access individual fields from the received data
$total =floatval($objData['total']);
$items = json_decode($objData['items'], true);
$name = $objData['name'];
$email = $objData['email'];
$phone = $objData['phone'];


// Construct parameters for Midtrans transaction
$params = array(
    'transaction_details' => array(
        'order_id' => rand(), // Generate or use a unique order ID
        'gross_amount' => $total, // Use the total amount from the received data
    ),
    'item_details' => $items, // Use the item details array from the received data
    'customer_details' => array(
        'first_name' => $name,
        'email' => $email,
        'phone' => $phone,
    ),
);


$snapToken = \Midtrans\Snap::getSnapToken($params);

echo $snapToken;