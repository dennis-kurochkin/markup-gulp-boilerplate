<?php

$recipient = "igoreklida@mail.ru, igoreklida@gmail.com, 23ghos@gmail.com"; // email-адреса через запятую
$subject = "Новая заявка с промо-страницы Promo.UAZ-tdm.ru";
$emailFrom = "zakaz@promo.uaz-tdm.ru";

if( $_SERVER['REQUEST_METHOD'] != 'POST')
    header('HTTP/1.1 400 Bad Request', true, 400);

function sanitizeString($var){
    if( $var ){
        $var = urldecode($var);
        $var = strip_tags($var);
        $var = stripslashes($var);
        $var = htmlspecialchars($var);
        $var = trim($var);
    } else {
        $var = '';
    }
    return $var;
}

function get_client_ip() {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    return $ipaddress;
}

$dataForm = sanitizeString($_POST["admin-data"]);
$name = sanitizeString($_POST["name"]);
$phone = sanitizeString($_POST["phone"]);
$referrer = sanitizeString($_POST["referrer"]);
$utm_source = sanitizeString($_POST["utm_source"]);
$utm_medium = sanitizeString($_POST["utm_medium"]);
$utm_term = sanitizeString($_POST["utm_term"]);
$utm_content = sanitizeString($_POST["utm_content"]);
$utm_campaign = sanitizeString($_POST["utm_campaign"]);
$ip = get_client_ip();

$message = "<table style='width: 100%;'>
                <tr style='background-color: #f8f8f8;'>
                    <td style='padding: 10px; border: #e9e9e9 1px solid; width: 200px'><b>Название формы:</b></td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$dataForm</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Имя:</b></td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$name</td>
                </tr>
                <tr style='background-color: #f8f8f8;'>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Телефон:</b></td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$phone</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Источник перехода:</b></td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$referrer</td>
                </tr>
                <tr style='background-color: #f8f8f8;'>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Источник (utm_source):</b></td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$utm_source</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Канал (utm_medium):</b></td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$utm_medium</td>
                </tr>
                <tr style='background-color: #f8f8f8;'>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Ключевое слово (utm_term):</b></td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$utm_term</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Содержание (utm_content):</b></td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$utm_content</td>
                </tr>
                <tr style='background-color: #f8f8f8;'>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Название (utm_campaign):</b></td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'>$utm_campaign</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>IP:</b></td>
                    <td style='padding: 10px; border: #e9e9e9 1px solid;'><a href='http://ipgeobase.ru/?address=$ip'>$ip</a></td>
                </tr>
            </table>";


$headers = 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: ' . $emailFrom . "\r\n";
$headers .= 'Reply-To: ' . $emailFrom . "\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();

mail($recipient, $subject, $message, $headers);
