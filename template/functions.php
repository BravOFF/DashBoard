<?php
/**
 * Created by PhpStorm.
 * User: BravOFF
 * Date: 22/10/2018
 * Time: 23:13
 */
function pr($v){
    echo '<pre>';
    print_r($v);
    echo '</pre>';
}
function replaceNumber($num, $type = true){

    if ($type) {
        $num = str_replace(' ', '', $num);
        $num = str_replace(',', '.', $num);
        $num = number_format($num, 2, ',', ' ');
    }else{
        $num = str_replace(' ', '', $num);
        $num = str_replace(',', '.', $num);
    }
    return $num;
}