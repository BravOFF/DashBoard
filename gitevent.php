<?php
/**
 * Created by PhpStorm.
 * User: BravOFF
 * Date: 12/11/2018
 * Time: 01:26
 */

$filename = 'gitevent.txt';

$currentEl = file_get_contents($filename);

$currentEl .= $_REQUEST;
$currentEl .= '
';

file_put_contents($filename, $currentEl);