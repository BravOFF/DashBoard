<?php
/**
 * Created by PhpStorm.
 * User: BravovRM
 * Date: 28.11.2018
 * Time: 10:15
 */

//require_once $_SERVER['DOCUMENT_ROOT'].'/dashboard'.'/template/header.php';
require $_SERVER['DOCUMENT_ROOT'].'/dashboard'.'/vendor/autoload.php';

$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
$reader->setReadDataOnly(false);
$spreadsheet = $reader->load($_SERVER['DOCUMENT_ROOT'].'/dashboard'."/rating/rating.xlsx");
$cells = $spreadsheet->getActiveSheet();
$arResult = [];
foreach ($cells->getRowIterator() as $kr => $row) {
if ($kr == 1) continue;
	$cellIterator = $row->getCellIterator();
	$cellIterator->setIterateOnlyExistingCells(FALSE);
	foreach ($cellIterator as $k => $cell) {
		if ($k !== 'A') continue;
		if ($cell->getValue()) {
			switch ($cell->getDataType()) {
				case 's':
					$res = $cell->getValue();
					break;
				case 'n':
					$res = replaceNumber($cell->getValue());
					if (in_array($k, ['B', 'F'])) {
						$res = replaceNumber($cell->getValue(), false);
					}
					break;
				case 'f':
					$res = replaceNumber($spreadsheet->getActiveSheet()->getCell($k . $kr)->getCalculatedValue());
					break;
				default:
					$res = $cell->getValue();
					break;
			}
			$arResult[] = $res;
		}
	}
}
//array_pop($arResult);
$newArr = [];
for ($i=1;$i<count($arResult);$i++){
	$newArr[$i] = $arResult[$i-1];
}

return $newArr;
//print_r($arResult);