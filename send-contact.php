<?php

declare(strict_types=1);

$config = [
    'to' => 'krzywegrz@gmail.com',
    'from_email' => 'noreply@krzysztofwegrzyn.pl',
    'from_name' => 'Krzysztof Węgrzyn',
    'turnstile_secret' => '',
];

$configFile = __DIR__ . '/contact-config.php';

if (is_file($configFile)) {
    $customConfig = require $configFile;

    if (is_array($customConfig)) {
        $config = array_merge($config, $customConfig);
    }
}

function redirect_to(string $path)
{
    header('Location: ' . $path, true, 303);
    exit;
}

function field(string $name, int $maxLength = 1200): string
{
    $value = trim((string) ($_POST[$name] ?? ''));
    $value = preg_replace('/[^\P{C}\t\n\r]+/u', '', $value) ?? '';

    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }

    return substr($value, 0, $maxLength);
}

function header_text(string $value): string
{
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

function encoded_subject(string $subject): string
{
    return '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

function verify_turnstile(string $secret, string $token, string $ip): bool
{
    if ($secret === '') {
        return true;
    }

    if ($token === '') {
        return false;
    }

    $payload = http_build_query([
        'secret' => $secret,
        'response' => $token,
        'remoteip' => $ip,
    ]);

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $payload,
            'timeout' => 5,
        ],
    ]);

    $response = @file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $context);
    $data = is_string($response) ? json_decode($response, true) : null;

    return is_array($data) && ($data['success'] ?? false) === true;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    redirect_to('index.html#kontakt');
}

if (field('_honey', 200) !== '') {
    redirect_to('dziekuje.html');
}

$name = field('name', 160);
$email = field('email', 254);
$topic = field('topic', 80);
$message = field('message', 3000);
$startedAt = (int) field('form_started_at', 20);
$allowedTopics = ['Excel', 'Power Query', 'Power BI', 'Ścieżka łączona'];
$turnstileSecret = trim((string) ($config['turnstile_secret'] ?? ''));
$turnstileToken = field('cf-turnstile-response', 3000);
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');

if (
    $name === ''
    || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || !in_array($topic, $allowedTopics, true)
    || $message === ''
    || ($startedAt > 0 && time() - $startedAt < 2)
    || !verify_turnstile($turnstileSecret, $turnstileToken, $ip)
) {
    redirect_to('index.html?kontakt=blad#kontakt');
}

$to = filter_var((string) ($config['to'] ?? ''), FILTER_VALIDATE_EMAIL);
$fromEmail = filter_var((string) ($config['from_email'] ?? ''), FILTER_VALIDATE_EMAIL);

if (!$to || !$fromEmail) {
    redirect_to('index.html?kontakt=blad#kontakt');
}

$subject = 'Zapytanie o szkolenie: ' . $topic;
$body = implode("\n", [
    'Nowe zapytanie ze strony Krzysztofa Węgrzyna',
    '',
    'Imię i firma: ' . $name,
    'E-mail: ' . $email,
    'Obszar szkolenia: ' . $topic,
    'IP: ' . $ip,
    '',
    'Opis potrzeby:',
    $message,
]);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ' . $fromEmail,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($to, encoded_subject($subject), $body, implode("\r\n", $headers), '-f ' . $fromEmail);

redirect_to($sent ? 'dziekuje.html' : 'index.html?kontakt=blad#kontakt');
