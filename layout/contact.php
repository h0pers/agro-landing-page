<?php
$token = "7905686736:AAGgqZXgGKHh_I9SyyvG8a3RhzCUC_e91Hw";
$chat_id = "-1002495166211";

$values = $hook->getValues();

// Получаем название формы
$formName = $modx->getOption('formName', $formit->config, 'form-'.$modx->resource->get('id'));

// Получаем ip адрес отправителя
$ip = $modx->getOption('REMOTE_ADDR', $_SERVER, '');


// Берем данные с формы
$name= $values[name];
$phone= $values['phone'];
$email= $values['email'];
$length= $values['length'];
$width= $values['width'];
$height= $values['height'];
$circulation= $values['circulation'];


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $phone_number = htmlspecialchars($_POST['phone_number']);
    $company_name = htmlspecialchars($_POST['company_name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    echo "Имя: " . $name . "<br>";
    echo "Электронная почта: " . $email;
}
