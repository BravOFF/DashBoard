<?php
/**
 * Created by PhpStorm.
 * User: BravOFF
 * Date: 12/11/2018
 * Time: 01:26
 */

$filename = 'gitevent.txt';

$currentEl = file_get_contents($filename);

$source = file_get_contents('php://input');
$json = json_decode($source, true);


$currentEl .= $json;
$currentEl .= '
';

file_put_contents($filename, $currentEl);