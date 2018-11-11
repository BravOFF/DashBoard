<?php
/**
 * Created by PhpStorm.
 * User: BravOFF
 * Date: 22/10/2018
 * Time: 22:38
 */
require_once $_SERVER['DOCUMENT_ROOT'].'/dashboard'.'/template/functions.php';
$menu = [
    ["Обзор", "/"],
    ["Общая информация", "/info/"],
    ["Показатели", "/indicators/"],
    ["Финансовые", "/financial/"],
    ["Закупки", "/purchases/"],
    ["Рейтинг", "/rating/"]
];
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Title</title>
    <link rel="stylesheet" href="/template/css/bootstrap.css">
    <link rel="stylesheet" href="/template/fonts/lato/lato.css">
    <link href="https://unpkg.com/ionicons@4.4.2/dist/css/ionicons.min.css" rel="stylesheet">


    <!--    <link href="http://jondmiles.com/bootstrap-datepaginator/css/bootstrap-datepicker.css" rel="stylesheet" media="screen" type="text/css">-->
    <link href="/template/datepagin/bootstrap-datepaginator.min.css" rel="stylesheet" media="screen" type="text/css">

    <link rel="stylesheet" href="/template/gantt/css/jquery.ganttChart-min.css">
    <link rel="stylesheet" href="/template/css/style.css">
</head>
<body style="background-color: #ecf4fd;">

<header class="container-fluid" style="border-bottom: 2px solid #8a8a8a; box-shadow: 0px 5px 10px rgba(0,0,0,0.25), 0px 5px 11px rgba(0,0,0,0.22); background-color: #ffffff;">
    <div class="container" style="padding: 15px;">
        <nav class="nav nav-pills nav-justified">
            <? foreach ($menu as $i){ ?>
                <a class="nav-link <?if($_SERVER['REQUEST_URI']==$i[1]):?>active<?endif;?>" href="<?=$i[1]?>"><?=$i[0]?></a>
                <?} ?>
        </nav>
    </div>
</header>

<?
//pr($menu);
?>