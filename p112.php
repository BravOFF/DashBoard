<?php
/**
 * Created by PhpStorm.
 * User: BravovRM
 * Date: 24.09.2018
 * Time: 8:39
 */
header('Content-type: application/xml');
echo file_get_contents("https://korolevriamo.ru/rss/rss.xl");